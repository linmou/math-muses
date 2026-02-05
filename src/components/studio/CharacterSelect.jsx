import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Heart } from 'lucide-react';
import { getCharacterPlaceholder } from '../../lib/placeholder-images';

const CHARACTERS = [
  {
    id: 'dodo',
    name: 'Dodo',
    age: 9,
    emoji: '🎀',
    imageUrl: getCharacterPlaceholder('dodo'),
    trait: 'Quick Thinker',
    description: 'Lively and creative, with a mind that works fast, dreams of becoming a fashion designer',
    specialty: 'Bursts of inspiration, unlimited creativity',
    color: 'from-pink-300 to-rose-400',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'rainy',
    name: 'Rainy',
    age: 10,
    emoji: '📓',
    imageUrl: getCharacterPlaceholder('rainy'),
    trait: 'Logic Organizer',
    description: 'Quiet and meticulous, good at organizing complex problems, the class math helper',
    specialty: 'Clear organization, step by step',
    color: 'from-blue-300 to-indigo-400',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'bebe',
    name: 'Bebe',
    age: 9,
    emoji: '🌍',
    imageUrl: getCharacterPlaceholder('bebe'),
    trait: 'Detail Checker',
    description: 'Gentle and careful, always notices small details others miss, loves protecting Earth',
    specialty: 'Careful checking, nothing is missed',
    color: 'from-green-300 to-emerald-400',
    bgColor: 'bg-green-50'
  }
];

export default function CharacterSelect({ onSelect, selectedCharacter }) {
  const [hoveredChar, setHoveredChar] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl md:text-3xl font-serif text-amber-800 mb-2">
          Choose Your Companion
        </h2>
        <p className="text-amber-600/70">
          Each character has unique abilities, they'll adventure with you
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHARACTERS.map((char, index) => {
          const isSelected = selectedCharacter === char.id;
          const isHovered = hoveredChar === char.id;
          
          return (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.button
                className={`relative w-full p-6 rounded-3xl transition-all duration-300
                  ${isSelected 
                    ? `bg-gradient-to-br ${char.color} shadow-xl ring-4 ring-white` 
                    : `${char.bgColor} hover:shadow-lg`
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredChar(char.id)}
                onMouseLeave={() => setHoveredChar(null)}
                onClick={() => onSelect(char.id)}
              >
                {/* Character Avatar */}
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <motion.div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${char.color} 
                      flex items-center justify-center text-4xl shadow-lg overflow-hidden`}
                    animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {char.imageUrl ? (
                      <img src={char.imageUrl} alt={char.name} className="w-full h-full object-cover" />
                    ) : (
                      char.emoji
                    )}
                  </motion.div>
                  
                  {isSelected && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full 
                        flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Star className="w-5 h-5 text-white fill-white" />
                    </motion.div>
                  )}
                </div>

                {/* Character Info */}
                <div className={`text-center ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  <h3 className="text-xl font-bold mb-1">
                    {char.name}
                    <span className="text-sm font-normal opacity-70 ml-2">{char.age} years old</span>
                  </h3>
                  
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs mb-3
                    ${isSelected ? 'bg-white/20' : 'bg-white/80'}`}
                  >
                    <Sparkles className="w-3 h-3" />
                    {char.trait}
                  </div>
                  
                  <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                    {char.description}
                  </p>
                  
                  <div className={`text-xs px-3 py-2 rounded-xl
                    ${isSelected ? 'bg-white/20' : 'bg-white/60'}`}
                  >
                    <Heart className="w-3 h-3 inline mr-1" />
                    Specialty: {char.specialty}
                  </div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
