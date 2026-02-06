// File: tests/integration-env.test.mjs - verifies integration tests load .env and honor RUN flag.
import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { resolveIntegrationConfig } from './integration-genai-env.js';

test('resolveIntegrationConfig loads .env and enables integration when flagged', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'math-muses-int-'));
  const envPath = path.join(dir, '.env');
  await fs.writeFile(envPath, 'GEMINI_API_KEY=test-key\n', 'utf8');

  const prevKey = process.env.GEMINI_API_KEY;
  const prevFlag = process.env.RUN_GENAI_INTEGRATION;
  delete process.env.GEMINI_API_KEY;
  process.env.RUN_GENAI_INTEGRATION = '1';

  try {
    const result = resolveIntegrationConfig({ envPath });
    assert.equal(result.apiKey, 'test-key');
    assert.equal(result.shouldRun, true);
  } finally {
    if (prevKey === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = prevKey;
    }
    if (prevFlag === undefined) {
      delete process.env.RUN_GENAI_INTEGRATION;
    } else {
      process.env.RUN_GENAI_INTEGRATION = prevFlag;
    }
  }
});
