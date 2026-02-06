// File: tests/integration-genai.test.mjs - verifies live GenAI calls when GEMINI_API_KEY is set.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createGenAiClient } from '../server/genai-client.js';
import { resolveIntegrationConfig } from './integration-genai-env.js';

const { apiKey, shouldRun } = resolveIntegrationConfig();

(shouldRun ? test : test.skip)('generateChat returns non-empty text', async () => {
  const client = createGenAiClient({ apiKey });
  const text = await client.generateChat({
    messages: [{ role: 'user', content: 'Say hello in one short sentence.' }]
  });
  assert.equal(typeof text, 'string');
  assert.ok(text.trim().length > 0);
});

(shouldRun ? test : test.skip)('generateImage returns data URL', async () => {
  const client = createGenAiClient({ apiKey });
  const image = await client.generateImage({ prompt: 'a simple red circle on white background' });
  assert.equal(typeof image, 'string');
  assert.ok(image.startsWith('data:image/'));
});
