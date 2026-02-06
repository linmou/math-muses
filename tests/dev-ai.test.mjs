// File: tests/dev-ai.test.mjs - ensures dev server can run without API key.
import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAiClient } from '../server/resolve-ai.js';

test('resolveAiClient returns fallback in development when key missing', () => {
  const result = resolveAiClient({ apiKey: '', env: 'development' });
  assert.equal(result.isFallback, true);
  assert.equal(typeof result.ai.generateChat, 'function');
  assert.equal(typeof result.ai.generateImage, 'function');
});

test('resolveAiClient throws in production when key missing', () => {
  assert.throws(() => resolveAiClient({ apiKey: '', env: 'production' }), /GEMINI_API_KEY is required/);
});
