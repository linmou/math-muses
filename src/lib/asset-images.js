const IMAGE_FILES = [
  'prologue.jpg',
  'Epilogue.jpg',
  'mission_1_intro.jpg',
  'Vera_Wang_avatar.png',
  'luna_avatar.png',
  'Stella_avatar.png',
  'Rose_avatar.png'
];

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const toTokens = (value) => normalize(value).split(' ').filter(Boolean);

const buildAsset = (filename) => {
  const base = filename.replace(/\.[^.]+$/, '');
  const tokens = toTokens(base);
  return {
    filename,
    url: new URL(`../../images/${filename}`, import.meta.url).href,
    tokens,
    isAvatar: tokens.includes('avatar')
  };
};

const ASSETS = IMAGE_FILES.map(buildAsset);
const SCENE_ASSETS = ASSETS.filter((asset) => !asset.isAvatar);
const AVATAR_ASSETS = ASSETS.filter((asset) => asset.isAvatar);

const findMatch = (key, assets) => {
  const normalized = String(key || '').replace(/[_-]+/g, ' ');
  const keyTokens = toTokens(normalized);
  if (!keyTokens.length) return null;
  const match = assets.find((asset) => keyTokens.every((token) => asset.tokens.includes(token)));
  return match ? match.url : null;
};

const fallbackUrl = (assets, preferredFilename = '') => {
  if (!assets.length) return null;
  const preferred = assets.find((asset) => asset.filename === preferredFilename);
  return (preferred || assets[0]).url;
};

export const getSceneAsset = (key) =>
  findMatch(key, SCENE_ASSETS) || fallbackUrl(SCENE_ASSETS, 'mission_1_intro.jpg');

export const getBackgroundAsset = (key) =>
  findMatch(key, SCENE_ASSETS) || fallbackUrl(SCENE_ASSETS, 'mission_1_intro.jpg');

export const getCharacterAsset = (key) => findMatch(key, AVATAR_ASSETS) || fallbackUrl(AVATAR_ASSETS);
