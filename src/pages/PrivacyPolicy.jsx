import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC } from '../constants/clinic';

export default function PrivacyPolicy() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Privacy Policy" subtitle="Last updated: March 2024" />

        <div className="mt-12 prose prose-gray max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Collection & Usage</h2>
            <p className="text-gray-600 mt-2">
              We collect only the information necessary to provide healthcare services: name, contact details, medical history, and appointment information. This data is used solely for your care and administrative purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Patient Confidentiality</h2>
            <p className="text-gray-600 mt-2">
              All consultations and medical records are strictly confidential. We do not share your information with third parties without your explicit consent, except as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Medical Records Security</h2>
            <p className="text-gray-600 mt-2">
              Your medical records are stored securely. Access is restricted to authorized healthcare providers involved in your care.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Third-Party Sharing</h2>
            <p className="text-gray-600 mt-2">
              We do not sell or share your data with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Cookie Policy</h2>
            <p className="text-gray-600 mt-2">
              Our website may use cookies for essential functionality. We do not use tracking cookies for advertising.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
            <p className="text-gray-600 mt-2">
              You have the right to access, correct, or request deletion of your personal data. Contact us at {CLINIC.email} for any privacy concerns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact</h2>
            <p className="text-gray-600 mt-2">
              For privacy concerns: {CLINIC.email} or {CLINIC.phone}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
