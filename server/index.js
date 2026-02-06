import { createApp } from './app.js';
import { loadBackendEnv } from './env.js';
import { resolveAiClient } from './resolve-ai.js';

loadBackendEnv();

const port = Number(process.env.PORT || 5174);
const apiKey = process.env.GEMINI_API_KEY;
const env = process.env.NODE_ENV || 'development';
const corsOrigin = process.env.CORS_ORIGIN;

const { ai, isFallback } = resolveAiClient({ apiKey, env });
if (isFallback) {
  console.warn('GEMINI_API_KEY missing. Using placeholder AI responses.');
}

const app = createApp({ ai, corsOrigin });
app.listen(port, () => {
  console.log(`AI proxy listening on ${port}`);
});
