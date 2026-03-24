import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC } from '../constants/clinic';

export default function Terms() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Terms & Conditions" subtitle="Last updated: March 2024" />

        <div className="mt-12 prose prose-gray max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Service Terms</h2>
            <p className="text-gray-600 mt-2">
              By using our services, you agree to these terms. {CLINIC.name} provides healthcare services including clinic visits, online consultation, and home visits.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">User Responsibilities</h2>
            <p className="text-gray-600 mt-2">
              You agree to provide accurate information, attend appointments on time, and follow medical advice. You are responsible for the accuracy of information you provide.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Appointment Terms</h2>
            <p className="text-gray-600 mt-2">
              Appointments are subject to availability. We reserve the right to reschedule in case of emergencies or unforeseen circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Cancellation & Refund Policy</h2>
            <p className="text-gray-600 mt-2">
              Cancellation more than 24 hours before: Full refund. 12–24 hours: 50% refund. Less than 12 hours: No refund. No-show: No refund. Doctor cancellation: Full refund.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Telemedicine Consent</h2>
            <p className="text-gray-600 mt-2">
              By using online consultation, you consent to receive care via video/telephone. You understand that telemedicine has limitations and in-person care may be recommended.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Payment Terms</h2>
            <p className="text-gray-600 mt-2">
              Payment is due as per the selected method. We accept JazzCash, EasyPaisa, bank transfer, and cash at clinic/home visit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact</h2>
            <p className="text-gray-600 mt-2">
              For questions: {CLINIC.email} or {CLINIC.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
