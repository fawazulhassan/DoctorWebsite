import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC, WHATSAPP_URL } from '../constants/clinic';

export default function Emergency() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    location: '',
    description: '',
    severity: '',
    doctor: '',
    contact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const msg = `Emergency Consultation Request\n\nPatient: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nSeverity: ${formData.severity}\nDoctor: ${formData.doctor}\n\n${formData.description}`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="p-8 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900">Emergency received.</h2>
            <p className="mt-4 text-gray-700">Doctor will contact you within 5 minutes.</p>
            <p className="mt-2 text-sm text-gray-600">A WhatsApp message has been opened. Please send it to complete your request.</p>
            <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Emergency Consultation" subtitle="We respond within 5 minutes" />
        <p className="mt-4 text-center text-gray-600">
          For urgent medical situations. Call {CLINIC.phone} or fill the form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name *"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone *"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <select
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Location (Lahore/Kasur) *</option>
            <option value="Lahore">Lahore</option>
            <option value="Kasur">Kasur</option>
          </select>
          <textarea
            name="description"
            placeholder="Brief Description *"
            required
            maxLength={500}
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <select
            name="severity"
            required
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Severity *</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <select
            name="doctor"
            required
            value={formData.doctor}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Doctor needed *</option>
            <option value="Psychiatrist">Psychiatrist (Dr. Rizwan)</option>
            <option value="Pediatrician">Pediatrician (Dr. Faiza)</option>
          </select>
          <select
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Preferred Contact *</option>
            <option value="Call me">Call me</option>
            <option value="WhatsApp Video">WhatsApp Video</option>
            <option value="Schedule slot">Schedule slot</option>
          </select>
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-lg bg-[#E53E3E] text-white font-medium hover:bg-red-600"
          >
            Submit Emergency Request
          </button>
        </form>
      </div>
    </section>
  );
}
