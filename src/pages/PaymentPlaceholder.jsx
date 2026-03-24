import SectionTitle from '../components/Shared/SectionTitle';

export default function PaymentPlaceholder() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Payment (Coming Soon)" subtitle="We are setting up secure online payments." />
        <p className="mt-6 text-sm md:text-base text-gray-600">
          Online payment integration with JazzCash / EasyPaisa will be implemented in the next phase. For now, your booking
          will be created as a pending appointment, and the clinic will contact you to confirm details and payment options.
        </p>
      </div>
    </section>
  );
}

