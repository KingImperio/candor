import { useState } from 'react';

export function useApiKey() {
  const [key, setKey] = useState(() => sessionStorage.getItem('candor_nim_key') || '');

  const saveKey = (nextKey) => {
    setKey(nextKey);
    if (nextKey) {
      sessionStorage.setItem('candor_nim_key', nextKey);
    } else {
      sessionStorage.removeItem('candor_nim_key');
    }
  };

  const resetKey = () => {
    setKey('');
    sessionStorage.removeItem('candor_nim_key');
  };

  const isLoaded = typeof key === 'string';

  return { key, saveKey, resetKey, isLoaded };
}
