import { useState, useCallback } from 'react';
import { SYSTEM_PROMPT, buildUserPrompt, parseResponse } from '../utils/buildPrompt.js';

export function useCritique() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const runCritique = useCallback(async (resumeText, jobDescription) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const apiKey = sessionStorage.getItem('candor_nim_key');
      if (!apiKey) {
        throw new Error('NIM API key is missing.');
      }

      const userPrompt = buildUserPrompt(resumeText, jobDescription);

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'stepfun/step-3.7-flash',
          max_tokens: 4000,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('NIM API key is invalid or expired.');
        } else if (response.status === 429) {
          throw new Error('Rate limit hit. Wait a moment and try again.');
        } else if (response.status >= 500) {
          throw new Error('NVIDIA NIM API error. Try again.');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error?.message || 'Something went wrong. Try again.');
      }

      const result = await response.json();
      const rawText = result.choices?.[0]?.message?.content || '';
      const parsed = parseResponse(rawText);

      setData(parsed);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { loading, error, data, runCritique, reset };
}
