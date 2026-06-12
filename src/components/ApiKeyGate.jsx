import { useState } from 'react';

export default function ApiKeyGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed.startsWith('nvapi-')) {
      setError("That doesn't look like a NIM API key.");
      return;
    }

    sessionStorage.setItem('candor_nim_key', trimmed);
    setError('');
    onUnlock(trimmed);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface-base">
      <div className="w-full max-w-md rounded-lg bg-surface-raised p-10">
        <div className="mb-6">
          <h1 className="font-accent text-4xl font-medium text-accent">Candor</h1>
          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            Add your NIM API key to get started. It stays in your browser and is never stored.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nim-key" className="sr-only">API key</label>
            <input
              id="nim-key"
              type="password"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setError('');
              }}
              placeholder="nvapi-..."
              className="w-full rounded-md bg-surface-overlay border border-surface-border px-4 py-3.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/40 transition"
            />
          </div>

          {error ? (
            <p className="text-sm text-accent" role="alert">{error}</p>
          ) : (
            <p className="text-xs text-text-faint leading-snug">
              Get a free key at <span className="text-text-muted">build.nvidia.com</span>
            </p>
          )}

          <button
            type="submit"
            className="touch-scale w-full rounded-md bg-accent py-3.5 font-primary text-sm font-medium text-text-primary uppercase tracking-wide transition disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!value.trim()}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
