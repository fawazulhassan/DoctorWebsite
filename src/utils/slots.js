export const DAYS = [
  { value: 1, label: 'Monday',    short: 'Mon' },
  { value: 2, label: 'Tuesday',   short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday',  short: 'Thu' },
  { value: 5, label: 'Friday',    short: 'Fri' },
  { value: 6, label: 'Saturday',  short: 'Sat' },
  { value: 0, label: 'Sunday',    short: 'Sun' },
];

export const DURATION_OPTIONS = [
  { value: 15,  label: '15 min' },
  { value: 20,  label: '20 min' },
  { value: 30,  label: '30 min' },
  { value: 45,  label: '45 min' },
  { value: 60,  label: '60 min' },
];

/**
 * Generate time slot strings for a given start/end window and duration.
 * Example: ('09:00', '12:00', 30) → ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30']
 */
export function generateTimeSlots(startTime, endTime, durationMinutes) {
  const slots = [];
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  let current = sh * 60 + sm;
  const end = eh * 60 + em;
  while (current + durationMinutes <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    current += durationMinutes;
  }
  return slots;
}

/**
 * Convert 24h time string to 12h format with AM/PM.
 * Example: '09:00' → '9:00 AM', '13:30' → '1:30 PM'
 */
export function formatTime12h(time24) {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

/**
 * Get day-of-week number (0=Sun…6=Sat) for a date string like '2024-03-15'.
 * Adds T00:00:00 to prevent timezone offset issues.
 */
export function getDayOfWeek(dateString) {
  return new Date(dateString + 'T00:00:00').getDay();
}

/**
 * Get abbreviated names of active days from a slots array.
 * Example: [{ day_of_week: 1 }, { day_of_week: 3 }] → 'Mon, Wed'
 */
export function getActiveDaysText(slotsArray) {
  const active = slotsArray
    .filter((s) => s.is_active)
    .map((s) => DAYS.find((d) => d.value === s.day_of_week)?.short)
    .filter(Boolean);
  return active.join(', ') || 'No days set';
}
