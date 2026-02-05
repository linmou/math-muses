import express from 'express';

export function createApp({ ai }) {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/ai/chat', async (req, res) => {
    const { messages, context } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages required' });
    }
    const text = await app.locals.ai.generateChat({ messages, context });
    res.json({ text });
  });

  app.locals.ai = ai;
  return app;
}
