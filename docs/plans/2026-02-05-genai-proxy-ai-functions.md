# Google GenAI Proxy + AI Functions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace placeholder AI (mentor chat + image generation) with Google GenAI via a small Node/Express proxy, keeping the API key server-side.

**Architecture:** Add an Express server with `/api/ai/chat` and `/api/ai/image` endpoints that call `@google/genai`. The frontend calls these endpoints for Little Star mentor replies and for scene/flower image generation. Vite dev proxies `/api` to the backend; production uses the Express server to serve `dist/`.

**Tech Stack:** React 19, Vite 6, Node 20+, Express, `@google/genai`, node:test

---

### Task 1: Server scaffold + health route

**Files:**
- Create: `server/app.js`
- Create: `server/index.js`
- Test: `tests/server-health.test.mjs`

**Step 1: Write the failing test**
```js
// tests/server-health.test.mjs
// Purpose: server/app.js exposes a health route for basic uptime checks.
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
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/server-health.test.mjs`
Expected: FAIL (module `server/app.js` missing)

**Step 3: Write minimal implementation**
```js
// server/app.js
import express from 'express';

export function createApp({ ai }) {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.locals.ai = ai;
  return app;
}
```
```js
// server/index.js
import { createApp } from './app.js';
import { createGenAiClient } from './genai-client.js';

const port = Number(process.env.PORT || 5174);
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is required');
}

const app = createApp({ ai: createGenAiClient({ apiKey }) });
app.listen(port, () => {
  console.log(`AI proxy listening on ${port}`);
});
```

**Step 4: Run test to verify it passes**
Run: `node --test tests/server-health.test.mjs`
Expected: PASS

**Step 5: Commit**
```bash
git add server/app.js server/index.js tests/server-health.test.mjs
git commit -m "feat: add express server scaffold"
```

---

### Task 2: Chat endpoint (Little Star)

**Files:**
- Modify: `server/app.js`
- Test: `tests/server-ai-chat.test.mjs`

**Step 1: Write the failing test**
```js
// tests/server-ai-chat.test.mjs
// Purpose: /api/ai/chat returns model text using injected AI client.
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
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/server-ai-chat.test.mjs`
Expected: FAIL (route missing)

**Step 3: Write minimal implementation**
```js
// server/app.js (add route)
app.post('/api/ai/chat', async (req, res) => {
  const { messages, context } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages required' });
  }
  const text = await app.locals.ai.generateChat({ messages, context });
  res.json({ text });
});
```

**Step 4: Run test to verify it passes**
Run: `node --test tests/server-ai-chat.test.mjs`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `node --test`
Expected: PASS

**Step 6: Commit**
```bash
git add server/app.js tests/server-ai-chat.test.mjs
git commit -m "feat: add ai chat endpoint"
```

---

### Task 3: Image endpoint

**Files:**
- Modify: `server/app.js`
- Test: `tests/server-ai-image.test.mjs`

**Step 1: Write the failing test**
```js
// tests/server-ai-image.test.mjs
// Purpose: /api/ai/image returns a data URL using injected AI client.
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
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/server-ai-image.test.mjs`
Expected: FAIL (route missing)

**Step 3: Write minimal implementation**
```js
// server/app.js (add route)
app.post('/api/ai/image', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'prompt required' });
  }
  const image = await app.locals.ai.generateImage({ prompt });
  res.json({ image });
});
```

**Step 4: Run test to verify it passes**
Run: `node --test tests/server-ai-image.test.mjs`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `node --test`
Expected: PASS

**Step 6: Commit**
```bash
git add server/app.js tests/server-ai-image.test.mjs
git commit -m "feat: add ai image endpoint"
```

---

### Task 4: Google GenAI client wrapper

**Files:**
- Create: `server/genai-client.js`
- Create: `server/chat-format.js`
- Test: `tests/chat-format.test.mjs`

**Step 1: Write the failing test**
```js
// tests/chat-format.test.mjs
// Purpose: chat-format maps UI messages to GenAI content roles.
import test from 'node:test';
import assert from 'node:assert/strict';
import { toContents } from '../server/chat-format.js';

test('toContents maps assistant -> model', () => {
  const messages = [
    { role: 'user', content: 'hi' },
    { role: 'assistant', content: 'hello' }
  ];
  const contents = toContents(messages);
  assert.deepEqual(contents, [
    { role: 'user', parts: [{ text: 'hi' }] },
    { role: 'model', parts: [{ text: 'hello' }] }
  ]);
});
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/chat-format.test.mjs`
Expected: FAIL (module missing)

