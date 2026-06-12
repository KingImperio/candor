export function severityLabel(severity) {
  if (severity === 'high') return 'Critical';
  if (severity === 'medium') return 'Notable';
  return 'Minor';
}

export default function ScoreBar({ severity }) {
  const label = severityLabel(severity);

  const base = 'inline-flex items-center rounded-full px-3 py-1 font-primary text-[11px] uppercase tracking-wide';
  if (severity === 'high') return <span className={`${base} bg-accent/20 text-accent`}>{label}</span>;
  if (severity === 'medium') return <span className={`${base} bg-amber-fill text-amber-text`}>{label}</span>;
  return <span className={`${base} bg-surface-overlay text-text-muted`}>{label}</span>;
}
