import { generateImage } from './ai-client.js';

export const fetchAiImage = async (prompt) => {
  if (!prompt) {
    throw new Error('prompt required');
  }
  return generateImage({ prompt });
};
