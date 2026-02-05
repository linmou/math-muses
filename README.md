<!-- Updated: 2026-02-05 Commit: 3622420 -->
# Math Muses

A frontend-first interactive math game and creative sandbox. AI features are optional and run through a local Node proxy.

## Local development

1. Install dependencies: `npm install`
2. (Optional AI) Set your key: `export GEMINI_API_KEY=your_key`
3. Run both servers (recommended): `npm run dev:all`

If you only want the frontend, you can run: `npm run dev`. AI chat and flower images will show placeholders when the backend is unavailable.

## Backend proxy (AI)

- Start API only: `npm run dev:api`
- Production-style start: `npm run start`
