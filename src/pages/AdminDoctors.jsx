import { useState, useEffect } from 'react';
import SectionTitle from '../components/Shared/SectionTitle';
import SlotEditor from '../components/Shared/SlotEditor';
import DoctorEmailCard from '../components/Admin/DoctorEmailCard';
import { supabase } from '../lib/supabase';
import { DOCTORS } from '../constants/appointments';
import { DR_RIZWAN_CONDITIONS, DR_FAIZA_SERVICES } from '../constants/doctors';
import { getActiveDaysText } from '../utils/slots';

const DOCTOR_META = {
  'rizwan-shafiq': {
    name: 'Dr. Rizwan Shafiq',
    specialization: 'Psychiatrist — FCPS Part 2 Psychiatry',
    services: DR_RIZWAN_CONDITIONS.map((c) => c.en),
  },
  'faiza-malik': {
    name: 'Dr. Faiza Malik Jabeen',
    specialization: 'Pediatrician — FCPS Paediatrics',
    services: DR_FAIZA_SERVICES.map((s) => s.en),
  },
};

export default function AdminDoctors() {
  const [expandedSlug, setExpandedSlug] = useState(null);
  const [activeDaysMap, setActiveDaysMap] = useState({});

  async function refreshActiveDays() {
    const { data } = await supabase.from('doctor_slots').select('doctor_slug, day_of_week, is_active');
    if (!data) return;
    const map = {};
    DOCTORS.forEach((d) => { map[d.value] = []; });
    data.forEach((row) => {
      if (row.is_active && map[row.doctor_slug] !== undefined) {
        map[row.doctor_slug].push({ day_of_week: row.day_of_week, is_active: true });
      }
    });
    setActiveDaysMap(map);
  }

  useEffect(() => { refreshActiveDays(); }, []);

  function toggleExpand(slug) {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Admin — Doctors" subtitle="Manage doctor emails and weekly time slots" />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {DOCTORS.map((doc) => {
            const meta = DOCTOR_META[doc.value] || {};
            const activeDaysText = getActiveDaysText(activeDaysMap[doc.value] || []);
            const isExpanded = expandedSlug === doc.value;

            return (
              <div key={doc.value} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{meta.name || doc.label}</h3>
                    <p className="text-sm text-primary font-medium">{meta.specialization || ''}</p>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                </div>

                <DoctorEmailCard slug={doc.value} />

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-1">Scheduled Days</p>
                  <p className="text-sm text-gray-700">{activeDaysText}</p>
                </div>

                {meta.services && meta.services.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Services ({meta.services.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {meta.services.slice(0, 4).map((s) => (
                        <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{s}</span>
                      ))}
                      {meta.services.length > 4 && (
                        <span className="text-xs text-gray-400">+{meta.services.length - 4} more</span>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => toggleExpand(doc.value)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {isExpanded ? 'Hide Slot Editor' : 'Edit Slots'}
                </button>

                {isExpanded && (
                  <SlotEditor
                    slug={doc.value}
                    onSaved={refreshActiveDays}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
