import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Star } from 'lucide-react';

const AREAS = [
  {
    id: 'rainbow_hall',
    name: '🌈 Rainbow Fabric Hall',
    description: 'Fabrics from around the world arranged in rainbow order, with a gentle lavender scent in the air',
    position: { top: '25%', left: '50%' },
    color: 'from-pink-300 to-purple-400',
    unlockChapter: 1
  },
  {
    id: 'button_gallery',
    name: '💎 Antique Button Gallery',
    description: 'A sparkling glass room where each transparent drawer holds a special antique button',
    position: { top: '45%', left: '25%' },
    color: 'from-blue-300 to-cyan-400',
    unlockChapter: 2
  },
  {
    id: 'dream_room',
    name: '✨ Dream Exhibition Room',
    description: 'The most mysterious place—opening the door is like opening a storybook',
    position: { top: '45%', left: '75%' },
    color: 'from-yellow-300 to-orange-400',
    unlockChapter: 3
  },
  {
    id: 'green_garden',
    name: '🌿 Green Garden',
    description: 'A greenhouse filled with natural dye plants, where butterflies and bees dance among the flowers',
    position: { top: '65%', left: '35%' },
    color: 'from-green-300 to-emerald-400',
    unlockChapter: 4
  },
  {
    id: 'ribbon_hallway',
    name: '🎀 Ribbon Hallway',
    description: 'Red, pink, gold, and silver ribbons hanging from the ceiling like a colorful waterfall',
    position: { top: '65%', left: '65%' },
    color: 'from-rose-300 to-pink-400',
    unlockChapter: 5
  }
];

export default function StudioMap({ unlockedAreas = ['rainbow_hall'], currentChapter = 1, onAreaSelect }) {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const isUnlocked = (areaId) => unlockedAreas.includes(areaId);

  const handleAreaClick = (area) => {
    if (isUnlocked(area.id)) {
      setSelectedArea(area);
      onAreaSelect?.(area);
    }
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
      {/* Background - Studio Interior */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
        {/* Window Light Effect */}
        <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-gradient-to-b from-yellow-100/60 to-transparent rounded-b-full" />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Sparkles className="w-8 h-8 text-amber-400" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-20">
          <Star className="w-6 h-6 text-pink-400" />
        </div>
      </div>

      {/* Studio Title */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center z-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-serif text-amber-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Aunt Vera's Magical Design Studio
        </motion.h2>
        <p className="text-amber-600/70 text-sm mt-1">Click to explore different areas</p>
      </div>

      {/* Area Nodes */}
      {AREAS.map((area, index) => {
        const unlocked = isUnlocked(area.id);
        const isHovered = hoveredArea === area.id;
        
        return (
          <motion.div
            key={area.id}
            className="absolute cursor-pointer"
            style={{ top: area.position.top, left: area.position.left }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, type: 'spring' }}
          >
            <motion.button
              className={`relative -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full 
                ${unlocked 
                  ? `bg-gradient-to-br ${area.color} shadow-lg hover:shadow-xl` 
                  : 'bg-gray-200 opacity-50'
                }
                flex items-center justify-center transition-all duration-300`}
              whileHover={unlocked ? { scale: 1.1 } : {}}
              whileTap={unlocked ? { scale: 0.95 } : {}}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={() => handleAreaClick(area)}
            >
              {unlocked ? (
                <span className="text-3xl md:text-4xl">{area.name.split(' ')[0]}</span>
              ) : (
                <Lock className="w-8 h-8 text-gray-400" />
              )}
              
              {/* Sparkle Effect for Unlocked */}
              {unlocked && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
              )}
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-3 
                    bg-white/95 backdrop-blur-sm rounded-xl shadow-lg z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h3 className="font-medium text-gray-800 text-sm">{area.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{area.description}</p>
                  {!unlocked && (
                    <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Unlock by completing Chapter {area.unlockChapter}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Decorative paths connecting areas */}
        <path
          d="M50%,25% Q37%,35% 25%,45%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          className="opacity-40"
        />
      </svg>
    </div>
  );
}