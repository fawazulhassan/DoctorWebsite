/**
 * Health & Mind Care Clinic - Central contact and location data
 * Source: docs/MASTER.md
 */
export const CLINIC = {
  name: 'Health & Mind Care Clinic for Children & Adults',
  shortName: 'Health & Mind Care Clinic',
  phone: '0320-4310978',
  whatsapp: '03204310978',
  email: 'faizeerizwan1@gmail.com',
  lahore: {
    label: 'Lahore - Harbanspura',
    address: 'Harbanspura, Lahore',
    services: ['Online consultations (7 days/week)', 'Home visits (specific areas)', 'In-person (by appointment)'],
    timings: 'By appointment',
  },
  kasur: {
    label: 'Kasur - Daulat Nagar',
    address: 'Near Daulat Nagar Town, Shah Roda Ullah Khalij, Kasur',
    days: 'Tuesday, Friday, Sunday',
    timings: '4:00 PM – 8:00 PM',
    services: ['Clinic visits', 'Online consultation on non-clinic days'],
  },
};

/** Online consultation fees (PKR) — update when rates are set */
export const ONLINE_CONSULTATION_FEES = {
  rizwan: 3000,
  faiza: 2500,
  followUp: 2000,
};

export const WHATSAPP_URL = `https://wa.me/92${CLINIC.whatsapp.replace(/\D/g, '').replace(/^0/, '')}`;
export const TEL_URL = `tel:+92${CLINIC.phone.replace(/\D/g, '').replace(/^0/, '')}`;
