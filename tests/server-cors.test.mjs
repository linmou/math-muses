// File: tests/server-cors.test.mjs - verifies CORS headers when configured.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

const start = (app) => new Promise((resolve) => {
  const server = app.listen(0, () => resolve(server));
});

test('OPTIONS /api/ai/chat returns CORS headers when origin configured', async () => {
  const ai = { generateChat: async () => '', generateImage: async () => '' };
  const app = createApp({ ai, corsOrigin: 'https://example.com' });
  const server = await start(app);
  try {
    const { port } = server.address();
    const res = await fetch(`http://127.0.0.1:${port}/api/ai/chat`, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://example.com',
        'Access-Control-Request-Method': 'POST'
      }
    });
    assert.equal(res.status, 204);
    assert.equal(res.headers.get('access-control-allow-origin'), 'https://example.com');
    assert.ok(res.headers.get('access-control-allow-methods'));
  } finally {
    server.close();
  }
});
