import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

const TYPE_LABELS = {
  clinic: 'Clinic',
  online: 'Online',
  home: 'Home',
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

export default function DoctorAppointments() {
  const { doctorSlug } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!doctorSlug) {
      setLoading(false);
      return;
    }
    fetchList();
  }, [doctorSlug]);

  async function fetchList() {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('doctor_slug', doctorSlug)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });
    if (!error) setList(data || []);
    setLoading(false);
  }

  async function updateStatus(appointmentId, newStatus) {
    setUpdatingId(appointmentId);
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', appointmentId);
    if (!error) {
      setList((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
      );
    }
    setUpdatingId(null);
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="mt-1 text-gray-600">
          All your booked appointments. You can update the status for each.
        </p>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : list.length === 0 ? (
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 text-center text-gray-600">
            No appointments found.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(a.appointment_date)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatTime(a.appointment_time)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{a.patient_name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{a.patient_phone || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {TYPE_LABELS[a.appointment_type] || a.appointment_type || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status || 'pending'}
                        onChange={(e) => updateStatus(a.id, e.target.value)}
                        disabled={updatingId === a.id}
                        className={`text-xs font-medium rounded px-2 py-1 border border-gray-300 bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none ${statusColors[a.status] || 'bg-gray-100 text-gray-800'}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                      {updatingId === a.id && (
                        <span className="ml-1 text-xs text-gray-500">Saving...</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.appointment_type === 'online' && a.status !== 'cancelled' && a.status !== 'completed' && (
                        <Link
                          to={`/doctor/consultation/${a.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Start
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
