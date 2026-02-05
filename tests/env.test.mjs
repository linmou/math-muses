// File: tests/env.test.mjs - verifies optional frontend env loading.
import test from "node:test";
import assert from "node:assert/strict";

import { verifyFrontendEnv } from "../scripts/check-env.mjs";

test("optional env loading does not fail", () => {
  const result = verifyFrontendEnv();
  assert.equal(result.ok, true);
});
