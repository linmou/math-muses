import { createFallbackAi } from './fallback-ai.js';
import { createGenAiClient } from './genai-client.js';

export function resolveAiClient({ apiKey, env }) {
  if (apiKey) {
    return { ai: createGenAiClient({ apiKey }), isFallback: false };
  }
  if (env && env !== 'production') {
    return { ai: createFallbackAi(), isFallback: true };
  }
  throw new Error('GEMINI_API_KEY is required');
}
