// File: tests/backend-env.test.mjs - verifies backend .env loading helper.
import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { loadBackendEnv } from '../server/env.js';

test('loadBackendEnv reads GEMINI_API_KEY from .env file', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'math-muses-env-'));
  const envPath = path.join(dir, '.env');
  await fs.writeFile(envPath, 'GEMINI_API_KEY=test-key\n', 'utf8');
  delete process.env.GEMINI_API_KEY;

  const result = loadBackendEnv({ path: envPath });

  assert.equal(process.env.GEMINI_API_KEY, 'test-key');
  assert.ok(!result.error);
});
