// File: tests/flower-image.test.mjs - verifies flower image fallback and cache markers.
import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchFlowerImage } from '../src/lib/flower-image.js';

const createStorage = () => {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => { map.set(key, value); }
  };
};

test('fetchFlowerImage uses generated image when available', async () => {
  const storage = createStorage();
  const generate = async () => 'data:image/png;base64,ok';
  const result = await fetchFlowerImage({
    prompt: 'rose',
    placeholder: 'placeholder',
    cacheKey: 'flower_rose',
    storage,
    generate
  });
  assert.deepEqual(result, { image: 'data:image/png;base64,ok', isPlaceholder: false });
  assert.equal(storage.getItem('flower_rose_placeholder'), '0');
});

test('fetchFlowerImage falls back to placeholder on error', async () => {
  const storage = createStorage();
  const generate = async () => { throw new Error('fail'); };
  const result = await fetchFlowerImage({
    prompt: 'rose',
    placeholder: 'placeholder',
    cacheKey: 'flower_rose',
    storage,
    generate
  });
  assert.deepEqual(result, { image: 'placeholder', isPlaceholder: true });
  assert.equal(storage.getItem('flower_rose_placeholder'), '1');
});
