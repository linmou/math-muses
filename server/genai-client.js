import { GoogleGenAI } from '@google/genai';
import { toContents } from './chat-format.js';

const CHAT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

export function createGenAiClient({ apiKey, client }) {
  const ai = client || new GoogleGenAI({ apiKey });

  return {
    async generateChat({ messages, context }) {
      const system = [
        'You are Little Star, a warm, patient math mentor for kids.',
        'Be concise, encouraging, and ask one guiding question at a time.',
        'Never reveal the final answer directly.'
      ].join(' ');
      const contextText = context?.puzzleTitle
        ? `Puzzle: ${context.puzzleTitle}\n${context.puzzleText || ''}`.trim()
        : '';
      const contents = contextText
        ? [{ role: 'user', parts: [{ text: contextText }] }, ...toContents(messages)]
        : toContents(messages);
      const response = await ai.models.generateContent({
        model: CHAT_MODEL,
        contents,
        config: { systemInstruction: system }
      });
      return response.text;
    },

    async generateImage({ prompt }) {
      const response = await ai.models.generateContent({
        model: IMAGE_MODEL,
        contents: prompt
      });
      const parts = response.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((part) => part.inlineData?.data);
      if (!imagePart) {
        throw new Error('Image generation failed');
      }
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }
  };
}
