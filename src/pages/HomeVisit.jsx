import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC, WHATSAPP_URL } from '../constants/clinic';

const whenToBook = [
  'Elderly patients (mobility issues)',
  'Critically ill children',
  'Post-hospitalization care',
  'Mental health home assessment',
  'Newborn checkups',
  'Severe weather conditions',
];

const areas = [
  'Harbanspura', 'Shahdara', 'GT Road', 'Bagrian', 'Mughalpura', 'Sant Nagar',
  'Railway Road', 'Darogawala',
];

export default function HomeVisit() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Professional medical care at your doorstep</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Home visit service available in Lahore. Zone-based pricing. Call or WhatsApp {CLINIC.phone} to book.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">When to Book Home Visit</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {whenToBook.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Areas Covered (Lahore Only)</h2>
            <p className="text-gray-600 mb-2">Zone-based pricing:</p>
            <ul className="space-y-1 text-gray-600 mb-4">
              <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2" /> Green (0–5km from Harbanspura): Base charges</li>
              <li><span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-2" /> Yellow (5–10km): Mid-tier charges</li>
              <li><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2" /> Red (10–15km): Maximum coverage</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <span key={area} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{area}</span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Charges Breakdown</h2>
            <ul className="text-gray-600 space-y-1">
              <li>Base consultation fee</li>
              <li>+ Zone-based transport charges</li>
              <li>+ Emergency premium (if applicable)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Book</h2>
            <p className="text-gray-600 mb-4">Call or WhatsApp: <a href={`tel:${CLINIC.phone}`} className="text-primary font-medium">{CLINIC.phone}</a></p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#20BD5A]"
            >
              WhatsApp {CLINIC.phone}
            </a>
            <p className="mt-4 text-sm text-gray-600">Or use the <Link to="/book-appointment" className="text-primary hover:underline">online booking form</Link>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preparation Guidelines</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Patient ready and comfortable</li>
              <li>Medical history/reports available</li>
              <li>Clean, well-lit consultation space</li>
              <li>Family member present</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
