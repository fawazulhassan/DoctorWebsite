/**
 * Centered section heading + subtitle pattern.
 * BEM: section-title, section-title__heading, section-title__subtitle
 */
export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={`section-title text-center ${className}`.trim()}>
      <h2 className="section-title__heading text-2xl md:text-3xl font-bold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="section-title__subtitle text-gray-600 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
