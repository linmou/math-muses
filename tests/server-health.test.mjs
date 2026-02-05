// File: tests/server-health.test.mjs - server/app.js exposes health route for uptime checks.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../server/app.js';

const start = (app) => new Promise((resolve) => {
  const server = app.listen(0, () => resolve(server));
});

const fetchJson = async (server, path) => {
  const { port } = server.address();
  const res = await fetch(`http://127.0.0.1:${port}${path}`);
  return { res, json: await res.json() };
};

test('GET /api/health returns ok', async () => {
  const app = createApp({ ai: { generateChat: async () => '', generateImage: async () => '' } });
  const server = await start(app);
  try {
    const { res, json } = await fetchJson(server, '/api/health');
    assert.equal(res.status, 200);
    assert.deepEqual(json, { status: 'ok' });
  } finally {
    server.close();
  }
});
