import React from 'react';
import { motion } from 'framer-motion';
import { Type, Languages, Eye, Zap } from 'lucide-react';
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const LANGUAGES = [
  { id: 'en', name: 'English', emoji: '🇬🇧' },
  { id: 'zh', name: '中文', emoji: '🇨🇳' },
  { id: 'es', name: 'Español', emoji: '🇪🇸' },
  { id: 'fr', name: 'Français', emoji: '🇫🇷' }
];

const FONTS = [
  { 
    id: 'inter', 
    name: 'Inter', 
    preview: 'The quick brown fox',
    style: { fontFamily: 'Inter, sans-serif' }
  },
  { 
    id: 'comic', 
    name: 'Comic Sans', 
    preview: 'The quick brown fox',
    style: { fontFamily: 'Comic Sans MS, cursive' }
  },
  { 
    id: 'serif', 
    name: 'Georgia', 
    preview: 'The quick brown fox',
    style: { fontFamily: 'Georgia, serif' }
  },
  { 
    id: 'dyslexic', 
    name: 'OpenDyslexic', 
    preview: 'The quick brown fox',
    style: { fontFamily: 'Arial, sans-serif', fontWeight: '600' }
  }
];

const TEXT_SIZES = [
  { id: 'small', name: 'Small', size: 'text-sm' },
  { id: 'medium', name: 'Medium', size: 'text-base' },
  { id: 'large', name: 'Large', size: 'text-lg' },
  { id: 'xlarge', name: 'Extra Large', size: 'text-xl' }
];

export default function AccessibilityConfig({ 
  config, 
  onConfigChange,
  onBack,
  onContinue 
}) {
  const handleChange = (key, value) => {
    onConfigChange({ ...config, [key]: value });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 
          rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Eye className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-amber-800 mb-2">
          Personalize Your Experience
        </h2>
        <p className="text-gray-500">
          Choose settings that make you feel comfortable
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Language Selection */}
        <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Languages className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800">Language</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleChange('language', lang.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  config.language === lang.id
                    ? 'border-purple-400 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                <div className="text-2xl mb-1">{lang.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{lang.name}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Font Selection */}
        <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-gray-800">Font Style</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FONTS.map((font) => (
              <button
                key={font.id}
                onClick={() => handleChange('font_family', font.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  config.font_family === font.id
                    ? 'border-pink-400 bg-pink-50 shadow-md'
                    : 'border-gray-200 hover:border-pink-200'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">{font.name}</div>
                <div style={font.style} className="text-base text-gray-800">
                  {font.preview}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Text Size */}
        <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-800">Text Size</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TEXT_SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => handleChange('text_size', size.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  config.text_size === size.id
                    ? 'border-amber-400 bg-amber-50 shadow-md'
                    : 'border-gray-200 hover:border-amber-200'
                }`}
              >
                <div className={`${size.size} font-medium text-gray-700`}>
                  Aa
                </div>
                <div className="text-xs text-gray-500 mt-1">{size.name}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Accessibility Toggles */}
        <Card className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Accessibility</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div>
                <div className="font-medium text-gray-800">High Contrast</div>
                <div className="text-xs text-gray-500">Stronger colors for better visibility</div>
              </div>
              <input
                type="checkbox"
                checked={config.high_contrast}
                onChange={(e) => handleChange('high_contrast', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
              <div>
                <div className="font-medium text-gray-800">Reduced Motion</div>
                <div className="text-xs text-gray-500">Minimize animations and effects</div>
              </div>
              <input
                type="checkbox"
                checked={config.reduced_motion}
                onChange={(e) => handleChange('reduced_motion', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
            </label>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-xl py-6"
        >
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 
            hover:from-purple-500 hover:to-pink-500 text-white rounded-xl py-6"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}