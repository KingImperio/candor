import { useState, useEffect } from 'react';
import ApiKeyGate from './components/ApiKeyGate.jsx';
import InputPanel from './components/InputPanel.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { useApiKey } from './hooks/useApiKey.js';
import { useCritique } from './hooks/useCritique.js';

export default function App() {
  const { key, saveKey, resetKey } = useApiKey();
  const { loading, error, data, runCritique, reset: resetCritique } = useCritique();
  const [stage, setStage] = useState('key');

  useEffect(() => {
    if (!key) {
      setStage('key');
    }
  }, [key]);

  if (!key || stage === 'key') {
    return <ApiKeyGate onUnlock={saveKey} />;
  }

  if (stage === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface-base">
        <div className="candor-loading-bar" />
        <p className="mt-4 font-primary text-sm text-text-muted">Reading your resume.</p>
      </div>
    );
  }

  if (stage === 'results' && data) {
    return (
      <ResultsPanel
        data={data}
        onReset={() => {
          resetCritique();
          setStage('input');
        }}
      />
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-[860px] bg-surface-base px-4 py-8 md:px-6">
      <InputPanel
        onSubmit={async (resumeTextOnly, jobDescription) => {
          setStage('loading');
          await runCritique(resumeTextOnly, jobDescription);
          setStage('results');
        }}
      />
    </div>
  );
}
