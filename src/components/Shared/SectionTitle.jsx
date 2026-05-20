/**
 * Centered section heading + subtitle pattern.
 * BEM: section-title, section-title__heading, section-title__subtitle
 */
export default function SectionTitle({ title, subtitle, className = '', subtitleClassName = '' }) {
  return (
    <div className={`section-title text-center ${className}`.trim()}>
      <h2 className="section-title__heading text-3xl md:text-3xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`section-title__subtitle text-lg md:text-base text-gray-600 mt-3 md:mt-2 ${subtitleClassName}`.trim()}>{subtitle}</p>
      )}
    </div>
  );
}
