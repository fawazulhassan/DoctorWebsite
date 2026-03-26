import emailjs from '@emailjs/browser';
import { DOCTORS } from '../constants/appointments';
import { formatTime12h } from './slots';

let emailjsInitialized = false;

/**
 * Initialize EmailJS with public key from environment variables
 */
function initEmailJS() {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey && !emailjsInitialized) {
    emailjs.init(publicKey);
    emailjsInitialized = true;
  }
}

/**
 * Get doctor's full name from slug
 * @param {string} slug - Doctor slug (e.g., 'rizwan-shafiq')
 * @returns {string} - Doctor's full name (e.g., 'Dr. Rizwan Shafiq')
 */
function getDoctorName(slug) {
  const doctor = DOCTORS.find((d) => d.value === slug);
  return doctor ? doctor.label : slug;
}

/**
 * Format date to readable format
 * @param {string} dateStr - Date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (e.g., "Monday, March 25, 2026")
 */
function formatAppointmentDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Format online platform name for display
 * @param {string} platform - Platform code (e.g., 'google_meet')
 * @returns {string} - Formatted name (e.g., 'Google Meet')
 */
function formatPlatformName(platform) {
  const platforms = {
    zoom: 'Zoom',
    whatsapp: 'WhatsApp Video',
    google_meet: 'Google Meet',
  };
  return platforms[platform] || platform;
}

/**
 * Send appointment confirmation email via EmailJS
 * @param {Object} appointmentData - Appointment data from booking form
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendAppointmentConfirmationEmail(appointmentData) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('[EmailJS] Configuration missing. Email not sent.');
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    initEmailJS();

    const templateParams = {
      to_email: appointmentData.patient_email,
      patient_name: appointmentData.patient_name,
      patient_email: appointmentData.patient_email,
      patient_phone: appointmentData.patient_phone,
      doctor_name: getDoctorName(appointmentData.doctor_slug),
      service_type: appointmentData.service,
      location: appointmentData.location,
      visit_type: appointmentData.visit_type,
      appointment_date: formatAppointmentDate(appointmentData.appointment_date),
      appointment_time: formatTime12h(appointmentData.appointment_time),
      message: appointmentData.message || 'No message provided',
      online_platform: appointmentData.online_platform
        ? formatPlatformName(appointmentData.online_platform)
        : 'N/A',
    };

    const response = await emailjs.send(serviceId, templateId, templateParams);

    console.log('[EmailJS] Email sent successfully:', response.status);
    return { success: true };
  } catch (error) {
    console.error('[EmailJS] Failed to send email:', error);
    return {
      success: false,
      error: error?.text || error?.message || 'Unknown error',
    };
  }
}
