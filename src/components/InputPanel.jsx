import { useState } from 'react';
import UploadZone from './UploadZone.jsx';

export default function InputPanel({ onSubmit }) {
  const [resumeText, setResumeText] = useState('');
  const [pdfText, setPdfText] = useState('');

  const visibleText = pdfText || resumeText;

  const handleSubmit = () => {
    onSubmit(visibleText);
  };

  const disableSubmit = !visibleText.trim() || visibleText.trim().length < 100;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="block text-xs font-accent uppercase tracking-widest text-text-muted">Resume</legend>

        <UploadZone onExtract={setPdfText} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-border" />
          </div>
          <div className="relative flex justify-center text-xs text-text-faint">
            <span className="bg-surface-base px-2">or paste text</span>
          </div>
        </div>

        <div>
          <textarea
            value={resumeText}
            onChange={(event) => {
              setResumeText(event.target.value);
            }}
            placeholder="Paste your resume text here."
            minHeight={320}
            className="min-h-[320px] w-full rounded-lg bg-surface-overlay border border-surface-border p-3.5 font-primary text-sm leading-relaxed placeholder:text-text-faint focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/40 transition"
          />
          <div className="flex justify-end">
            <span className="text-[11px] font-primary text-text-muted">
              {visibleText.length > 200 ? `${visibleText.length} chars` : ''}
            </span>
          </div>
        </div>
      </fieldset>

      {!visibleText.trim() ? <p className="text-sm text-accent">Paste or upload your resume.</p> : null}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disableSubmit}
          className="touch-scale max-w-[320px] w-full justify-center rounded-lg bg-accent py-[14px] font-primary text-sm uppercase tracking-wider text-text-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Get Critique
        </button>
      </div>
    </form>
  );
}
