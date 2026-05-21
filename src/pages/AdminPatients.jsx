import { useState, useEffect } from 'react';
import SectionTitle from '../components/Shared/SectionTitle';
import DeleteAppointmentModal from '../components/Admin/DeleteAppointmentModal';
import { supabase } from '../lib/supabase';
import { deleteAppointmentById } from '../utils/deleteAppointment';

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [apptLoading, setApptLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setPatients(data || []);
    setLoading(false);
  }

  async function toggleHistory(patientId, patientEmail) {
    if (expandedId === patientId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(patientId);
    setApptLoading(true);
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_email', patientEmail)
      .order('appointment_date', { ascending: false });
    setAppointments(data || []);
    setApptLoading(false);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await deleteAppointmentById(deleteId);
    if (!error) {
      setAppointments((prev) => prev.filter((a) => a.id !== deleteId));
    }
    setDeleting(false);
    setDeleteId(null);
  }

  const filtered = patients.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (p.full_name || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q)
    );
  });

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
        <SectionTitle title="Admin — Patients" subtitle={`${patients.length} registered patients`} />

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Joined</th>
                <th className="px-4 py-3 font-medium">History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No patients found.</td></tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{p.full_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-500">{p.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                    {p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleHistory(p.id, p.email)}
                      className="text-primary hover:text-primary-hover text-xs font-medium"
                    >
                      {expandedId === p.id ? 'Hide' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Expanded appointment history */}
        {expandedId && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Appointment History</h4>
            {apptLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : appointments.length === 0 ? (
              <p className="text-sm text-gray-400">No appointments found for this patient.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="px-3 py-2 font-medium">Date</th>
                      <th className="px-3 py-2 font-medium">Time</th>
                      <th className="px-3 py-2 font-medium">Doctor</th>
                      <th className="px-3 py-2 font-medium">Service</th>
                      <th className="px-3 py-2 font-medium">Phone Number</th>
                      <th className="px-3 py-2 font-medium">Status</th>
                      <th className="px-3 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.map((a) => (
                      <tr key={a.id}>
                        <td className="px-3 py-2">{a.appointment_date || '—'}</td>
                        <td className="px-3 py-2">{a.appointment_time || '—'}</td>
                        <td className="px-3 py-2">{a.doctor_slug || '—'}</td>
                        <td className="px-3 py-2">{a.service || '—'}</td>
                        <td className="px-3 py-2">{a.patient_phone || '—'}</td>
                        <td className="px-3 py-2">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            a.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            a.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            a.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {a.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            onClick={() => setDeleteId(a.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium"
                          >
                            Delete Permanently
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
