<!-- Updated: 2026-02-06 Commit: 68727b0 -->
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
