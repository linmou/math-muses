// File: tests/scripts.test.mjs - verifies dev:all script exists.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

test('dev:all script exists', () => {
  assert.ok(pkg.scripts && pkg.scripts['dev:all']);
});
