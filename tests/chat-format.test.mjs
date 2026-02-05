// File: tests/chat-format.test.mjs - verifies chat formatting and GenAI wrapper behavior.
import test from 'node:test';
import assert from 'node:assert/strict';
import { toContents } from '../server/chat-format.js';
import { createGenAiClient } from '../server/genai-client.js';

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

test('createGenAiClient uses injected client for chat and image', async () => {
  const calls = { chat: null, image: null };
  const client = {
    models: {
      generateContent: async (args) => {
        if (args.model === 'gemini-2.5-flash-image') {
          calls.image = args;
          return {
            candidates: [
              {
                content: {
                  parts: [
                    { inlineData: { data: 'abc' } }
                  ]
                }
              }
            ]
          };
        }
        calls.chat = args;
        return { text: 'hello' };
      }
    }
  };

  const ai = createGenAiClient({ apiKey: 'test-key', client });

  const text = await ai.generateChat({
    messages: [{ role: 'user', content: 'help' }],
    context: { puzzleTitle: 'Test' }
  });
  const image = await ai.generateImage({ prompt: 'rose' });

  assert.equal(text, 'hello');
  assert.equal(image, 'data:image/png;base64,abc');
  assert.equal(calls.chat.model, 'gemini-2.5-flash');
  assert.equal(calls.image.model, 'gemini-2.5-flash-image');
});
