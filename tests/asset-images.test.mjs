// File: tests/asset-images.test.mjs - verifies scene/background/character images use real assets.
import test from 'node:test';
import assert from 'node:assert/strict';

import { getBackgroundImage, getSceneImage } from '../src/lib/scene-images.js';
import { getCharacterPlaceholder } from '../src/lib/placeholder-images.js';

const isDataUri = (value) => typeof value === 'string' && value.startsWith('data:image/svg+xml');
const lower = (value) => String(value || '').toLowerCase();

const isKnownSceneAsset = (value) => {
  const url = lower(value);
  return url.includes('prologue.jpg') || url.includes('epilogue.jpg') || url.includes('mission_1_intro.jpg');
};

const isAvatarAsset = (value) => lower(value).includes('avatar');

test('getBackgroundImage uses prologue photo asset', () => {
  const url = getBackgroundImage('prologue');
  assert.ok(url, 'expected a background url');
  assert.ok(!isDataUri(url), 'expected non-placeholder image');
  assert.ok(lower(url).includes('prologue.jpg'));
});

test('getBackgroundImage maps mission intro to mission_1_intro asset', () => {
  const url = getBackgroundImage('mission_1_intro');
  assert.ok(url, 'expected a background url');
  assert.ok(!isDataUri(url), 'expected non-placeholder image');
  assert.ok(lower(url).includes('mission_1_intro.jpg'));
});

test('getSceneImage prefers mission_1_intro as the default scene asset', () => {
  const url = getSceneImage('rainbow_hall');
  assert.ok(url, 'expected a scene url');
  assert.ok(!isDataUri(url), 'expected non-placeholder image');
  assert.ok(lower(url).includes('mission_1_intro.jpg'));
});

test('getCharacterPlaceholder uses avatar asset for vera', () => {
  const url = getCharacterPlaceholder('vera');
  assert.ok(url, 'expected a character url');
  assert.ok(!isDataUri(url), 'expected non-placeholder image');
  assert.ok(lower(url).includes('vera_wang_avatar.png'));
});

test('getCharacterPlaceholder reuses an avatar asset for unknown character', () => {
  const url = getCharacterPlaceholder('dodo');
  assert.ok(url, 'expected a character url');
  assert.ok(!isDataUri(url), 'expected non-placeholder image');
  assert.ok(isAvatarAsset(url));
});
