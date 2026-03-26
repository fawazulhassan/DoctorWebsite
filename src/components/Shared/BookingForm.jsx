import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ASSET } from '../../utils/asset';
import { DOCTORS, APPOINTMENT_SERVICES, VISIT_TYPES, LOCATIONS } from '../../constants/appointments';
import { useAuth } from '../../contexts/AuthContext';
import { generateTimeSlots, formatTime12h, getDayOfWeek, getActiveDaysText } from '../../utils/slots';
import { sendAppointmentConfirmationEmail } from '../../utils/email';

const inputClass =
  'w-full px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent';

export default function BookingForm({ defaultDoctor = '' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { user, profile } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    doctor: defaultDoctor,
    city: '',
    service: '',
    date: '',
    selectedTime: '',
    doctorForYou: '',
    onlinePlatform: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [noSlotsOnDate, setNoSlotsOnDate] = useState(false);

  // Auto-fill from logged-in user profile
  useEffect(() => {
    if (profile || user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || profile?.full_name || '',
        email: prev.email || user?.email || profile?.email || '',
      }));
    }
  }, [profile, user]);

  // Prefill from router state (e.g. navigating from another page)
  useEffect(() => {
    if (!state || Object.keys(state).length === 0) return;
    setForm((prev) => ({
      ...prev,
      name: state.name ?? prev.name,
      email: state.email ?? prev.email,
      contactNumber: state.contactNumber ?? state.phone ?? prev.contactNumber,
      doctor: defaultDoctor || (state.doctor ?? prev.doctor),
      city: state.city ?? prev.city,
      service: state.service ?? state.department ?? prev.service,
      onlinePlatform: state.onlinePlatform ?? prev.onlinePlatform,
      date: state.date ?? prev.date,
      selectedTime: state.selectedTime ?? state.time ?? prev.selectedTime,
      doctorForYou: state.doctorForYou ?? prev.doctorForYou,
      message: state.message ?? prev.message,
    }));
  }, [state?.doctor, state?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch doctor's weekly slots when doctor changes
  useEffect(() => {
    if (!form.doctor) {
      setDoctorSlots([]);
      setAvailableTimeSlots([]);
      setNoSlotsOnDate(false);
      return;
    }
    async function fetchSlots() {
      const { data } = await supabase
        .from('doctor_slots')
        .select('*')
        .eq('doctor_slug', form.doctor);
      setDoctorSlots(data || []);
      setAvailableTimeSlots([]);
      setNoSlotsOnDate(false);
    }
    fetchSlots();
  }, [form.doctor]);

  // Compute available time slots when date or doctorSlots changes
  useEffect(() => {
    if (!form.date || doctorSlots.length === 0) {
      setAvailableTimeSlots([]);
      setNoSlotsOnDate(false);
      return;
    }
    const dayOfWeek = getDayOfWeek(form.date);
    const row = doctorSlots.find((s) => s.day_of_week === dayOfWeek && s.is_active);
    if (!row) {
      setAvailableTimeSlots([]);
      setNoSlotsOnDate(true);
      return;
    }
    const slots = generateTimeSlots(
      row.start_time.slice(0, 5),
      row.end_time.slice(0, 5),
      row.slot_duration_minutes
    );
    setAvailableTimeSlots(slots);
    setNoSlotsOnDate(false);
  }, [form.date, doctorSlots]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === 'city' && value !== 'Lahore' && prev.service === 'Home visit') {
        return { ...prev, [name]: value, service: '' };
      }
      if (name === 'doctor') {
        return { ...prev, [name]: value, date: '', selectedTime: '' };
      }
      if (name === 'date') {
        return { ...prev, [name]: value, selectedTime: '' };
      }
      return { ...prev, [name]: value };
    });
    if (status === 'error') setStatus('idle');
  };

  const availableServices = form.city === 'Lahore'
    ? APPOINTMENT_SERVICES
    : APPOINTMENT_SERVICES.filter((s) => s.value !== 'Home visit');

  const validate = () => {
    if (!form.name?.trim()) return 'Please enter your name.';
    if (!form.email?.trim()) return 'Please enter your email.';
    if (form.service === 'Online consultation' && !form.email?.trim()) return 'Email is required for online consultation (doctor will share the meeting link manually for now).';
    if (!form.contactNumber?.trim()) return 'Please enter your phone number.';
    if (!form.doctor) return 'Please select a doctor.';
    if (!form.city) return 'Please select your city.';
    if (!form.service) return 'Please select a service.';
    if (form.service === 'Online consultation' && !form.onlinePlatform) return 'Please select your preferred platform (Zoom, WhatsApp Video, or Google Meet).';
    if (!form.date) return 'Please select a date.';
    if (noSlotsOnDate) return 'No appointments available on the selected date. Please choose another day.';
    if (!form.selectedTime) return 'Please select a time slot.';
    if (!form.doctorForYou) return 'Please select visit type.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMessage(err);
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');

    const appointmentType =
      form.service === 'Online consultation' ? 'online'
        : form.service === 'Home visit' ? 'home'
          : 'clinic';

    const row = {
      patient_name: form.name.trim(),
      patient_email: form.email.trim(),
      patient_phone: form.contactNumber.trim(),
      doctor_slug: form.doctor || null,
      service: form.service || null,
      location: form.city || null,
      appointment_type: appointmentType,
      visit_type: form.doctorForYou || null,
      appointment_date: form.date,
      appointment_time: form.selectedTime,
      message: form.message?.trim() || null,
      status: 'pending',
      ...(appointmentType === 'online' && { online_platform: form.onlinePlatform || null }),
    };

    const { error } = await supabase.from('appointments').insert(row);

    if (error) {
      console.error('Supabase insert error:', error);
      setErrorMessage(`Booking failed: ${error.message || error.code || 'unknown error'}`);
      setStatus('error');
      return;
    }

    // Send confirmation email (non-blocking - booking succeeds even if email fails)
    const emailResult = await sendAppointmentConfirmationEmail(row);
    if (emailResult.success) {
      console.log('[BookingForm] Confirmation email sent successfully');
    } else {
      console.warn('[BookingForm] Email failed but booking succeeded:', emailResult.error);
    }

    setStatus('success');
    const params = new URLSearchParams({
      name: row.patient_name,
      email: row.patient_email,
      doctor: row.doctor_slug || '',
      service: row.service || '',
      date: row.appointment_date,
      time: row.appointment_time,
      visit: row.visit_type || '',
    });
    navigate(`/appointment/confirmation?${params.toString()}`, { replace: true });
  };

  return (
    <div className="mt-8 md:mt-12 max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bf-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="bf-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="bf-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="bf-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="bf-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            id="bf-phone"
            name="contactNumber"
            type="tel"
            value={form.contactNumber}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="bf-doctor" className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
          <select
            id="bf-doctor"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            disabled={!!defaultDoctor}
            className={`${inputClass} bg-white ${defaultDoctor ? 'opacity-70 cursor-not-allowed' : ''}`}
            required
          >
            <option value="">Select doctor</option>
            {DOCTORS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bf-city" className="block text-sm font-medium text-gray-700 mb-1">Your City</label>
          <select
            id="bf-city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={`${inputClass} bg-white`}
            required
          >
            <option value="">Select your city</option>
            {LOCATIONS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          {form.city && form.city !== 'Lahore' && (
            <p className="mt-1 text-xs text-amber-600">
              Home visit is currently available in Lahore only. Clinic appointment and online consultation are available in your city.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="bf-service" className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            id="bf-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${inputClass} bg-white`}
            required
          >
            <option value="">Select service</option>
            {availableServices.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {form.service === 'Online consultation' && (
          <div>
            <label htmlFor="bf-online-platform" className="block text-sm font-medium text-gray-700 mb-1">Preferred platform</label>
            <select
              id="bf-online-platform"
              name="onlinePlatform"
              value={form.onlinePlatform}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              <option value="">Select platform</option>
              <option value="zoom">Zoom</option>
              <option value="whatsapp">WhatsApp Video</option>
              <option value="google_meet">Google Meet</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">Doctor will share the meeting link manually for now.</p>
          </div>
        )}

        <div>
          <label htmlFor="bf-date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            id="bf-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
            required
          />
          {form.doctor && doctorSlots.length > 0 && (
            <p className="mt-1 text-xs text-gray-500">
              Available days: {getActiveDaysText(doctorSlots)}
            </p>
          )}
          {form.doctor && doctorSlots.length === 0 && (
            <p className="mt-1 text-xs text-amber-600">No slots configured for this doctor yet.</p>
          )}
        </div>

        {noSlotsOnDate && (
          <p className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            No appointments available on this day. Please choose a different date.
          </p>
        )}

        {availableTimeSlots.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select Time</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, selectedTime: slot }))}
                  className={`py-2 px-3 text-sm rounded-lg border font-medium transition-colors ${
                    form.selectedTime === slot
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
                  }`}
                >
                  {formatTime12h(slot)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Visit type</p>
          <div className="space-y-2">
            {VISIT_TYPES.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="doctorForYou"
                  value={opt}
                  checked={form.doctorForYou === opt}
                  onChange={handleChange}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-gray-700 text-sm">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="bf-message" className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
          <textarea
            id="bf-message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
            placeholder="Any notes for the doctor..."
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm" role="alert">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 md:px-6 md:py-4 rounded-lg bg-[#307BC4] text-white font-medium hover:bg-[#307BC4]-hover disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {status === 'submitting' ? 'Booking...' : 'Book Appointment'}
          {status !== 'submitting' && (
            <img src={ASSET('appointment-icon-submit-arrow.svg')} alt="" className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </form>
    </div>
  );
}
