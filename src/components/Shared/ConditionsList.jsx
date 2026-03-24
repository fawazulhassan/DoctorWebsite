/**
 * Bilingual conditions/services list with English + Urdu labels.
 * Used on doctor profile pages.
 */
export default function ConditionsList({ items, title = 'Conditions Treated', className = '' }) {
  return (
    <div className={`conditions-list ${className}`.trim()}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.en}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span className="font-medium text-gray-900">{item.en}</span>
            {item.ur && (
              <span className="font-urdu text-gray-600 text-sm" dir="rtl">
                {item.ur}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
