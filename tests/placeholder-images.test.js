// File: tests/placeholder-images.test.js - validates offline placeholder SVG data URIs.
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getCharacterPlaceholder,
  getFlowerPlaceholder,
  getScenePlaceholder
} from '../src/lib/placeholder-images.js';

function decodeSvg(dataUri) {
  const parts = dataUri.split(',', 2);
  return decodeURIComponent(parts[1] || '');
}

test('getFlowerPlaceholder returns svg data uri with label', () => {
  const uri = getFlowerPlaceholder('rose');
  assert.ok(uri.startsWith('data:image/svg+xml;utf8,'));
  const svg = decodeSvg(uri);
  assert.ok(svg.includes('<svg'));
  assert.ok(svg.toLowerCase().includes('rose'));
});

test('getScenePlaceholder returns svg data uri with label', () => {
  const uri = getScenePlaceholder('rainbow_hall');
  assert.ok(uri.startsWith('data:image/svg+xml;utf8,'));
  const svg = decodeSvg(uri);
  assert.ok(svg.includes('<svg'));
  assert.ok(svg.toLowerCase().includes('rainbow'));
});

test('getCharacterPlaceholder returns svg data uri with label', () => {
  const uri = getCharacterPlaceholder('vera');
  assert.ok(uri.startsWith('data:image/svg+xml;utf8,'));
  const svg = decodeSvg(uri);
  assert.ok(svg.includes('<svg'));
  assert.ok(svg.toLowerCase().includes('vera'));
});

test('unknown keys fall back to generic labels', () => {
  const uri = getFlowerPlaceholder('unknown_flower');
  const svg = decodeSvg(uri);
  assert.ok(svg.toLowerCase().includes('flower'));
});
