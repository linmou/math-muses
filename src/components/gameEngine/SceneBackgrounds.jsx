// Scene background component with offline placeholders
import React, { useState, useEffect } from 'react';
import { getScenePlaceholder } from '../../lib/placeholder-images';

// Cache for generated backgrounds
const backgroundCache = {};

export default function SceneBackground({ sceneId, children }) {
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  // Define background prompts for different scene types
  const backgroundPrompts = {
    prologue: "Elegant high-end bridal fashion atelier boutique interior, luxurious Fifth Avenue New York, floor-to-ceiling windows with morning sunlight, wedding dress mannequins, soft pastel pink and purple tones, watercolor illustration style, delicate and dreamy atmosphere, designer workspace with fabric rolls and sketches",
    
    mission_intro: "Cozy design studio workspace for fashion designers, drafting tables with sketches and fabric swatches, color palettes on walls, crystal buttons and beads displayed, soft pastel lavender and pink lighting, watercolor illustration style, warm and creative atmosphere",
    
    workshop: "Bright fashion design workshop with cutting tables, sewing machines, organized fabric storage, measuring tapes and mannequins, soft natural lighting, watercolor illustration style, professional yet inviting space with pastel accents",
    
    epilogue: "Magical golden hour sunset view through large fashion studio windows, New York City skyline in purple and gold tones, dreamy evening atmosphere, watercolor illustration style, soft pastel colors, romantic and peaceful ambiance"
  };

  // Map scene IDs to background types
  const getBackgroundType = (id) => {
    if (id === 'prologue') return 'prologue';
    if (id === 'epilogue') return 'epilogue';
    if (id.includes('intro')) return 'mission_intro';
    return 'workshop';
  };

  useEffect(() => {
    const generateBackground = () => {
      const bgType = getBackgroundType(sceneId);
      if (!backgroundPrompts[bgType]) return;

      // Check cache first
      if (backgroundCache[bgType]) {
        setBackgroundUrl(backgroundCache[bgType]);
        return;
      }

      const placeholder = getScenePlaceholder(bgType);
      backgroundCache[bgType] = placeholder;
      setBackgroundUrl(placeholder);
    };

    generateBackground();
  }, [sceneId]);

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      {backgroundUrl && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>
      )}
      
      {/* Gradient fallback */}
      {!backgroundUrl && (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
