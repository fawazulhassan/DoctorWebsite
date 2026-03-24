import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { DEFAULT_JOIN_URL, getPlatformPresetJoinUrl } from '../../constants/onlineMeetings';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(t) {
  if (!t) return '—';
  if (typeof t === 'string' && t.includes(':')) return t.slice(0, 5);
  return t;
}

export default function DoctorConsultationRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctorSlug } = useAuth();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);
  const [meetingLinkDraft, setMeetingLinkDraft] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [inviteSuccess, setInviteSuccess] = useState(null);

  useEffect(() => {
    if (!id || !doctorSlug) {
      setLoading(false);
      return;
    }
    fetchAppointment();
  }, [id, doctorSlug]);

  async function fetchAppointment() {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .eq('doctor_slug', doctorSlug)
      .eq('appointment_type', 'online')
      .single();
    if (!error) setAppointment(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!appointment) return;
    const preset = getPlatformPresetJoinUrl(appointment.online_platform);
    setMeetingLinkDraft(
      typeof appointment.meeting_link === 'string' && appointment.meeting_link.trim()
        ? appointment.meeting_link
        : preset
    );
    setInviteError(null);
    setInviteSuccess(null);
  }, [appointment]);

  async function setMeetingLinkAndStart() {
    if (!appointment?.id) return;
    const preset = getPlatformPresetJoinUrl(appointment.online_platform);
    const url = (meetingLinkDraft || '').trim() || preset || DEFAULT_JOIN_URL;
    const platform = appointment.online_platform;

    // Meeting link must exist (either doctor's edit or the preset).
    if (!url) {
      setInviteError('Please provide a meeting link.');
      return;
    }

    setInviting(true);
    setInviteError(null);
    setInviteSuccess(null);
    try {
      await supabase
        .from('appointments')
        .update({ meeting_link: url, status: 'confirmed' })
        .eq('id', appointment.id);
      setInviteSuccess('Meeting opened. Share link with patient via WhatsApp.');
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      setInviteError(e?.message || 'Failed to open meeting.');
    } finally {
      setInviting(false);
    }
  }

  async function endConsultation() {
    if (!appointment?.id) return;
    setEnding(true);
    await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('id', appointment.id);
    setEnding(false);
    navigate('/doctor/consultations');
  }

  if (loading) {
    return (
      <section className="py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!appointment) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">Consultation not found or you do not have access.</p>
          <button
            type="button"
            onClick={() => navigate('/doctor/consultations')}
            className="mt-4 text-primary font-medium hover:underline"
          >
            Back to My Consultations
          </button>
        </div>
      </section>
    );
  }

  const meetingLink = meetingLinkDraft || getPlatformPresetJoinUrl(appointment.online_platform) || DEFAULT_JOIN_URL;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-900">Consultation Room</h1>
          <button
            type="button"
            onClick={() => navigate('/doctor/consultations')}
            className="text-sm text-gray-600 hover:text-primary"
          >
            ← Back to list
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient info sidebar */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-4 h-fit">
            <h2 className="font-semibold text-gray-900 mb-3">Patient</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><span className="text-gray-500">Name:</span> {appointment.patient_name}</li>
              <li><span className="text-gray-500">Email:</span> {appointment.patient_email || '—'}</li>
              <li><span className="text-gray-500">Phone:</span> {appointment.patient_phone || '—'}</li>
              <li><span className="text-gray-500">Date:</span> {formatDate(appointment.appointment_date)}</li>
              <li><span className="text-gray-500">Time:</span> {formatTime(appointment.appointment_time)}</li>
              {appointment.online_platform && (
                <li><span className="text-gray-500">Platform:</span> {appointment.online_platform}</li>
              )}
            </ul>
          </div>

          {/* Main area: meeting link + actions */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-900 mb-2">Meeting link</h2>
              <p className="text-sm text-gray-600 mb-2">
                Share this link with the patient. Opening it will start the video call in a new tab.
              </p>
              {(appointment.online_platform === 'zoom' || appointment.online_platform === 'google_meet') && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                  Please paste the correct {appointment.online_platform === 'zoom' ? 'Zoom' : 'Google Meet'} join URL.
                </p>
              )}
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  value={meetingLink}
                  onChange={(e) => setMeetingLinkDraft(e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(meetingLink);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={setMeetingLinkAndStart}
                  disabled={inviting}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {inviting ? 'Opening…' : 'Open meeting'}
                </button>
              </div>
              {inviteError && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                  {inviteError}
                </p>
              )}
              {inviteSuccess && (
                <p className="mt-3 text-sm text-green-700" role="status">
                  {inviteSuccess}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={endConsultation}
                disabled={ending}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-70"
              >
                {ending ? 'Ending…' : 'End consultation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
