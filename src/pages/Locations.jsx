import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC } from '../constants/clinic';

const homeVisitAreas = [
  'Harbanspura', 'Shahdara', 'GT Road', 'Bagrian', 'Mughalpura', 'Sant Nagar',
  'Railway Road', 'Darogawala',
];

export default function Locations() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Locations & Services" subtitle="Lahore and Kasur" />

        <div className="mt-12 space-y-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lahore Hub — Harbanspura</h2>
            <p className="text-gray-600 mb-2">{CLINIC.lahore.address}</p>
            <p className="text-sm text-gray-600 mb-4">Contact: {CLINIC.phone}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              {CLINIC.lahore.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <h3 className="font-semibold text-gray-900 mb-2">Home Visit Coverage Areas (Lahore)</h3>
            <p className="text-sm text-gray-600 mb-2">Green (0–5km): Base charges | Yellow (5–10km): Mid-tier | Red (10–15km): Max coverage</p>
            <div className="flex flex-wrap gap-2">
              {homeVisitAreas.map((area) => (
                <span key={area} className="px-3 py-1 bg-primary/10 rounded-full text-sm text-gray-700">{area}</span>
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/Harbanspura+Lahore+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
            >
              Open in Google Maps
            </a>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kasur Clinic — Daulat Nagar</h2>
            <p className="text-gray-600 mb-2">{CLINIC.kasur.address}</p>
            <p className="text-sm text-gray-600 mb-2">Contact: {CLINIC.phone}</p>
            <p className="font-semibold text-gray-900 mb-1">Clinic Schedule</p>
            <p className="text-gray-600 mb-2">Days: {CLINIC.kasur.days}</p>
            <p className="text-gray-600 mb-4">Timings: {CLINIC.kasur.timings}</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              {CLINIC.kasur.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <Link to="/book-appointment" className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
