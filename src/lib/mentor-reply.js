import { generateChat } from './ai-client.js';

const PLACEHOLDER_REPLY = 'Placeholder response (AI offline). Please try again later.';

export const fetchMentorReply = async ({ messages, context, generate = generateChat }) => {
  try {
    const text = await generate({ messages, context });
    return { text, isPlaceholder: false };
  } catch (error) {
    return { text: PLACEHOLDER_REPLY, isPlaceholder: true };
  }
};
