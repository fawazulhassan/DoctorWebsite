import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { ONLINE_CONSULTATION_FEES } from '../constants/clinic';
import { FAQ_CATEGORIES } from '../constants/faq';

const steps = [
  { num: 1, title: 'Book your slot', desc: 'Choose date and time online' },
  { num: 2, title: 'Make payment', desc: 'JazzCash, EasyPaisa, or bank transfer' },
  { num: 3, title: 'Receive confirmation & meeting link', desc: 'Via WhatsApp and email' },
  { num: 4, title: 'Join at scheduled time', desc: 'Zoom, WhatsApp Video, or Google Meet' },
  { num: 5, title: 'Get e-prescription', desc: 'Delivered via WhatsApp and email' },
];

export default function OnlineConsultation() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Consult from anywhere in Pakistan</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Professional video consultations with Dr. Rizwan Shafiq (Psychiatry) and Dr. Faiza Malik Jabeen (Paediatrics). Privacy and confidentiality assured.
          </p>
        </div>

        <SectionTitle title="How It Works" subtitle="5 simple steps" />
        <div className="mt-12 grid md:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto text-lg">
                {step.num}
              </div>
              <h3 className="mt-3 font-bold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Platforms</h2>
            <p className="text-gray-600">Zoom, WhatsApp Video, or Google Meet — your choice.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Consultation Fees</h2>
            <ul className="space-y-2 text-gray-600">
              <li>Dr. Rizwan (Psychiatry): PKR {ONLINE_CONSULTATION_FEES.rizwan.toLocaleString()}</li>
              <li>Dr. Faiza (Paediatrics): PKR {ONLINE_CONSULTATION_FEES.faiza.toLocaleString()}</li>
              <li>Follow-up: PKR {ONLINE_CONSULTATION_FEES.followUp.toLocaleString()}</li>
            </ul>
          </div>
        </div>

        {/* Online Consultation FAQ */}
        <div className="mt-16">
          <SectionTitle title="Online Consultation FAQs" subtitle="Common questions" />
          <div className="mt-8 space-y-4">
            {(FAQ_CATEGORIES.find((c) => c.title === 'Online Consultation'))?.items.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">{item.q}</h3>
                <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-primary/5 rounded-lg">
          <p className="text-gray-700">
            <strong>Privacy & Confidentiality:</strong> All consultations are confidential. Your medical information is never shared without your consent.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/book-appointment"
            state={{ presetService: 'online' }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
