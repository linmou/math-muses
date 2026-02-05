// File: tests/mentor-reply.test.mjs - verifies mentor reply fallback messaging.
import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchMentorReply } from '../src/lib/mentor-reply.js';

test('fetchMentorReply returns model reply', async () => {
  const generate = async () => 'Hello!';
  const result = await fetchMentorReply({ messages: [], context: {}, generate });
  assert.deepEqual(result, { text: 'Hello!', isPlaceholder: false });
});

test('fetchMentorReply returns placeholder on error', async () => {
  const generate = async () => { throw new Error('boom'); };
  const result = await fetchMentorReply({ messages: [], context: {}, generate });
  assert.equal(result.isPlaceholder, true);
  assert.ok(result.text.includes('Placeholder response'));
});
