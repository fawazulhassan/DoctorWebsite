import { ASSET } from '../../utils/asset';
import BookingForm from '../Shared/BookingForm';

export default function AppointmentSection() {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-900">Appointment</h2>
      <p className="text-center text-gray-600 mt-1 md:mt-2 text-sm sm:text-base md:text-lg">Book an Appointment</p>

        <div className="mt-4 md:mt-12 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:gap-12">

          {/* Form — always left */}
          <BookingForm />

          {/* Doctor image — always right, scales down but never moves */}
          <div className="flex justify-center items-start">
          <img
  src={ASSET('appointment-doctor.png')}
  alt=""
  className="hidden sm:block w-full h-auto object-cover object-top sm:max-w-[280px] md:max-w-lg lg:max-w-xl"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/400x500/E6F0FF/333?text=Doctor';
  }}
/>
          </div>

        </div>
      </div>
    </section>
  );
}