const placeholderText = 'Placeholder response (missing GEMINI_API_KEY).';

const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#f6f4f0"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="24" fill="#6b6b6b">Placeholder image</text></svg>`;
const placeholderImage = `data:image/svg+xml;base64,${Buffer.from(placeholderSvg).toString('base64')}`;

export function createFallbackAi() {
  return {
    isFallback: true,
    async generateChat() {
      return placeholderText;
    },
    async generateImage() {
      return placeholderImage;
    }
  };
}
