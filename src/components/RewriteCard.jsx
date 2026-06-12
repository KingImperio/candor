import { useState } from 'react';

export default function RewriteCard({ section, reason, before, after }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(after || '');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = after || '';
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg bg-surface-raised p-6">
      <div className="mb-3">
        <p className="text-xs font-accent uppercase tracking-wide text-accent leading-none">{section}</p>
        <p className="mt-1 text-sm text-text-muted">{reason}</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-text-faint mb-1">Before</p>
          <div className="rounded-md bg-surface-overlay p-3">
            <p className="text-sm text-text-muted italic leading-relaxed">{before}</p>
          </div>
        </div>
        <div className="relative">
          <p className="text-[11px] uppercase tracking-wide text-accent mb-1">After</p>
          <div className="rounded-md bg-surface-raised p-3">
            <p className="text-sm text-text-primary leading-relaxed">{after}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute bottom-3 right-3 text-xs text-text-muted hover:text-text-primary transition"
          >
            {copied ? 'Copied.' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
