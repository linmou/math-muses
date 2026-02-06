// File: tests/scene-images.test.mjs - verifies placeholder selection for scenes and backgrounds.
import test from 'node:test';
import assert from 'node:assert/strict';
import { getSceneImage, getBackgroundImage } from '../src/lib/scene-images.js';

test('getSceneImage returns asset for known location', () => {
  const image = getSceneImage('rainbow_hall');
  assert.ok(image);
  assert.ok(!image.startsWith('data:image/svg+xml'));
});

test('getSceneImage returns null for unknown location', () => {
  const image = getSceneImage('unknown_place');
  assert.equal(image, null);
});

test('getBackgroundImage returns asset for any scene id', () => {
  const image = getBackgroundImage('mission_1_intro');
  assert.ok(image);
  assert.ok(!image.startsWith('data:image/svg+xml'));
});
