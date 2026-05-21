import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DeleteAppointmentModal from '../../components/Admin/DeleteAppointmentModal';
import { supabase } from '../../lib/supabase';
import { deleteAppointmentById } from '../../utils/deleteAppointment';

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

export default function DoctorConsultations() {
  const { doctorSlug, isAdmin } = useAuth();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'today' | 'past'
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
      .eq('appointment_type', 'online')
      .eq('doctor_slug', doctorSlug)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });
    if (!error) setList(data || []);
    setLoading(false);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await deleteAppointmentById(deleteId);
    if (!error) {
      setList((prev) => prev.filter((a) => a.id !== deleteId));
    }
    setDeleting(false);
    setDeleteId(null);
  }

  const today = new Date().toISOString().slice(0, 10);
  const filtered = list.filter((a) => {
    if (filter === 'today') return a.appointment_date === today;
    if (filter === 'past') return a.appointment_date < today || ['completed', 'cancelled'].includes(a.status);
    return true;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">My Online Consultations</h1>
        <p className="mt-1 text-gray-600">
          View and start your online consultations.
        </p>

        <div className="mt-6 flex gap-2">
          {['all', 'today', 'past'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                filter === f ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 text-center text-gray-600">
            No consultations match the filter.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Date & time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {formatDate(a.appointment_date)} {formatTime(a.appointment_time)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{a.patient_name}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {STATUS_LABELS[a.status] || a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end gap-1">
                        {a.status !== 'cancelled' && a.status !== 'completed' && (
                          <Link
                            to={`/doctor/consultation/${a.id}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Start
                          </Link>
                        )}
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => setDeleteId(a.id)}
                            className="text-xs font-medium text-red-600 hover:text-red-800"
                          >
                            Delete Permanently
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteAppointmentModal
        open={Boolean(deleteId)}
        deleting={deleting}
        onClose={() => !deleting && setDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
