import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { DOCTORS } from '../constants/appointments';
import { supabase } from '../lib/supabase';

const cardBase =
  'border rounded-xl p-4 md:p-5 cursor-pointer flex flex-col gap-1 transition ring-offset-2 focus:outline-none';

function OptionCard({ label, description, selected, onClick }) {
  return (
    <button
      type="button"
      className={`${cardBase} ${selected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/60'}`}
      onClick={onClick}
    >
      <span className="font-semibold text-gray-900 text-sm md:text-base">{label}</span>
      {description && <span className="text-xs md:text-sm text-gray-600">{description}</span>}
    </button>
  );
}

export default function SmartBookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    location: '',
    appointmentType: '',
    doctorSlug: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    whatsapp: '',
    email: '',
    symptoms: '',
    homeAddress: '',
    homeArea: '',
    homeLandmark: '',
    onlinePlatform: '',
    acceptTerms: false,
    acceptPrivacy: false,
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('');

  // Preset from Online Consultation page
  useEffect(() => {
    const preset = location.state?.presetService;
    if (preset === 'online') {
      setForm((f) => ({ ...f, location: 'lahore', appointmentType: 'online' }));
    }
  }, [location.state?.presetService]);

  const goNext = () => setStep((s) => Math.min(s + 1, 8));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const getAppointmentType = () => {
    if (form.appointmentType === 'online') return 'online';
    if (form.appointmentType === 'home') return 'home';
    return 'clinic';
  };

  const handleSubmitBooking = async () => {
    if (!form.name?.trim() || !form.phone?.trim()) {
      setSubmitError('Please fill in patient name and phone.');
      setSubmitStatus('error');
      return;
    }
    if (getAppointmentType() === 'online' && !form.email?.trim()) {
      setSubmitError('Email is required for online consultation (doctor will share the meeting link manually for now).');
      setSubmitStatus('error');
      return;
    }
    if (!form.acceptTerms || !form.acceptPrivacy) {
      setSubmitError('Please accept the terms and privacy policy.');
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('submitting');
    setSubmitError('');

    const row = {
      patient_name: form.name.trim(),
      patient_email: (form.email || '').trim() || null,
      patient_phone: form.phone.trim(),
      doctor_slug: form.doctorSlug || null,
      location: form.location === 'lahore' ? 'Lahore' : form.location === 'kasur' ? 'Kasur' : null,
      appointment_type: getAppointmentType(),
      service: form.appointmentType || null,
      appointment_date: form.appointmentDate || null,
      appointment_time: form.appointmentTime || null,
      status: 'pending',
      ...(getAppointmentType() === 'online' && { online_platform: form.onlinePlatform || null }),
      ...(getAppointmentType() === 'home' && {
        home_address: [form.homeAddress, form.homeArea, form.homeLandmark].filter(Boolean).join(', ') || null,
      }),
    };

    const { data, error } = await supabase.from('appointments').insert(row).select('id').single();

    if (error) {
      setSubmitError(error.message || 'Booking failed.');
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('success');
    const params = new URLSearchParams({
      name: row.patient_name,
      email: row.patient_email || '',
      doctor: row.doctor_slug || '',
      service: row.service || '',
      date: row.appointment_date || '',
      time: row.appointment_time || '',
    });
    navigate(`/appointment/confirmation?${params.toString()}`, { replace: true });
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle
          title="Book Appointment"
          subtitle="Smart multi-step booking (location, service, doctor, time, details)"
        />

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8">
          {/* Wizard content */}
          <div className="space-y-6">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 1 – Choose location</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Where would you like to receive care?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <OptionCard
                    label="Lahore Services Hub"
                    description="Harbanspura – online, home visit, and in-person services."
                    selected={form.location === 'lahore'}
                    onClick={() => setForm((f) => ({ ...f, location: 'lahore' }))}
                  />
                  <OptionCard
                    label="Kasur Clinic"
                    description="Daulat Nagar Town – clinic on specific days."
                    selected={form.location === 'kasur'}
                    onClick={() => setForm((f) => ({ ...f, location: 'kasur' }))}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 2 – Choose service type</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select how you want to consult with the doctor. Options depend on your location.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {form.location === 'lahore' && (
                    <>
                      <OptionCard
                        label="Online Video Consultation"
                        description="Consult from home using Zoom / WhatsApp / Google Meet."
                        selected={form.appointmentType === 'online'}
                        onClick={() => setForm((f) => ({ ...f, appointmentType: 'online' }))}
                      />
                      <OptionCard
                        label="Home Visit (Lahore)"
                        description="Doctor visits your home in covered Lahore areas."
                        selected={form.appointmentType === 'home'}
                        onClick={() => setForm((f) => ({ ...f, appointmentType: 'home' }))}
                      />
                      <OptionCard
                        label="Clinic Visit – Lahore"
                        description="In-person visit at Harbanspura (by appointment)."
                        selected={form.appointmentType === 'clinic_lahore'}
                        onClick={() => setForm((f) => ({ ...f, appointmentType: 'clinic_lahore' }))}
                      />
                    </>
                  )}
                  {form.location === 'kasur' && (
                    <>
                      <OptionCard
                        label="Clinic Visit – Kasur"
                        description="In-person visit on clinic days (Tue/Fri/Sun)."
                        selected={form.appointmentType === 'clinic_kasur'}
                        onClick={() => setForm((f) => ({ ...f, appointmentType: 'clinic_kasur' }))}
                      />
                      <OptionCard
                        label="Online Consultation"
                        description="Video consultation as alternative to clinic visit."
                        selected={form.appointmentType === 'online'}
                        onClick={() => setForm((f) => ({ ...f, appointmentType: 'online' }))}
                      />
                    </>
                  )}
                  {!form.location && (
                    <p className="text-xs text-red-600">
                      Please select a location in Step 1 first.
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 3 – Select doctor</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Choose the doctor you want to consult.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DOCTORS.map((d) => (
                    <OptionCard
                      key={d.value}
                      label={d.label}
                      description={d.value === 'rizwan-shafiq' ? 'Psychiatrist – mental health & mood.' : 'Pediatrician – child health & development.'}
                      selected={form.doctorSlug === d.value}
                      onClick={() =>
                        setForm((f) => ({ ...f, doctorSlug: d.value, doctorName: d.label }))
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 4 – Choose date & time</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For now, pick a date and time that suits you. Later this step will use real-time availability.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={form.appointmentDate}
                      onChange={(e) => setForm((f) => ({ ...f, appointmentDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={form.appointmentTime}
                      onChange={(e) => setForm((f) => ({ ...f, appointmentTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 5 – Patient information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other / Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        const v = e.target.value;
                        setForm((f) => ({ ...f, phone: v, whatsapp: f.whatsapp || v }));
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                    <input
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms / reason for visit
                  </label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={form.symptoms}
                    onChange={(e) => setForm((f) => ({ ...f, symptoms: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Briefly describe the main problem or reason for your visit."
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 6 – Service-specific details</h3>
                {form.appointmentType === 'home' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      For home visits, please provide your address and area so we can confirm coverage and estimate travel time.
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full address</label>
                      <textarea
                        rows={2}
                        value={form.homeAddress}
                        onChange={(e) => setForm((f) => ({ ...f, homeAddress: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                        <input
                          type="text"
                          value={form.homeArea}
                          onChange={(e) => setForm((f) => ({ ...f, homeArea: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nearest landmark</label>
                        <input
                          type="text"
                          value={form.homeLandmark}
                          onChange={(e) => setForm((f) => ({ ...f, homeLandmark: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {form.appointmentType === 'online' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      For online consultations, choose your preferred platform.
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred platform</label>
                      <select
                        value={form.onlinePlatform}
                        onChange={(e) => setForm((f) => ({ ...f, onlinePlatform: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select platform</option>
                        <option value="zoom">Zoom</option>
                        <option value="whatsapp">WhatsApp Video</option>
                        <option value="google_meet">Google Meet</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-500">
                      Email may be required later to receive meeting links, depending on the platform.
                    </p>
                  </div>
                )}
                {!['home', 'online'].includes(form.appointmentType) && (
                  <p className="text-sm text-gray-600">
                    No extra details needed for this service type. You can continue to the next step.
                  </p>
                )}
              </div>
            )}

            {step === 7 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 7 – Review & terms</h3>
                <div className="space-y-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Location</span>
                    <span>{form.location || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Service type</span>
                    <span>{form.appointmentType || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Doctor</span>
                    <span>{form.doctorName || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date & time</span>
                    <span>
                      {form.appointmentDate || '—'} {form.appointmentTime && `at ${form.appointmentTime}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Patient</span>
                    <span>{form.name || '—'}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.acceptTerms}
                      onChange={(e) => setForm((f) => ({ ...f, acceptTerms: e.target.checked }))}
                      className="mt-1"
                    />
                    <span>
                      I agree to the appointment terms and understand that final confirmation depends on doctor availability.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.acceptPrivacy}
                      onChange={(e) => setForm((f) => ({ ...f, acceptPrivacy: e.target.checked }))}
                      className="mt-1"
                    />
                    <span>
                      I agree to the privacy policy and consent to being contacted via phone, WhatsApp, and/or email.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {step === 8 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step 8 – Review & submit</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Submit to create a pending booking. Payment (JazzCash / EasyPaisa) will be connected in a later phase.
                </p>
                {form.appointmentType === 'online' && (
                  <p className="text-sm text-primary/90 mb-4">
                    For now, your doctor will share the meeting link manually.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600 mb-3" role="alert">{submitError}</p>
                )}
                <button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={submitStatus === 'submitting'}
                  className="w-full px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-70"
                >
                  {submitStatus === 'submitting' ? 'Submitting...' : 'Submit booking'}
                </button>
              </div>
            )}
          </div>

          {/* Step indicator & navigation */}
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                Booking steps
              </p>
              <ol className="space-y-1 text-sm">
                {[
                  'Choose location',
                  'Choose service type',
                  'Select doctor',
                  'Pick date & time',
                  'Enter patient info',
                  'Service-specific fields',
                  'Review & terms',
                  'Payment / Submit',
                ].map((label, index) => {
                  const n = index + 1;
                  const isActive = step === n;
                  const isDone = step > n;
                  return (
                    <li key={label} className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          isDone
                            ? 'bg-primary text-white'
                            : isActive
                            ? 'border border-primary text-primary'
                            : 'border border-gray-300 text-gray-500'
                        }`}
                      >
                        {n}
                      </span>
                      <span className={isActive ? 'text-gray-900 font-medium' : 'text-gray-600'}>
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-60"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={step === 8}
                className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover disabled:opacity-60"
              >
                {step === 7 ? 'Continue to payment' : step === 8 ? 'Done' : 'Next step'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

