import { useState } from 'react';

/**
 * Lahore / Kasur location toggle.
 * Per frontend.md: Used in Hero, booking flow.
 * Phase 1: Placeholder - visual only, no state propagation.
 */
export default function LocationSelector({ value, onChange, className = '' }) {
  const [localValue, setLocalValue] = useState(value || 'lahore');
  const active = value ?? localValue;

  const handleChange = (loc) => {
    setLocalValue(loc);
    onChange?.(loc);
  };

  return (
    <div className={`location-selector flex gap-2 ${className}`.trim()}>
      <button
        type="button"
        onClick={() => handleChange('lahore')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          active === 'lahore'
            ? 'bg-[#307BC4] text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
        }`}
      >
        Lahore
      </button>
      <button
        type="button"
        onClick={() => handleChange('kasur')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
          active === 'kasur'
            ? 'bg-[#307BC4] text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
        }`}
      >
        Kasur
      </button>
    </div>
  );
}