**Step 3: Write minimal implementation**
```js
// server/chat-format.js
export function toContents(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
}
```
```js
// server/genai-client.js
import { GoogleGenAI } from '@google/genai';
import { toContents } from './chat-format.js';

const CHAT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'imagen-4.0-generate-001';

export function createGenAiClient({ apiKey }) {
  const ai = new GoogleGenAI({ apiKey });

  return {
    async generateChat({ messages, context }) {
      const system = [
        'You are Little Star, a warm, patient math mentor for kids.',
        'Be concise, encouraging, and ask one guiding question at a time.',
        'Never reveal the final answer directly.'
      ].join(' ');
      const prompt = context?.puzzleTitle
        ? `Puzzle: ${context.puzzleTitle}\n${context.puzzleText || ''}`
        : '';
      const contents = [
        { role: 'user', parts: [{ text: `${system}\n${prompt}`.trim() }] },
        ...toContents(messages)
      ];
      const response = await ai.models.generateContent({
        model: CHAT_MODEL,
        contents
      });
      return response.text;
    },

    async generateImage({ prompt }) {
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt
      });
      const image = response.generatedImages?.[0]?.image?.imageBytes;
      if (!image) {
        throw new Error('Image generation failed');
      }
      return `data:image/png;base64,${image}`;
    }
  };
}
```

**Step 4: Run test to verify it passes**
Run: `node --test tests/chat-format.test.mjs`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `node --test`
Expected: PASS

**Step 6: Commit**
```bash
git add server/genai-client.js server/chat-format.js tests/chat-format.test.mjs
git commit -m "feat: add google genai client wrapper"
```

---

### Task 5: Frontend AI client module

**Files:**
- Create: `src/lib/ai-client.js`
- Test: `tests/ai-client.test.mjs`

**Step 1: Write the failing test**
```js
// tests/ai-client.test.mjs
// Purpose: src/lib/ai-client.js wraps fetch calls to AI endpoints.
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateChat, generateImage } from '../src/lib/ai-client.js';

const realFetch = globalThis.fetch;

test('generateChat returns text', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ text: 'hi' })
  });
  const text = await generateChat({ messages: [{ role: 'user', content: 'hi' }] });
  assert.equal(text, 'hi');
});

test('generateImage returns image', async () => {
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ image: 'data:image/png;base64,abc' })
  });
  const image = await generateImage({ prompt: 'rose' });
  assert.equal(image, 'data:image/png;base64,abc');
});

test.after(() => {
  globalThis.fetch = realFetch;
});
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/ai-client.test.mjs`
Expected: FAIL (module missing)

**Step 3: Write minimal implementation**
```js
// src/lib/ai-client.js
const postJson = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${res.status}`);
  }
  return res.json();
};

export const generateChat = async ({ messages, context }) => {
  const data = await postJson('/api/ai/chat', { messages, context });
  return data.text;
};

export const generateImage = async ({ prompt }) => {
  const data = await postJson('/api/ai/image', { prompt });
  return data.image;
};
```

**Step 4: Run test to verify it passes**
Run: `node --test tests/ai-client.test.mjs`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `node --test`
Expected: PASS

**Step 6: Commit**
```bash
git add src/lib/ai-client.js tests/ai-client.test.mjs
git commit -m "feat: add frontend ai client"
```

---

### Task 6: Wire AI chat in GameEngine

**Files:**
- Modify: `src/components/gameEngine/GameEngine.jsx`

**Step 1: Write the failing test**
- No React test harness exists; add a minimal integration check to `tests/ai-client.test.mjs` for the chat payload shape instead of a component test.

```js
// tests/ai-client.test.mjs (add)
// Purpose: ensure chat payload supports context data.
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateChat } from '../src/lib/ai-client.js';

