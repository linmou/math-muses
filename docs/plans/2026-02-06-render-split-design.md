# Render Split Deployment Design

## Goal
Deploy the frontend and API as separate Render services: a Static Site for the Vite build and a Web Service for the Express API.

## Approach
- Frontend reads `VITE_API_BASE_URL` to target the API host when deployed.
- Backend accepts `CORS_ORIGIN` to allow the static site domain; no wildcard.
- `.env` is still supported for local dev, Render env vars for production.
- Provide a `render.yaml` blueprint for both services.

## Services
### Web Service (API)
- Build: `npm install`
- Start: `node server/index.js`
- Env: `NODE_ENV=production`, `CORS_ORIGIN=https://math-muses-web.onrender.com`, `GEMINI_API_KEY` set in Render dashboard.

### Static Site (Frontend)
- Build: `npm install && npm run build`
- Publish: `dist`
- Env: `VITE_API_BASE_URL=https://math-muses-api.onrender.com`

## Testing
- `node --test tests/ai-client.test.mjs`
- `node --test tests/server-cors.test.mjs`
- `GEMINI_API_KEY=dummy node --test`
