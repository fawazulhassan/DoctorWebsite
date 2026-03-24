import SectionTitle from '../components/Shared/SectionTitle';

export default function PaymentReturn() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Payment" subtitle="Processing" />
        <p className="mt-8 text-center text-gray-600">Payment gateway callback - status will be displayed here.</p>
      </div>
    </section>
  );
}
