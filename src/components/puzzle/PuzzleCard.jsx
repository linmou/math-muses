import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Lightbulb, Pause, Send, RefreshCw, Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { useSceneImage } from '../story/SceneImageManager';

export default function PuzzleCard({ 
  puzzle, 
  onSubmit, 
  onPause, 
  onHint,
  hintsUsed = 0,
  isProcessing = false 
}) {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const picaratDisplay = Math.max(puzzle?.picarat_value - (hintsUsed * 10), 10);

  // Use AI-generated puzzle image
  const { imageUrl: puzzleImage, isLoading: isLoadingImage } = useSceneImage(puzzle?.location);

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  const handleHint = () => {
    if (puzzle?.hints && currentHintIndex < puzzle.hints.length) {
      setShowHint(true);
      onHint?.(currentHintIndex);
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  if (!puzzle) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-4 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-serif text-amber-800">{puzzle.title}</h3>
              <p className="text-sm text-amber-600">Chapter {puzzle.chapter} · Mission {puzzle.mission}</p>
            </div>
            
            {/* Picarat Badge */}
            <motion.div 
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-400 
                px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-5 h-5 text-white fill-white" />
              <span className="text-white font-bold">{picaratDisplay}</span>
              <span className="text-white/80 text-sm">Picarats</span>
            </motion.div>
          </div>
        </div>

        {/* Story Context with Image */}
        <div className="px-6 py-4 bg-white/50">
          {/* Puzzle Image */}
          {(puzzleImage || isLoadingImage) && (
            <div className="mb-4 rounded-2xl overflow-hidden">
              {isLoadingImage ? (
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-purple-600">Drawing puzzle illustration...</p>
                  </div>
                </div>
              ) : (
                <motion.img 
                  src={puzzleImage} 
                  alt="Puzzle illustration"
                  className="w-full h-48 object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </div>
          )}
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 
              flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/80 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <p className="text-gray-700 text-sm leading-relaxed italic">
                "{puzzle.story_context}"
              </p>
            </div>
          </div>
        </div>

        {/* Problem */}
        <div className="px-6 py-5">
          <div className="bg-white rounded-2xl p-5 shadow-inner border border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="font-medium text-amber-800">Puzzle Challenge</span>
            </div>
            <p className="text-gray-800 leading-relaxed">
              {puzzle.problem_text}
            </p>
          </div>
        </div>

        {/* Hint Area */}
        <AnimatePresence>
          {showHint && puzzle.hints && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6"
            >
              <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Hint {currentHintIndex}</span>
                </div>
                <p className="text-blue-700 text-sm">
                  {puzzle.hints[currentHintIndex - 1]}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Input */}
        <div className="px-6 pb-4">
          <div className="flex gap-3">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="flex-1 bg-white border-amber-200 focus:border-amber-400 rounded-xl"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              disabled={!answer.trim() || isProcessing}
              className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 
                hover:to-orange-500 text-white rounded-xl px-6 shadow-lg"
            >
              {isProcessing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleHint}
              disabled={!puzzle.hints || currentHintIndex >= puzzle.hints.length}
              className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Get Hint
              {puzzle.hints && (
                <span className="ml-1 text-xs opacity-70">
                  ({Math.max(0, puzzle.hints.length - currentHintIndex)} left)
                </span>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={onPause}
              className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause & Get Strategy
            </Button>
          </div>
        </div>

        {/* Math Concept Tag */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-center">
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              💡 Math Concept: {puzzle.math_concept}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}