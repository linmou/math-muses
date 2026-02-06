import { getCharacterAsset } from './asset-images.js';

const DEFAULT_COLORS = ['#FDE68A', '#FBCFE8'];

const FLOWER_COLORS = {
  rose: ['#FDA4AF', '#FBCFE8'],
  tulip: ['#FCA5A5', '#F9A8D4'],
  sunflower: ['#FDE68A', '#F59E0B'],
  lavender: ['#DDD6FE', '#C4B5FD'],
  daisy: ['#FEF9C3', '#FDE68A'],
  cherry: ['#FBCFE8', '#F9A8D4'],
  lily: ['#E9D5FF', '#FBCFE8'],
  hibiscus: ['#FCA5A5', '#FB7185']
};

const SCENE_COLORS = {
  rainbow_hall: ['#E9D5FF', '#FBCFE8'],
  button_gallery: ['#FDE68A', '#FECACA'],
  dream_room: ['#E0E7FF', '#FBCFE8'],
  green_garden: ['#DCFCE7', '#BBF7D0'],
  ribbon_hallway: ['#FFE4E6', '#DDD6FE']
};

const CHARACTER_COLORS = {
  vera: ['#E5E7EB', '#9CA3AF'],
  luna: ['#C4B5FD', '#FBCFE8'],
  stella: ['#BFDBFE', '#A5F3FC'],
  rose: ['#FBCFE8', '#FDA4AF'],
  dodo: ['#FBCFE8', '#F9A8D4'],
  rainy: ['#BFDBFE', '#C7D2FE'],
  bebe: ['#BBF7D0', '#A7F3D0']
};

const toTitle = (value, fallback) => {
  if (!value) return fallback;
  const normalized = value.replace(/[_-]+/g, ' ').trim();
  return normalized ? normalized : fallback;
};

const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const buildSvg = ({ title, subtitle, colors }) => {
  const [start, end] = colors || DEFAULT_COLORS;
  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">` +
    `<defs>` +
    `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="${start}"/>` +
    `<stop offset="100%" stop-color="${end}"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="800" height="600" fill="url(#bg)"/>` +
    `<rect x="60" y="60" width="680" height="480" rx="32" fill="rgba(255,255,255,0.6)"/>` +
    `<text x="400" y="280" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#374151">${title}</text>` +
    `<text x="400" y="340" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#6B7280">${subtitle}</text>` +
    `</svg>`
  );
};

export const getFlowerPlaceholder = (flowerType) => {
  const title = toTitle(flowerType, 'Flower');
  const colors = FLOWER_COLORS[flowerType] || DEFAULT_COLORS;
  return toDataUri(buildSvg({ title, subtitle: 'Power Garden', colors }));
};

export const getScenePlaceholder = (sceneKey) => {
  const title = toTitle(sceneKey, 'Scene');
  const colors = SCENE_COLORS[sceneKey] || DEFAULT_COLORS;
  return toDataUri(buildSvg({ title, subtitle: 'Story Scene', colors }));
};

export const getCharacterPlaceholder = (characterId) => {
  const asset = getCharacterAsset(characterId);
  if (asset) return asset;
  const title = toTitle(characterId, 'Character');
  const colors = CHARACTER_COLORS[characterId] || DEFAULT_COLORS;
  return toDataUri(buildSvg({ title, subtitle: 'Companion', colors }));
};
