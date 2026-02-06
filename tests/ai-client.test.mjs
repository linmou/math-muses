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

test('generateChat uses VITE_API_BASE_URL when set', async () => {
  const prev = process.env.VITE_API_BASE_URL;
  process.env.VITE_API_BASE_URL = 'https://example.com';
  let calledUrl = '';
  globalThis.fetch = async (url) => {
    calledUrl = url;
    return {
      ok: true,
      json: async () => ({ text: 'hi' })
    };
  };

  try {
    await generateChat({ messages: [{ role: 'user', content: 'hi' }] });
    assert.equal(calledUrl, 'https://example.com/api/ai/chat');
  } finally {
    if (prev === undefined) {
      delete process.env.VITE_API_BASE_URL;
    } else {
      process.env.VITE_API_BASE_URL = prev;
    }
  }
});

test.after(() => {
  globalThis.fetch = realFetch;
});
