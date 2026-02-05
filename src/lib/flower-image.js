import { fetchAiImage } from './ai-image.js';

const placeholderKey = (cacheKey) => `${cacheKey}_placeholder`;

export const fetchFlowerImage = async ({
  prompt,
  placeholder,
  cacheKey,
  storage = localStorage,
  generate = fetchAiImage
}) => {
  const cached = storage.getItem(cacheKey);
  const isPlaceholder = storage.getItem(placeholderKey(cacheKey)) === '1';

  if (cached && !isPlaceholder) {
    return { image: cached, isPlaceholder: false };
  }

  try {
    const image = await generate(prompt);
    storage.setItem(cacheKey, image);
    storage.setItem(placeholderKey(cacheKey), '0');
    return { image, isPlaceholder: false };
  } catch (error) {
    storage.setItem(cacheKey, placeholder);
    storage.setItem(placeholderKey(cacheKey), '1');
    return { image: placeholder, isPlaceholder: true };
  }
};
