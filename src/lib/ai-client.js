const postJson = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${res.status}`);
  }
  return res.json();
};

export const generateChat = async ({ messages, context }) => {
  const data = await postJson('/api/ai/chat', { messages, context });
  return data.text;
};

export const generateImage = async ({ prompt }) => {
  const data = await postJson('/api/ai/image', { prompt });
  return data.image;
};
