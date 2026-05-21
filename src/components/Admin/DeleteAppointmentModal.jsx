/**
 * Shared confirmation modal for permanent appointment deletion (admin only).
 */
export default function DeleteAppointmentModal({ open, deleting, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="delete-appointment-title"
        aria-modal="true"
      >
        <h3 id="delete-appointment-title" className="text-lg font-bold text-gray-900 mb-2">
          Delete appointment
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to permanently delete this appointment? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-70"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {deleting ? 'Deleting…' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}
