/**
 * Notification helpers (stubs for next phase).
 * In production, these would call backend/Supabase functions that integrate with SMS, WhatsApp, and email providers.
 */
import { supabase } from '../lib/supabase';

export async function sendBookingConfirmation(_appointment) {
  // TODO: Implement via Supabase edge function or external API.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[notifications] Booking confirmation would be sent for appointment:', _appointment?.id);
  }
}

export async function sendAppointmentReminder(_appointment) {
  // TODO: Implement reminder logic (day-before / hours-before) on the backend.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[notifications] Reminder would be sent for appointment:', _appointment?.id);
  }
}

/**
 * Sends the meeting invite to the patient using a Supabase Edge Function.
 * The edge function is expected to deliver:
 * - Email to `patient_email`
 * - WhatsApp message to `patient_phone`
 */
export async function sendMeetingInvites({ appointmentId, meetingLink }) {
  if (!appointmentId) {
    throw new Error('Missing appointmentId.');
  }

  if (import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL) {
    // eslint-disable-next-line no-console
    console.log('[notifications] Edge Function call skipped in DEV without Supabase config.', {
      appointmentId,
      meetingLink,
    });
    return { ok: false };
  }

  const fn = 'send-meeting-invites';
  const { data, error } = await supabase.functions.invoke(fn, {
    body: { appointmentId, meetingLink },
  });

  if (error) {
    throw new Error(error.message || 'Failed to invoke send-meeting-invites.');
  }

  return data;
}

