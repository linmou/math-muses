import { getScenePlaceholder } from './placeholder-images.js';

const SCENE_KEYS = new Set([
  'rainbow_hall',
  'button_gallery',
  'dream_room',
  'green_garden',
  'ribbon_hallway'
]);

export const getSceneImage = (location) => {
  if (!location || !SCENE_KEYS.has(location)) return null;
  return getScenePlaceholder(location);
};

const getBackgroundType = (id) => {
  if (id === 'prologue') return 'prologue';
  if (id === 'epilogue') return 'epilogue';
  if (id.includes('intro')) return 'mission_intro';
  return 'workshop';
};

export const getBackgroundImage = (sceneId) => {
  const bgType = getBackgroundType(sceneId || '');
  return getScenePlaceholder(bgType);
};
