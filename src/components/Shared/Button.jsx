/**
 * Reusable CTA button with optional icon.
 * BEM: button, button--primary, button--secondary
 */
export default function Button({ children, variant = 'primary', icon, iconPosition = 'right', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover',
    secondary: 'bg-white text-primary border border-primary hover:bg-primary/5',
  };
  const classes = `${base} ${variants[variant] || variants.primary} ${className}`.trim();

  return (
    <button type="button" className={classes} {...props}>
      {icon && iconPosition === 'left' && <span className="button__icon">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="button__icon">{icon}</span>}
    </button>
  );
}
