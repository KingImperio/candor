import { createContext, useContext, useState, useRef, useEffect } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const showToast = (text) => {
    setMessage(text);
    setVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 2500);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {visible && message ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md">
          <div className="rounded-md border border-surface-border bg-surface-overlay px-5 py-3 font-primary text-sm text-text-primary shadow-lg">
            <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-md bg-accent" />
            {message}
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
