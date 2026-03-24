import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../lib/supabase';
import { DOCTORS } from '../constants/appointments';

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  if (!timeStr) return '';
  if (timeStr.length <= 5) return timeStr; // already "HH:mm"
  return timeStr.slice(0, 5);
}

export default function AppointmentConfirmation() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // Build appointment from URL params (set by BookAppointment on success)
  const fromParams = searchParams.get('name') ? {
    patient_name: searchParams.get('name'),
    patient_email: searchParams.get('email'),
    doctor_slug: searchParams.get('doctor') || null,
    service: searchParams.get('service') || null,
    appointment_date: searchParams.get('date'),
    appointment_time: searchParams.get('time'),
    visit_type: searchParams.get('visit') || null,
    status: 'pending',
  } : null;

  const [appointment, setAppointment] = useState(fromParams ?? null);
  const [loading, setLoading] = useState(!fromParams && !!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || fromParams) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, err } = await supabase
        .from('appointments')
        .select('*')
        .eq('id', id)
        .single();
      if (cancelled) return;
      if (err) {
        setError(err.message || 'Failed to load appointment.');
        setAppointment(null);
      } else {
        setAppointment(data);
        setError(null);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [id]);

  const doctorLabel = appointment?.doctor_slug
    ? (DOCTORS.find((d) => d.value === appointment.doctor_slug)?.label ?? appointment.doctor_slug)
    : '—';

  if (loading) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <SectionTitle title="Loading..." subtitle="Please wait" />
          <p className="mt-6 text-gray-600">Fetching your appointment details.</p>
        </div>
      </section>
    );
  }

  if (error || !appointment) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <SectionTitle title="Appointment" subtitle="No booking data" />
          <p className="mt-6 text-gray-600">
            {error ? 'We could not load this appointment.' : 'No appointment data. Book from the form below.'}
          </p>
          <Link
            to="/book-appointment"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
          >
            Book an appointment
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Appointment Confirmed" subtitle="Thank you" />
        <p className="mt-6 text-center text-gray-600">
          Your appointment request has been received. We will confirm availability and contact you if needed.
        </p>

        <div className="mt-10 max-w-lg mx-auto bg-gray-50 rounded-xl p-6 md:p-8 space-y-4">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Name</span>
            <span className="text-gray-900">{appointment.patient_name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Doctor</span>
            <span className="text-gray-900">{doctorLabel}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Service</span>
            <span className="text-gray-900">{appointment.service ?? appointment.department ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Date</span>
            <span className="text-gray-900">{formatDate(appointment.appointment_date)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Time</span>
            <span className="text-gray-900">{formatTime(appointment.appointment_time)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Visit type</span>
            <span className="text-gray-900">{appointment.visit_type || '—'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600 font-medium">Status</span>
            <span className="text-gray-900 capitalize">{appointment.status || 'pending'}</span>
          </div>
          {appointment.message && (
            <div className="pt-2">
              <span className="text-gray-600 font-medium block mb-1">Message</span>
              <p className="text-gray-900 text-sm">{appointment.message}</p>
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          A confirmation may be sent to {appointment.patient_email}. For changes, please contact us.
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/book-appointment"
            className="text-primary hover:underline font-medium"
          >
            Book another appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
