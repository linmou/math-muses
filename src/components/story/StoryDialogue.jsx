import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { useSceneImage } from './SceneImageManager';

const CHARACTERS = {
  vera: {
    name: 'Vera Wang',
    emoji: '👗',
    color: 'from-gray-700 to-gray-900',
    bgColor: 'bg-gray-50'
  },
  luna: {
    name: 'Luna',
    emoji: '🎨',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50'
  },
  stella: {
    name: 'Stella',
    emoji: '📊',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50'
  },
  rose: {
    name: 'Rose',
    emoji: '🌹',
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-pink-50'
  }
};

const LOCATION_NAMES = {
  rainbow_hall: 'Rainbow Fabric Hall',
  button_gallery: 'Antique Button Gallery',
  dream_room: 'Dream Exhibition Room',
  green_garden: 'Green Garden',
  ribbon_hallway: 'Ribbon Hallway'
};

export default function StoryDialogue({ 
  dialogues = [], 
  onComplete,
  backgroundImage,
  location 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  // Use AI-generated scene image
  const { imageUrl: sceneImage, isLoading: isLoadingImage } = useSceneImage(location);
  
  // Reset index when dialogues change
  useEffect(() => {
    setCurrentIndex(0);
  }, [dialogues]);

  const currentDialogue = dialogues[currentIndex];
  const character = CHARACTERS[currentDialogue?.character] || CHARACTERS.vera;

  // Typewriter effect
  useEffect(() => {
    if (!currentDialogue) return;
    
    setIsTyping(true);
    setDisplayedText('');
    
    let index = 0;
    const text = currentDialogue.text;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentIndex, currentDialogue]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing animation
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
    } else if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  if (!currentDialogue) return null;

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden">
      {/* Background - with generated image if available */}
      <div className="absolute inset-0">
        {isLoadingImage ? (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-100 via-pink-50 to-purple-50 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-3" />
              <p className="text-purple-600">Drawing scene...</p>
            </div>
          </div>
        ) : sceneImage ? (
          <div className="absolute inset-0">
            <img 
              src={sceneImage} 
              alt="Scene" 
              className="w-full h-full object-cover"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-rose-100">
            {/* Scene-specific background elements */}
            {location === 'rainbow_hall' && (
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200" />
              </div>
            )}
            {location === 'button_gallery' && (
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-gradient-to-br from-white to-gray-200 rounded-full shadow-lg"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 60}%`,
                    }}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location Label */}
      {location && (
        <motion.div 
          className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-sm text-gray-600">
            📍 {LOCATION_NAMES[location] || location}
          </span>
        </motion.div>
      )}

      {/* Mute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg z-10"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-600" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Progress Indicator */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1">
        {dialogues.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex 
                ? 'bg-amber-400 w-6' 
                : i < currentIndex 
                  ? 'bg-amber-300' 
                  : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Dialogue Box */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${character.bgColor} rounded-3xl shadow-2xl overflow-hidden`}
        >
          {/* Character Header */}
          <div className={`bg-gradient-to-r ${character.color} px-6 py-3 flex items-center gap-3`}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
              {character.emoji}
            </div>
            <span className="text-white font-medium text-lg">{character.name}</span>
          </div>

          {/* Dialogue Text */}
          <div className="p-6">
            <p className="text-lg leading-relaxed text-gray-800">
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-gray-400 ml-1"
                />
              )}
            </p>
          </div>

          {/* Action Button */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleNext}
              className={`w-full bg-gradient-to-r ${character.color} hover:opacity-90 
                text-white rounded-xl py-5 text-lg shadow-lg`}
            >
              {isTyping ? (
                'Skip'
              ) : currentIndex < dialogues.length - 1 ? (
                <>
                  Continue
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Start Mission
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}