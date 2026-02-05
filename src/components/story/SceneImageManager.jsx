import { useState, useEffect } from 'react';
import { getScenePlaceholder } from '../../lib/placeholder-images';

// Scene image prompts for AI generation
const SCENE_PROMPTS = {
  rainbow_hall: "A magical fashion design studio with rainbow-colored silk fabric wall, elegant rolls of shimmering fabrics in red orange yellow green blue indigo violet, sunlight streaming through large windows creating colorful reflections, soft lavender scent ambiance, anime style illustration, warm and inviting atmosphere, Ghibli-inspired art style, sparkles of light, dreamy and enchanting",
  
  button_gallery: "A sparkling glass room filled with vintage antique buttons in transparent crystal drawers, rainbow light reflections creating kaleidoscope effects, precious gems and pearls mixed with buttons, magical and enchanting atmosphere, detailed and delicate, anime art style, soft golden lighting, Ghibli-inspired illustration",
  
  dream_room: "A dreamy exhibition room showcasing elegant evening gowns and wedding dresses on mannequins, soft pink and lavender lighting, flowing fabrics with sparkles, romantic and ethereal atmosphere, fashion studio interior, anime illustration style, Ghibli-inspired art, magical ambiance with floating petals",
  
  green_garden: "A beautiful indoor sustainable fashion garden with green plants, eco-friendly fabrics hanging like vines, natural lighting from skylights, wooden design elements, flowers and herbs growing, peaceful zen atmosphere, anime art style, Ghibli-inspired illustration, soft earth tones and green colors",
  
  ribbon_hallway: "An elegant hallway decorated with colorful silk ribbons flowing from ceiling, rainbow ribbons creating curtain-like effect, soft pastel walls, magical fashion studio corridor, anime illustration style, Ghibli-inspired art, dreamy atmosphere with gentle breeze effect, warm golden lighting"
};

export function useSceneImage(location) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateImage = () => {
      if (!location || !SCENE_PROMPTS[location]) return;
      setIsLoading(true);
      const placeholder = getScenePlaceholder(location);
      setImageUrl(placeholder);
      setIsLoading(false);
    };

    generateImage();
  }, [location]);

  return { imageUrl, isLoading };
}
