import { useRef, useState } from 'react';

export default function UploadZone({ onExtract }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);

  const processFile = async (file) => {
    setError(null);
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }

    try {
      const raw = await import('../utils/extractPdfText.js');
      const text = await raw.extractPdfText(file);
      setFileName(file.name);
      onExtract(text);
    } catch (err) {
      setError('Could not read this PDF. Try pasting the text instead.');
    }
  };

  const reset = () => {
    setFileName(null);
    setError(null);
    onExtract('');
  };

  return (
    <div className="space-y-2">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.currentTarget.classList.add('border-accent', 'bg-accent/10');
        }}
        onDragLeave={(event) => {
          event.currentTarget.classList.remove('border-accent', 'bg-accent/10');
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.currentTarget.classList.remove('border-accent', 'bg-accent/10');
          const file = event.dataTransfer.files?.[0];
          if (file) processFile(file);
        }}
        className="h-20 rounded-md border border-dashed border-surface-border bg-surface-overlay flex items-center justify-center text-sm text-text-muted transition"
      >
        {fileName ? (
          <span className="flex items-center gap-2">
            <span className="truncate max-w-[220px]">{fileName}</span>
            <span className="text-xs text-text-muted">Text extracted</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                reset();
              }}
              className="ml-2 text-text-faint hover:text-text-muted"
            >
              ×
            </button>
          </span>
        ) : (
          <span>Drop PDF here</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) processFile(file);
        }}
      />

      {error ? <p className="text-xs text-accent" role="alert">{error}</p> : null}
    </div>
  );
}
