// File: tests/vite-alias.test.mjs - validates @ alias to src/ in Vite config.
import test from 'node:test';
import assert from 'node:assert/strict';

const configModule = await import('../vite.config.js');
const config = configModule.default || configModule;

const alias = config?.resolve?.alias || {};

test('vite config exposes @ alias to src', () => {
  const value = alias['@'];
  assert.ok(value, 'missing @ alias');
  assert.match(String(value), /src/);
});
