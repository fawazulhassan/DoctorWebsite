import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.99.1';

/** CORS so the browser can call this function from localhost / production. */
const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...corsHeaders },
  });
}

function doctorLabelFromSlug(slug: string | null | undefined) {
  switch (slug) {
    case 'rizwan-shafiq':
      return 'Dr. Rizwan Shafiq';
    case 'faiza-malik':
      return 'Dr. Faiza Malik Jabeen';
    default:
      return slug || 'Doctor';
  }
}

async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const emailWebhookUrl = Deno.env.get('EMAIL_WEBHOOK_URL');
  if (emailWebhookUrl) {
    const res = await fetch(emailWebhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ to, subject, text, html }),
    });
    if (!res.ok) throw new Error(`Email webhook failed: ${await res.text()}`);
    return;
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  const resendFrom = Deno.env.get('RESEND_FROM_EMAIL');
  if (!resendApiKey || !resendFrom) {
    throw new Error('No email provider configured (set RESEND_API_KEY + RESEND_FROM_EMAIL or EMAIL_WEBHOOK_URL).');
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [to],
      subject,
      html: html ?? `<pre>${text}</pre>`,
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Resend email failed: ${msg}`);
  }
}

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    const { appointmentId, meetingLink } = await req.json();
    if (!appointmentId) return jsonResponse({ error: 'appointmentId is required' }, 400);

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Supabase env vars missing in Edge Function' }, 500);
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: appt, error } = await supabaseAdmin
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (error || !appt) {
      return jsonResponse({ error: 'Appointment not found' }, 404);
    }

    const joinLink = String(meetingLink || appt.meeting_link || '').trim();
    if (!joinLink) return jsonResponse({ error: 'meetingLink is missing' }, 400);

    const patientName = appt.patient_name || 'Patient';
    const patientEmail = (appt.patient_email || '').trim();
    const doctorName = doctorLabelFromSlug(appt.doctor_slug);

    const scheduledDate = appt.appointment_date || '';
    const scheduledTime = appt.appointment_time || '';
    const scheduleText = `${scheduledDate}${scheduledTime ? ` at ${scheduledTime}` : ''}`.trim();

    const lastLink = appt.invites_last_link || null;
    const lastSentAt = appt.invites_sent_at || null;
    if (lastLink && lastSentAt && lastLink === joinLink) {
      return jsonResponse({ ok: true, skipped: true, reason: 'Already sent for this link.' });
    }

    if (!patientEmail) {
      return jsonResponse({ ok: false, error: 'Patient email is required to send meeting invite.' }, 400);
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const resendFrom = Deno.env.get('RESEND_FROM_EMAIL');
    const emailWebhookUrl = Deno.env.get('EMAIL_WEBHOOK_URL');
    const sendEmailConfigured =
      Boolean(emailWebhookUrl) || (Boolean(resendApiKey) && Boolean(resendFrom));

    if (!sendEmailConfigured) {
      return jsonResponse(
        { ok: false, error: 'Email not configured (RESEND_* or EMAIL_WEBHOOK_URL).' },
        500,
      );
    }

    const text = `Hello ${patientName},\n\nYour online consultation with ${doctorName} is scheduled for ${scheduleText}.\n\nJoin using this link:\n${joinLink}\n\nIf you have any questions, please contact the clinic.`;
    const html = `<p>Hello ${patientName},</p><p>Your online consultation with <b>${doctorName}</b> is scheduled for <b>${scheduleText}</b>.</p><p>Join using this link:</p><p><a href="${joinLink}">${joinLink}</a></p><p>If you have any questions, please contact the clinic.</p>`;

    await sendEmail({
      to: patientEmail,
      subject: `Online consultation link (${scheduleText})`,
      text,
      html,
    });

    try {
      await supabaseAdmin
        .from('appointments')
        .update({
          invites_last_link: joinLink,
          invites_sent_at: new Date().toISOString(),
        })
        .eq('id', appointmentId);
    } catch {
      // ignore schema mismatch
    }

    return jsonResponse({ ok: true, skipped: false, channel: 'email' });
  } catch (e) {
    return jsonResponse({ ok: false, error: e?.message || 'Unknown error' }, 500);
  }
});
