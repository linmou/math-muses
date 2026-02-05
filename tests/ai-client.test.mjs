// File: tests/ai-client.test.mjs - verifies frontend AI client fetch behavior.
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateChat, generateImage } from '../src/lib/ai-client.js';

const realFetch = globalThis.fetch;

test('generateChat returns text', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ text: 'hi' })
  });
  const text = await generateChat({ messages: [{ role: 'user', content: 'hi' }] });
  assert.equal(text, 'hi');
});

test('generateImage returns image', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ image: 'data:image/png;base64,abc' })
  });
  const image = await generateImage({ prompt: 'rose' });
  assert.equal(image, 'data:image/png;base64,abc');
});

test.after(() => {
  globalThis.fetch = realFetch;
});
