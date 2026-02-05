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
