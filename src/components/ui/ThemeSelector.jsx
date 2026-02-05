import React from 'react';
import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

const THEMES = [
  {
    id: 'lavender',
    name: 'Lavender Dream',
    colors: ['#E9D5FF', '#C4B5FD', '#A78BFA'],
    emoji: '💜'
  },
  {
    id: 'rose',
    name: 'Rose Whisper',
    colors: ['#FECDD3', '#FDA4AF', '#FB7185'],
    emoji: '🌹'
  },
  {
    id: 'mint',
    name: 'Mint Fresh',
    colors: ['#A7F3D0', '#6EE7B7', '#34D399'],
    emoji: '🌿'
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: ['#FED7AA', '#FDBA74', '#FB923C'],
    emoji: '🌅'
  }
];

export default function ThemeSelector({ currentTheme = 'lavender', onThemeChange }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-700">Choose your favorite theme</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {THEMES.map((theme, index) => {
          const isSelected = currentTheme === theme.id;
          
          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onThemeChange(theme.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all ${
                isSelected 
                  ? 'border-gray-800 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Color Preview */}
              <div className="flex gap-1 mb-3">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 h-8 rounded-lg first:rounded-l-xl last:rounded-r-xl"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Theme Name */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {theme.emoji} {theme.name}
                </span>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}