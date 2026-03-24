import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  DAYS,
  DURATION_OPTIONS,
  generateTimeSlots,
  formatTime12h,
} from '../../utils/slots';

const DEFAULT_DAY = { active: false, start: '09:00', end: '17:00', duration: 30 };

function buildEmptySchedule() {
  const s = {};
  DAYS.forEach((d) => { s[d.value] = { ...DEFAULT_DAY }; });
  return s;
}

function SlotPreview({ start, end, duration }) {
  const slots = generateTimeSlots(start, end, duration);
  if (slots.length === 0) return <span className="text-xs text-gray-400">0 slots</span>;
  return (
    <span className="text-xs text-primary font-medium">
      {slots.length} slot{slots.length !== 1 ? 's' : ''}: {formatTime12h(slots[0])} – {formatTime12h(slots[slots.length - 1])}
    </span>
  );
}

export default function SlotEditor({ slug, onSaved }) {
  const [schedule, setSchedule] = useState(buildEmptySchedule());
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | saved | error

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      const { data } = await supabase
        .from('doctor_slots')
        .select('*')
        .eq('doctor_slug', slug);

      if (data && data.length > 0) {
        setSchedule((prev) => {
          const next = { ...prev };
          data.forEach((row) => {
            next[row.day_of_week] = {
              active: row.is_active,
              start: row.start_time.slice(0, 5),
              end: row.end_time.slice(0, 5),
              duration: row.slot_duration_minutes,
            };
          });
          return next;
        });
      }
      setLoading(false);
    }
    fetchSlots();
  }, [slug]);

  function updateDay(dayValue, field, value) {
    setSchedule((prev) => ({
      ...prev,
      [dayValue]: { ...prev[dayValue], [field]: value },
    }));
    if (saveStatus !== 'idle') setSaveStatus('idle');
  }

  async function handleSave() {
    setSaveStatus('saving');
    const { error: delError } = await supabase
      .from('doctor_slots')
      .delete()
      .eq('doctor_slug', slug);

    if (delError) { setSaveStatus('error'); return; }

    const rows = DAYS
      .filter((d) => schedule[d.value].active)
      .map((d) => ({
        doctor_slug: slug,
        day_of_week: d.value,
        start_time: schedule[d.value].start,
        end_time: schedule[d.value].end,
        slot_duration_minutes: schedule[d.value].duration,
        is_active: true,
      }));

    if (rows.length > 0) {
      const { error: insError } = await supabase.from('doctor_slots').insert(rows);
      if (insError) { setSaveStatus('error'); return; }
    }

    setSaveStatus('saved');
    if (onSaved) onSaved();
    setTimeout(() => setSaveStatus('idle'), 3000);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <div className="space-y-3">
        {DAYS.map((day) => {
          const cfg = schedule[day.value];
          return (
            <div key={day.value} className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 w-24 cursor-pointer shrink-0">
                <div
                  onClick={() => updateDay(day.value, 'active', !cfg.active)}
                  className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${cfg.active ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cfg.active ? 'translate-x-4' : ''}`}
                  />
                </div>
                <span className="text-sm text-gray-700 font-medium">{day.short}</span>
              </label>

              {cfg.active && (
                <>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-gray-500">From</label>
                    <input
                      type="time"
                      value={cfg.start}
                      onChange={(e) => updateDay(day.value, 'start', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label className="text-xs text-gray-500">To</label>
                    <input
                      type="time"
                      value={cfg.end}
                      onChange={(e) => updateDay(day.value, 'end', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <select
                    value={cfg.duration}
                    onChange={(e) => updateDay(day.value, 'duration', Number(e.target.value))}
                    className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:ring-1 focus:ring-primary focus:border-transparent"
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <SlotPreview start={cfg.start} end={cfg.end} duration={cfg.duration} />
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className="px-4 py-1.5 text-sm rounded-lg bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saveStatus === 'saving' ? 'Saving…' : 'Save Schedule'}
        </button>
        {saveStatus === 'saved' && (
          <span className="text-sm text-green-600 font-medium">Saved!</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-sm text-red-600">Save failed. Try again.</span>
        )}
      </div>
    </div>
  );
}
