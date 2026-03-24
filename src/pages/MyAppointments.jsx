import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DOCTORS } from '../constants/appointments';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function MyAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMyAppointments();
  }, [user]);

  async function fetchMyAppointments() {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_email', user.email)
      .order('appointment_date', { ascending: false });
    if (!error) setAppointments(data || []);
    setLoading(false);
  }

  const doctorLabel = (slug) =>
    DOCTORS.find((d) => d.value === slug)?.label || slug || '—';

  if (loading) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="My Appointments" subtitle="Your booked appointments" />

        {appointments.length === 0 ? (
          <div className="mt-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-4">You have no appointments yet.</p>
            <Link
              to="/book-appointment"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover"
            >
              Book Your First Appointment
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="mt-8 hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">Visit Type</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{doctorLabel(a.doctor_slug)}</td>
                      <td className="px-4 py-3 text-gray-600">{a.service || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{a.appointment_date || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{a.appointment_time || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{a.visit_type || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>
                          {a.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="mt-8 md:hidden space-y-4">
              {appointments.map((a) => (
                <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">{doctorLabel(a.doctor_slug)}</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>
                      {a.status || 'pending'}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="text-gray-400">Service:</span> {a.service || '—'}</p>
                    <p><span className="text-gray-400">Date:</span> {a.appointment_date || '—'}</p>
                    <p><span className="text-gray-400">Time:</span> {a.appointment_time || '—'}</p>
                    <p><span className="text-gray-400">Visit:</span> {a.visit_type || '—'}</p>
                  </div>
                  {a.message && (
                    <p className="mt-2 text-xs text-gray-400 border-t border-gray-100 pt-2">{a.message}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/book-appointment"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover"
              >
                Book Another Appointment
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
