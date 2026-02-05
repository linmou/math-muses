import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Target, Lightbulb, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const ERROR_TYPES = {
  reading_error: {
    label: 'Reading Slip',
    icon: '👀',
    message: 'Looks like your eyes and brain played a little trick~',
    color: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-700'
  },
  formula_error: {
    label: 'Method Selection',
    icon: '🧭',
    message: 'The direction can be adjusted a bit~',
    color: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-700'
  },
  calculation_error: {
    label: 'Calculation Slip',
    icon: '✏️',
    message: 'Your fingers counted a bit too fast~',
    color: 'from-orange-100 to-orange-200',
    textColor: 'text-orange-700'
  },
  strategy_error: {
    label: 'Strategy Adjustment',
    icon: '🎯',
    message: 'Looking at it from a different angle will be clearer~',
    color: 'from-green-100 to-green-200',
    textColor: 'text-green-700'
  }
};

export default function AIFeedback({ 
  isCorrect, 
  errorType, 
  attributionGuidance, 
  strategySuggestion,
  picaratsEarned,
  flowerReward,
  onRetry,
  onContinue 
}) {
  const [step, setStep] = useState(0);
  const errorInfo = ERROR_TYPES[errorType] || ERROR_TYPES.strategy_error;

  useEffect(() => {
    if (!isCorrect) {
      const timer1 = setTimeout(() => setStep(1), 800);
      const timer2 = setTimeout(() => setStep(2), 2000);
      const timer3 = setTimeout(() => setStep(3), 3500);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isCorrect]);

  if (isCorrect) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-xl">
          {/* Celebration Header */}
          <div className="relative bg-gradient-to-r from-green-400 to-emerald-400 px-6 py-8 text-center overflow-hidden">
            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -50,
                  x: Math.sin(i) * 30
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity
                }}
                style={{ 
                  left: `${15 + i * 15}%`,
                  top: '60%'
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-200" />
              </motion.div>
            ))}
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Amazing! 🎉</h2>
            <p className="text-green-100">You successfully solved the puzzle!</p>
          </div>

          {/* Rewards */}
          <div className="px-6 py-6 space-y-4">
            {/* Picarats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between bg-yellow-50 rounded-2xl p-4 border border-yellow-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full 
                  flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Earned Picarats</p>
                  <p className="text-2xl font-bold text-yellow-800">+{picaratsEarned}</p>
                </div>
              </div>
            </motion.div>

            {/* Flower */}
            {flowerReward && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between bg-pink-50 rounded-2xl p-4 border border-pink-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full 
                    flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <div>
                    <p className="text-sm text-pink-700">A new flower bloomed in your garden</p>
                    <p className="text-lg font-bold text-pink-800">{flowerReward}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <Button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 
                hover:to-emerald-500 text-white rounded-xl py-6 text-lg shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Continue Adventure
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Wrong Answer - Three-step guidance
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-6 py-5 border-b border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full 
              flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-orange-800">Little Star wants to tell you...</h3>
              <p className="text-sm text-orange-600">Let's see what happened together ✨</p>
            </div>
          </div>
        </div>

        {/* Three-step Process */}
        <div className="px-6 py-5 space-y-4">
          {/* Step 1: Error Type Diagnosis */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-r ${errorInfo.color} rounded-2xl p-4 border border-white/50`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-xl">
                    {errorInfo.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Step 1: Finding the little detour</p>
                    <p className={`font-medium ${errorInfo.textColor}`}>{errorInfo.label}</p>
                  </div>
                </div>
                <p className={`text-sm ${errorInfo.textColor}`}>{errorInfo.message}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Attribution Guidance */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 border border-white/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Step 2: This is not about ability</p>
                    <p className="font-medium text-purple-700">Small things we can adjust</p>
                  </div>
                </div>
                <p className="text-sm text-purple-700">{attributionGuidance}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Strategy Suggestion */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-white/50"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Step 3: Try this strategy</p>
                    <p className="font-medium text-green-700">Here's a little tip</p>
                  </div>
                </div>
                <p className="text-sm text-green-700">{strategySuggestion}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Retry Button */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={onRetry}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 
                    hover:to-orange-500 text-white rounded-xl py-6 text-lg shadow-lg mt-4"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Try Again, I Can Do This!
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">
                  💪 Every attempt is progress
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}