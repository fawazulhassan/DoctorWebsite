import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const STATUS_LABELS = {
  pending: 'Scheduled',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(t) {
  if (!t) return '—';
  if (typeof t === 'string' && t.includes(':')) return t.slice(0, 5);
  return t;
}

export default function DoctorDashboard() {
  const { doctorSlug } = useAuth();
  const [todayList, setTodayList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!doctorSlug) {
      setLoading(false);
      return;
    }
    fetchToday();
  }, [doctorSlug]);

  async function fetchToday() {
    setLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_type', 'online')
      .eq('doctor_slug', doctorSlug)
      .eq('appointment_date', today)
      .in('status', ['pending', 'confirmed'])
      .order('appointment_time', { ascending: true });
    if (!error) setTodayList(data || []);
    setLoading(false);
  }

  if (!doctorSlug) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-600">
          Your account is not linked to a doctor profile. Please contact the administrator.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-2xl font-bold text-gray-900">Today&apos;s Online Consultations</h1>
        <p className="mt-1 text-gray-600">
          Start a consultation or view the full list.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Link
            to="/doctor/consultations"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all consultations →
          </Link>
          <Link
            to="/doctor/appointments"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all appointments →
          </Link>
        </div>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : todayList.length === 0 ? (
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 text-center text-gray-600">
            No online consultations scheduled for today.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {todayList.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-gray-200"
              >
                <div>
                  <p className="font-medium text-gray-900">{a.patient_name}</p>
                  <p className="text-sm text-gray-600">
                    {formatTime(a.appointment_time)} · {STATUS_LABELS[a.status] || a.status}
                  </p>
                  {a.patient_phone && (
                    <p className="text-xs text-gray-500">{a.patient_phone}</p>
                  )}
                </div>
                <Link
                  to={`/doctor/consultation/${a.id}`}
                  className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90"
                >
                  Start Consultation
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
