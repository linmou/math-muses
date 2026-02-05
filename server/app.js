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

  app.post('/api/ai/image', async (req, res) => {
    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'prompt required' });
    }
    const image = await app.locals.ai.generateImage({ prompt });
    res.json({ image });
  });

  app.locals.ai = ai;
  return app;
}
