// File: tests/server-ai-chat.test.mjs - /api/ai/chat returns model text using injected AI client.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

const start = (app) => new Promise((resolve) => {
  const server = app.listen(0, () => resolve(server));
});

test('POST /api/ai/chat returns text', async () => {
  const ai = { generateChat: async () => 'Hello there!' };
  const app = createApp({ ai });
  const server = await start(app);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/api/ai/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'help' }], context: { puzzleTitle: 'Test' } })
    });
    const json = await res.json();
    assert.equal(res.status, 200);
    assert.deepEqual(json, { text: 'Hello there!' });
  } finally {
    server.close();
  }
});
