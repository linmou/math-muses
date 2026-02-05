# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the React app. Entry points are `src/main.jsx` and `src/App.jsx`.
- `src/pages/` holds route-level pages (e.g., `Home.jsx`, `GamePlay.jsx`).
- `src/components/` contains reusable UI and feature components; `src/components/ui/` is vendor-style UI primitives.
- `src/lib/` holds shared utilities and app wiring (placeholder images, query client).
- Root config files include `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm run dev` — start the Vite dev server.
- `npm run build` — produce a production build in `dist/`.
- `npm run preview` — serve the production build locally.
- `npm run lint` — run ESLint on app code.
- `npm run lint:fix` — auto-fix lint issues where possible.
- `npm run typecheck` — run TypeScript checks for JS via `jsconfig.json`.

## Coding Style & Naming Conventions
- JSX files use React functional components with PascalCase (`Home.jsx`, `GamePlay.jsx`).
- Prefer import aliasing via `@/` for `src/` paths (configured in `jsconfig.json`).
- Follow existing style: 2-space indentation, single quotes in JS/JSX, semicolons optional.
- ESLint rules are defined in `eslint.config.js`; keep unused imports out.

## Testing Guidelines
- No dedicated test framework is configured yet.
- Use `npm run lint` and `npm run typecheck` as minimum quality gates.
- If adding tests, prefer `*.test.jsx` alongside components or a `__tests__/` folder within `src/`.

## Commit & Pull Request Guidelines
- This workspace doesn’t include `.git`, so no commit conventions are visible.
- If you initialize Git, keep commits short and scoped, e.g., `feat: add garden placeholders` or `fix: adjust routing`.
- PRs should include: summary, screenshots for UI changes, and linked issues if applicable.

## Security & Configuration Tips
- Avoid committing secrets; keep env files local.
