import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { getFlowerPlaceholder } from '../../lib/placeholder-images';

const FLOWER_TYPES = {
  rose: { 
    emoji: '🌹', 
    name: 'Rose', 
    color: 'from-rose-300 to-pink-400',
    prompt: 'Beautiful blooming red rose flower, close-up, soft petals, dewdrops, natural lighting, romantic, dreamy, watercolor illustration style, gentle background, anime art style'
  },
  tulip: { 
    emoji: '🌷', 
    name: 'Tulip', 
    color: 'from-pink-300 to-red-400',
    prompt: 'Elegant pink tulip flower in full bloom, soft petals, spring garden, pastel colors, watercolor illustration, dreamy atmosphere, anime art style'
  },
  sunflower: { 
    emoji: '🌻', 
    name: 'Sunflower', 
    color: 'from-yellow-300 to-amber-400',
    prompt: 'Bright cheerful sunflower in full bloom, golden yellow petals, warm sunlight, summer vibes, watercolor illustration style, dreamy background, anime art style'
  },
  lavender: { 
    emoji: '💜', 
    name: 'Lavender', 
    color: 'from-purple-300 to-violet-400',
    prompt: 'Delicate purple lavender flowers, soft purple petals, peaceful garden, calming atmosphere, watercolor illustration, dreamy, anime art style'
  },
  daisy: { 
    emoji: '🌼', 
    name: 'Daisy', 
    color: 'from-white to-yellow-200',
    prompt: 'Sweet white daisy flower with yellow center, innocent and pure, soft petals, gentle breeze, watercolor illustration style, dreamy, anime art style'
  },
  cherry: { 
    emoji: '🌸', 
    name: 'Cherry Blossom', 
    color: 'from-pink-200 to-rose-300',
    prompt: 'Delicate cherry blossom sakura flowers, soft pink petals, spring romance, gentle breeze, watercolor illustration style, dreamy atmosphere, anime art style'
  },
  lily: { 
    emoji: '🪻', 
    name: 'Lily', 
    color: 'from-purple-200 to-pink-300',
    prompt: 'Elegant lily flower in bloom, soft petals, graceful and pure, natural lighting, watercolor illustration style, dreamy, anime art style'
  },
  hibiscus: { 
    emoji: '🌺', 
    name: 'Hibiscus', 
    color: 'from-red-300 to-pink-400',
    prompt: 'Tropical hibiscus flower, vibrant petals, exotic and beautiful, lush garden, watercolor illustration style, dreamy, anime art style'
  }
};

const GROWTH_STAGES = ['🌱', '🌿', '🌾', '🌸'];

