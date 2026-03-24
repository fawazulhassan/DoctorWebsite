import { Link } from 'react-router-dom';

/**
 * Fixed red pulsing button for emergency consultation.
 * Per frontend.md: "Emergency Consultation" label, fixed position, pulse animation.
 */
export default function EmergencyButton() {
  return (
    <Link
      to="/emergency"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg bg-[#E53E3E] text-white font-medium shadow-lg hover:bg-red-600 animate-pulse"
      aria-label="Emergency Consultation"
    >
      <span className="emergency-button__label">Emergency Consultation</span>
    </Link>
  );
}
