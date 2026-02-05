// File: tests/ai-image.test.mjs - verifies ai image helper uses backend.
import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchAiImage } from '../src/lib/ai-image.js';

const realFetch = globalThis.fetch;

test('fetchAiImage returns data url', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ image: 'data:image/png;base64,abc' })
  });
  const image = await fetchAiImage('rose');
  assert.equal(image, 'data:image/png;base64,abc');
});

test.after(() => {
  globalThis.fetch = realFetch;
});
