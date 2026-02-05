// File: tests/vite-proxy.test.mjs - verifies Vite dev server proxies /api to backend.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

test('vite config includes /api proxy', () => {
  const config = require('../vite.config.js').default;
  const proxy = config.server && config.server.proxy;
  assert.ok(proxy && proxy['/api']);
});