export default function PowerGarden({ flowers = [], totalPicarats = 0, themeColor = 'lavender' }) {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [flowerImage, setFlowerImage] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  // Pre-generate all flower images on mount
  useEffect(() => {
    const preGenerateFlowerImages = () => {
      const uniqueFlowerTypes = [...new Set(flowers.map(f => f.flower_type))];
      
      for (const flowerType of uniqueFlowerTypes) {
        const cacheKey = `flower_${flowerType}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (!cached) {
          localStorage.setItem(cacheKey, getFlowerPlaceholder(flowerType));
        }
      }
    };

    if (flowers.length > 0) {
      preGenerateFlowerImages();
    }
  }, [flowers]);

  // Load selected flower image
  useEffect(() => {
    const loadFlowerImage = () => {
      if (!selectedFlower) {
        setFlowerImage(null);
        return;
      }

      const cacheKey = `flower_${selectedFlower.flower_type}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        setFlowerImage(cached);
        setIsLoadingImage(false);
        return;
      }

      setIsLoadingImage(true);
      const placeholder = getFlowerPlaceholder(selectedFlower.flower_type);
      localStorage.setItem(cacheKey, placeholder);
      setFlowerImage(placeholder);
      setIsLoadingImage(false);
    };

    loadFlowerImage();
  }, [selectedFlower]);

  const themeGradients = {
    lavender: 'from-purple-100 via-pink-50 to-purple-100',
    rose: 'from-rose-100 via-pink-50 to-rose-100',
    mint: 'from-green-100 via-emerald-50 to-green-100',
    sunset: 'from-orange-100 via-amber-50 to-orange-100'
  };

  // Generate garden grid
  const gardenSlots = 24;
  const filledSlots = flowers.slice(0, gardenSlots);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Garden Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-amber-800 mb-2">
          🌸 Girls' Power Garden
        </h2>
        <p className="text-amber-600/70">
          Each puzzle solved brings a new flower to life
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <p className="text-xs text-gray-500">Total Picarats</p>
            <p className="text-2xl font-bold text-amber-600">✨ {totalPicarats}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
            <p className="text-xs text-gray-500">Flowers Collected</p>
            <p className="text-2xl font-bold text-pink-500">🌸 {flowers.length}</p>
          </div>
        </div>
      </motion.div>

      {/* Garden Area */}
      <motion.div
        className={`relative bg-gradient-to-br ${themeGradients[themeColor]} 
          rounded-3xl p-6 md:p-8 shadow-xl border-4 border-white/50 overflow-hidden`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-200 rounded-full blur-2xl" />
        </div>

        {/* Garden Fence */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-100/50 to-transparent" />

        {/* Flower Grid */}
        <div className="relative grid grid-cols-6 md:grid-cols-8 gap-3 md:gap-4">
          {[...Array(gardenSlots)].map((_, index) => {
            const flower = filledSlots[index];
            const hasFlower = !!flower;
            
            return (
              <motion.button
                key={index}
                className={`aspect-square rounded-2xl flex items-center justify-center
                  transition-all duration-300 ${
                    hasFlower 
                      ? 'bg-white/60 hover:bg-white/80 shadow-lg cursor-pointer' 
                      : 'bg-white/20 border-2 border-dashed border-white/40'
                  }`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={hasFlower ? { scale: 1.1, rotate: [-2, 2, -2, 0] } : {}}
                onClick={() => hasFlower && setSelectedFlower(flower)}
              >
                {hasFlower ? (
                  <motion.span 
                    className="text-2xl md:text-3xl"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    {FLOWER_TYPES[flower.flower_type]?.emoji || '🌸'}
                  </motion.span>
                ) : (
                  <span className="text-xl text-white/40">🌱</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Growth Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <span className="text-gray-600">Growth stages:</span>
          {GROWTH_STAGES.map((stage, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-xl">{stage}</span>
              <span className="text-gray-500 text-xs">
                {['Seed', 'Sprout', 'Bud', 'Bloom'][i]}
              </span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Flower Detail Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {/* Flower Image */}
                <div className="mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                  {isLoadingImage ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-pink-400 animate-spin mx-auto mb-3" />
                        <p className="text-pink-600">Drawing flower...</p>
                      </div>
                    </div>
                  ) : flowerImage ? (
                    <motion.img 
                      src={flowerImage} 
                      alt={FLOWER_TYPES[selectedFlower.flower_type]?.name}
                      className="w-full h-64 object-cover"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <motion.span 
                        className="text-8xl"
                        animate={{ rotate: [-5, 5, -5], y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {FLOWER_TYPES[selectedFlower.flower_type]?.emoji || '🌸'}
                      </motion.span>
                    </div>
                  )}
                </div>

                <h3 className={`text-2xl font-bold bg-gradient-to-r ${FLOWER_TYPES[selectedFlower.flower_type]?.color} 
                  bg-clip-text text-transparent mb-2`}>
                  {FLOWER_TYPES[selectedFlower.flower_type]?.name || 'Mystery Flower'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Earned on: {selectedFlower.earned_date || 'Your adventure'}
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                  <p className="text-gray-700 text-sm">
                    Growth stage: {GROWTH_STAGES[selectedFlower.growth_stage - 1 || 0]} → 
                    {GROWTH_STAGES[Math.min(selectedFlower.growth_stage || 1, 3)]}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
