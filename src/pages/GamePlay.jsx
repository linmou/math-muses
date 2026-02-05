import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import GameEngine from '../components/gameEngine/GameEngine';

export default function GamePlay() {
  const navigate = useNavigate();
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameComplete = (score) => {
    setFinalScore(score);
    setGameCompleted(true);
  };

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Card className="p-8 max-w-md text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-serif text-gray-800 mb-4">Congratulations!</h2>
            <div className="text-5xl font-bold text-amber-600 mb-6">
              {finalScore} Picarats
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Back to Home
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <GameEngine onComplete={handleGameComplete} />
    </div>
  );
}