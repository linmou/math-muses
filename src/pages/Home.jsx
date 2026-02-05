import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { createPageUrl } from '../utils';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">👗</div>
              <h1 className="text-4xl font-serif text-gray-800 mb-2">
                Vera Wang's Bridal Quest
              </h1>
              <p className="text-xl text-purple-600">Chapter One: The Crystal Mystery</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">📖 Story Introduction</h3>
                <p className="text-gray-700">
                  On a morning on Fifth Avenue in New York, Vera Wang Atelier received a special royal commission.
                  Princess Ingrid of Norway's wedding is approaching, but to win this commission, you need to work with three designer assistants
                  to complete a series of design challenges!
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🎯 Game Objectives</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Solve 5 math design challenges</li>
                  <li>• Learn unit thinking method and proportional allocation</li>
                  <li>• Collect 200 Picarats points</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => navigate(createPageUrl('GamePlay'))}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Adventure
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}