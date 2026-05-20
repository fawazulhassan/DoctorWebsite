import Hero from '../components/Home/Hero';
import Values from '../components/Home/Values';
import AboutSection from '../components/Home/AboutSection';
import Departments from '../components/Home/Departments';
import Reviews from '../components/Home/Reviews';
import CTASection from '../components/Home/CTASection';
import BlogSection from '../components/Home/BlogSection';
import AppointmentSection from '../components/Home/AppointmentSection';
import FAQSection from '../components/Home/FAQSection';
import PartnersSection from '../components/Home/PartnersSection';

  const blogPosts = [
  { title: 'Understanding Depression: Signs & Treatment', category: 'Mental Health', date: 'Mar 1, 2024', excerpt: 'Learn to recognize signs of depression and the treatment options available.', image: 'blog-image-1.png', slug: 'understanding-depression' },
  { title: 'Child Vaccination Schedule in Pakistan', category: 'Child Care', date: 'Feb 28, 2024', excerpt: 'A complete guide to vaccination schedules for children in Pakistan.', image: 'blog-image-2.png', slug: 'child-vaccination-schedule' },
  { title: 'Managing Anxiety in Daily Life', category: 'Mental Health', date: 'Feb 25, 2024', excerpt: 'Practical tips for managing anxiety and stress in your daily routine.', image: 'blog-image-3.png', slug: 'managing-anxiety' },
  ];

  const faqItems = [
    { q: 'How do I book an appointment?', a: 'You can book online through our website, call our hotline, or visit in person. Our staff will help you find a convenient time.' },
    { q: 'What should I bring to my first visit?', a: 'Please bring a valid ID, insurance card (if applicable), and any previous medical records or test results.' },
    { q: 'Do you offer emergency services?', a: 'Yes. Our emergency department is open 24/7 for urgent care. For life-threatening emergencies, please call 911.' },
  ];

export default function HealthcareHome() {
  return (
    <>
      <Hero />
      <Values />
      <AboutSection />
      <Departments />
      <Reviews />
      <CTASection />
      <BlogSection posts={blogPosts} />
      <AppointmentSection />
      <FAQSection items={faqItems} />
      <PartnersSection />
    </>
  );
}


