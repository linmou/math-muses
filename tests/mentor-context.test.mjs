// File: tests/mentor-context.test.mjs - builds mentor context from puzzle data.
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMentorContext } from '../src/lib/mentor-context.js';

test('buildMentorContext maps puzzle title and problem', () => {
  const puzzle = { title: 'Smart Fabric Allocation', problem: '360 meters of fabric.' };
  const context = buildMentorContext(puzzle);
  assert.deepEqual(context, {
    puzzleTitle: 'Smart Fabric Allocation',
    puzzleText: '360 meters of fabric.'
  });
});
