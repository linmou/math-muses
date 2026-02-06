<!-- Updated: 2026-02-06 Commit: 69b6b99 -->
# Math Muses

A frontend-first interactive math game and creative sandbox. AI features are optional and run through a local Node proxy.

## Local development

1. Install dependencies: `npm install`
2. (Optional AI) Add `GEMINI_API_KEY=your_key` to `.env` (or export it)
3. Run both servers (recommended): `npm run dev:all`

If you only want the frontend, you can run: `npm run dev`. AI chat and flower images will show placeholders when the backend is unavailable.

## Backend proxy (AI)

- Start API only: `npm run dev:api`
- Production-style start: `npm run start`

## Render split deployment

This repo supports a split Render setup (static frontend + API service). The blueprint is in `render.yaml`.

Static site env vars:
- `VITE_API_BASE_URL` → `https://math-muses-api.onrender.com`

Web service env vars:
- `GEMINI_API_KEY` (set in Render dashboard)
- `CORS_ORIGIN` → `https://math-muses-web.onrender.com`

## Integration tests (live GenAI)

These tests only run when explicitly enabled to avoid accidental API usage:

```
RUN_GENAI_INTEGRATION=1 GEMINI_API_KEY=your_key node --test tests/integration-genai.test.mjs
```
