import { useAuth } from '../../contexts/AuthContext';
import SlotEditor from '../../components/Shared/SlotEditor';

export default function DoctorSchedule() {
  const { doctorSlug } = useAuth();

  if (!doctorSlug) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-600">
          Your account is not linked to a doctor profile. Please contact the administrator.
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-2xl font-bold text-gray-900">My Availability</h1>
        <p className="mt-1 text-gray-600">
          Set your weekly schedule: choose days, start and end times, and slot duration.
        </p>
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
          <SlotEditor slug={doctorSlug} />
        </div>
      </div>
    </section>
  );
}
