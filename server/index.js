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