test('generateChat passes context', async () => {
  let body = null;
  globalThis.fetch = async (_url, init) => {
    body = JSON.parse(init.body);
    return { ok: true, json: async () => ({ text: 'ok' }) };
  };
  await generateChat({ messages: [{ role: 'user', content: 'hi' }], context: { puzzleTitle: 'X' } });
  assert.deepEqual(body.context, { puzzleTitle: 'X' });
});
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/ai-client.test.mjs`
Expected: FAIL (context not asserted/handled)

**Step 3: Write minimal implementation**
- Update `MentorChat` in `src/components/gameEngine/GameEngine.jsx` to call `generateChat` instead of `getMentorResponse`.
- Keep UI/animations the same; swap the response source.
- Provide `context` using current puzzle title/text if available.

**Step 4: Run tests to verify they pass**
Run: `node --test`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `npm run typecheck`
Expected: PASS

**Step 6: Commit**
```bash
git add src/components/gameEngine/GameEngine.jsx tests/ai-client.test.mjs
git commit -m "feat: wire mentor chat to genai"
```

---

### Task 7: Wire AI image generation (PowerGarden + scenes)

**Files:**
- Modify: `src/components/garden/PowerGarden.jsx`
- Modify: `src/components/story/SceneImageManager.jsx`
- Modify: `src/components/gameEngine/SceneBackgrounds.jsx`

**Step 1: Write the failing test**
- No UI test harness. Add a small `ai-client` test to ensure image prompt passes through.

```js
// tests/ai-client.test.mjs (add)
// Purpose: ensure image prompt is sent to backend.
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateImage } from '../src/lib/ai-client.js';

test('generateImage passes prompt', async () => {
  let body = null;
  globalThis.fetch = async (_url, init) => {
    body = JSON.parse(init.body);
    return { ok: true, json: async () => ({ image: 'data:image/png;base64,abc' }) };
  };
  await generateImage({ prompt: 'test prompt' });
  assert.deepEqual(body, { prompt: 'test prompt' });
});
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/ai-client.test.mjs`
Expected: FAIL (prompt not asserted/handled)

**Step 3: Write minimal implementation**
- In each component, replace placeholder generation with `generateImage({ prompt })` from `src/lib/ai-client.js`.
- Keep existing prompts and caching logic; remove placeholder fallbacks so failures surface.

**Step 4: Run tests to verify they pass**
Run: `node --test`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `npm run typecheck`
Expected: PASS

**Step 6: Commit**
```bash
git add src/components/garden/PowerGarden.jsx src/components/story/SceneImageManager.jsx src/components/gameEngine/SceneBackgrounds.jsx tests/ai-client.test.mjs
git commit -m "feat: wire image generation to genai"
```

---

### Task 8: Dev/prod wiring + docs

**Files:**
- Modify: `vite.config.js`
- Modify: `package.json`
- Modify: `README.md`

**Step 1: Write the failing test**
- Add a `tests/env.test.mjs` assertion for `GEMINI_API_KEY` when running the backend.

```js
// tests/env.test.mjs (append)
// Purpose: backend requires GEMINI_API_KEY.
import test from 'node:test';
import assert from 'node:assert/strict';

test('GEMINI_API_KEY is configured for backend', () => {
  assert.ok(process.env.GEMINI_API_KEY, 'GEMINI_API_KEY missing');
});
```

**Step 2: Run test to verify it fails**
Run: `node --test tests/env.test.mjs`
Expected: FAIL until env is set

**Step 3: Write minimal implementation**
- `vite.config.js`: add proxy `{ '/api': 'http://localhost:5174' }`.
- `package.json`: add scripts `dev:api` (node server/index.js) and `start` (node server/index.js).
- `README.md`: add backend setup and environment instructions; update the top doc string with date + commit id per repo rule.

**Step 4: Run tests to verify they pass**
Run: `GEMINI_API_KEY=... node --test`
Expected: PASS

**Step 5: Regression check (回归测试)**
Run: `npm run typecheck`
Expected: PASS

**Step 6: Commit**
```bash
git add vite.config.js package.json README.md tests/env.test.mjs
git commit -m "chore: add genai dev/prod wiring"
```

---

### Final verification
- `node --test`
- `npm run typecheck`
- Manual smoke test:
  1) `GEMINI_API_KEY=... npm run dev:api`
  2) In another terminal: `npm run dev`
  3) Open the app and verify mentor chat + images return GenAI output
