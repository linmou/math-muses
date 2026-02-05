// File: tests/server-ai-image.test.mjs - /api/ai/image returns a data URL using injected AI client.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

const start = (app) => new Promise((resolve) => {
  const server = app.listen(0, () => resolve(server));
});

test('POST /api/ai/image returns data url', async () => {
  const ai = { generateChat: async () => '', generateImage: async () => 'data:image/png;base64,abc' };
  const app = createApp({ ai });
  const server = await start(app);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/api/ai/image`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: 'A rose' })
    });
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(json, { image: 'data:image/png;base64,abc' });
  } finally {
    server.close();
  }
});
