const resolveApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) {
    return process.env.VITE_API_BASE_URL;
  }
  return '';
};

const buildUrl = (path) => {
  const base = resolveApiBaseUrl().replace(/\/$/, '');
  return `${base}${path}`;
};

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
  const data = await postJson(buildUrl('/api/ai/chat'), { messages, context });
  return data.text;
};

export const generateImage = async ({ prompt }) => {
  const data = await postJson(buildUrl('/api/ai/image'), { prompt });
  return data.image;
};
