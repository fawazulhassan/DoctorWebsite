import { useState, useEffect } from 'react';
import SectionTitle from '../components/Shared/SectionTitle';
import { supabase } from '../lib/supabase';
import { DOCTORS } from '../constants/appointments';

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ doctor: '', status: '', search: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: false });
    if (!error) setAppointments(data || []);
    setLoading(false);
  }

  const filtered = appointments.filter((a) => {
    if (filters.doctor && a.doctor_slug !== filters.doctor) return false;
    if (filters.status && a.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        (a.patient_name || '').toLowerCase().includes(q) ||
        (a.patient_email || '').toLowerCase().includes(q) ||
        (a.patient_phone || '').includes(q);
      if (!match) return false;
    }
    return true;
  });

  function startEdit(appt) {
    setEditingId(appt.id);
    setEditForm({
      appointment_date: appt.appointment_date || '',
      appointment_time: appt.appointment_time || '',
      doctor_slug: appt.doctor_slug || '',
      status: appt.status || 'pending',
    });
  }

  async function saveEdit() {
    const { error } = await supabase
      .from('appointments')
      .update(editForm)
      .eq('id', editingId);
    if (!error) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...editForm } : a))
      );
    }
    setEditingId(null);
  }

  async function confirmCancel() {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', cancelId);
    if (!error) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === cancelId ? { ...a, status: 'cancelled' } : a))
      );
    }
    setCancelId(null);
  }

  const doctorLabel = (slug) => DOCTORS.find((d) => d.value === slug)?.label || slug || '—';

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
        <SectionTitle title="Admin — Appointments" subtitle={`${appointments.length} total appointments`} />

        {/* Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search patient name, email, phone..."
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <select
            value={filters.doctor}
            onChange={(e) => setFilters((p) => ({ ...p, doctor: e.target.value }))}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="">All Doctors</option>
            {DOCTORS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Email / Phone</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No appointments found.</td></tr>
              )}
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.patient_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    <span className="block">{a.patient_email || ''}</span>
                    <span className="block text-xs">{a.patient_phone || ''}</span>
                  </td>
                  <td className="px-4 py-3">{doctorLabel(a.doctor_slug)}</td>
                  <td className="px-4 py-3">{a.appointment_date || '—'}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{a.appointment_time || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status] || 'bg-gray-100 text-gray-700'}`}>
                      {a.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(a)} className="text-primary hover:text-primary-hover text-xs font-medium">Edit</button>
                      {a.status !== 'cancelled' && (
                        <button onClick={() => setCancelId(a.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingId(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select value={editForm.doctor_slug} onChange={(e) => setEditForm((p) => ({ ...p, doctor_slug: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  {DOCTORS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" value={editForm.appointment_date} onChange={(e) => setEditForm((p) => ({ ...p, appointment_date: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input type="time" value={editForm.appointment_time} onChange={(e) => setEditForm((p) => ({ ...p, appointment_time: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={editForm.status} onChange={(e) => setEditForm((p) => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary-hover">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setCancelId(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Appointment?</h3>
            <p className="text-sm text-gray-600 mb-6">This will mark the appointment as cancelled. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setCancelId(null)} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Keep</button>
              <button onClick={confirmCancel} className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">Cancel Appointment</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
