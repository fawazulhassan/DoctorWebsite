/**
 * Simple inline toast for admin actions (success / error).
 */
export default function ToastBanner({ message, type = 'success', onDismiss }) {
  if (!message) return null;

  const isError = type === 'error';
  return (
    <div
      role="status"
      className={`mt-3 flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
        isError ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'
      }`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-xs font-medium underline hover:no-underline"
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
