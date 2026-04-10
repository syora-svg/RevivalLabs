// Reusable HIPAA Compliant badge with caduceus logo
// variant: "light" (default) | "dark" | "inline"

export default function HIPAABadge({ variant = 'light', className = '' }) {
  const isDark   = variant === 'dark';
  const isInline = variant === 'inline';

  const iconColor  = isDark ? '#7ab3e0' : '#1e3a6e';
  const textColor  = isDark ? '#a8c8e8' : '#1e3a6e';
  const bgColor    = isDark ? 'rgba(255,255,255,0.06)' : '#eef3fb';
  const borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#c5d8f0';

  if (isInline) {
    // Small pill version for use inside text/badges
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${className}`}
        style={{ background: bgColor, border: `1px solid ${borderColor}`, color: textColor }}
      >
        <CaduceusIcon size={14} color={iconColor} />
        HIPAA Compliant
      </span>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl ${className}`}
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <CaduceusIcon size={36} color={iconColor} />
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-0.5" style={{ color: textColor }}>
          HIPAA
        </p>
        <p className="text-[11px] font-black uppercase tracking-widest leading-none" style={{ color: textColor }}>
          COMPLIANT
        </p>
      </div>
    </div>
  );
}

function CaduceusIcon({ size = 32, color = '#1e3a6e' }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Staff */}
      <line x1="20" y1="6" x2="20" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>

      {/* Wings */}
      <path d="M20 9 C14 5 6 6 4 10 C6 8 12 9 20 13" fill={color} opacity="0.9"/>
      <path d="M20 9 C26 5 34 6 36 10 C34 8 28 9 20 13" fill={color} opacity="0.9"/>
      <path d="M20 6 C16 3 8 4 6 7 C8 5 14 6 20 10" fill={color}/>
      <path d="M20 6 C24 3 32 4 34 7 C32 5 26 6 20 10" fill={color}/>

      {/* Snake 1 — left spiral */}
      <path
        d="M20 14 C14 16 14 20 20 22 C26 24 26 28 20 30 C14 32 14 36 20 38 C24 39 26 41 20 44"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
      />
      {/* Snake 2 — right spiral */}
      <path
        d="M20 14 C26 16 26 20 20 22 C14 24 14 28 20 30 C26 32 26 36 20 38 C16 39 14 41 20 44"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
      />

      {/* Snake heads */}
      <circle cx="17" cy="44" r="2" fill={color}/>
      <circle cx="23" cy="44" r="2" fill={color}/>

      {/* Center orb */}
      <circle cx="20" cy="8" r="3" fill={color}/>
    </svg>
  );
}
