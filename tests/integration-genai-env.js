import { loadBackendEnv } from '../server/env.js';

export const resolveIntegrationConfig = ({ envPath } = {}) => {
  loadBackendEnv(envPath ? { path: envPath } : undefined);
  const apiKey = process.env.GEMINI_API_KEY;
  const shouldRun = process.env.RUN_GENAI_INTEGRATION === '1' && Boolean(apiKey);
  return { apiKey, shouldRun };
};
