import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { CLINIC, WHATSAPP_URL } from '../constants/clinic';
import { supabase } from '../lib/supabase';
import './Contact.css';

const bannerBg  = '/departments/banner-bg.png';
const bannerImg = '/departments/contact-img.png';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    const { error } = await supabase.from('contact-us').insert(payload);
    if (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to submit your message.');
      return;
    }

    setStatus('success');
    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <>
      {/* ── Banner ── */}
      <section className="dept-hero">
        <img className="dept-hero__bg" src={bannerBg} alt="" aria-hidden="true" />
        <div className="dept-hero__content">
          <h1 className="dept-hero__heading">Contact Us</h1>
          <p className="dept-hero__subheading">
            We're here to help. Reach out to us anytime and we'll happily answer your questions.
          </p>
        </div>
        <div className="dept-hero__image-wrap">
          <img className="dept-hero__image" src={bannerImg} alt="Contact Us" />
        </div>
      </section>

      {/* ── Rest of Contact Page ── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <SectionTitle title="Contact Us" subtitle="We're here to help" />

          <div className="mt-12 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  <a href={`tel:${CLINIC.phone}`} className="text-primary hover:underline">{CLINIC.phone}</a>
                </p>
                <p>
                  <span className="font-semibold">WhatsApp:</span>{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{CLINIC.phone}</a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a href={`mailto:${CLINIC.email}`} className="text-primary hover:underline">{CLINIC.email}</a>
                </p>
                <p className="text-sm text-amber-700 font-medium">Emergency: 24/7 availability</p>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Lahore Office</h2>
              <p className="text-gray-600">{CLINIC.lahore.address}</p>
              <p className="text-sm text-gray-600 mt-1">Services: {CLINIC.lahore.services.join(', ')}</p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Kasur Clinic</h2>
              <p className="text-gray-600">{CLINIC.kasur.address}</p>
              <p className="text-sm text-gray-600 mt-1">Days: {CLINIC.kasur.days} | Timings: {CLINIC.kasur.timings}</p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Quick Links</h2>
              <div className="flex flex-wrap gap-3">
                <Link to="/book-appointment" className="text-primary hover:underline">Book Appointment</Link>
                <Link to="/online-consultation" className="text-primary hover:underline">Online Consultation</Link>
                <Link to="/emergency" className="text-primary hover:underline">Emergency</Link>
                <Link to="/faq" className="text-primary hover:underline">FAQs</Link>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="">Subject *</option>
                  <option value="general">General Inquiry</option>
                  <option value="appointment">Appointment</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Message *"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-6 py-4 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
              </form>
              {status === 'success' && (
                <p className="mt-4 text-green-600">Thank you! Your message has been received. We will get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-red-600">{errorMessage}</p>
              )}
            </div>
          </div>

          <div className="mt-12 overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h2>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Service</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Days</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Timings</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Location</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3">Online Consultation</td>
                  <td className="px-4 py-3">7 days/week</td>
                  <td className="px-4 py-3">By appointment</td>
                  <td className="px-4 py-3">Lahore</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-3">Clinic Visit</td>
                  <td className="px-4 py-3">{CLINIC.kasur.days}</td>
                  <td className="px-4 py-3">{CLINIC.kasur.timings}</td>
                  <td className="px-4 py-3">Kasur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}