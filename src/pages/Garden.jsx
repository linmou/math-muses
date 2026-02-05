import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { Button } from "../components/ui/button";
import PowerGarden from '../components/garden/PowerGarden';

export default function Garden() {
  const student = {
    theme_color: 'lavender',
    flowers_collected: [],
    total_picarats: 0
  };

  const themeGradients = {
    lavender: 'from-purple-50 via-pink-50 to-purple-100',
    rose: 'from-rose-50 via-pink-50 to-rose-100',
    mint: 'from-green-50 via-emerald-50 to-green-100',
    sunset: 'from-orange-50 via-amber-50 to-orange-100'
  };

  const currentTheme = student?.theme_color || 'lavender';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeGradients[currentTheme]} p-4 md:p-8`}>
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <Link to={createPageUrl('Home')}>
            <Button variant="ghost" className="text-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Home className="w-5 h-5 text-gray-500" />
              </Button>
            </Link>
            <Link to={createPageUrl('GamePlay')}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <BookOpen className="w-5 h-5 text-gray-500" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Garden */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <PowerGarden
          flowers={student?.flowers_collected || []}
          totalPicarats={student?.total_picarats || 0}
          themeColor={currentTheme}
        />
      </motion.div>

      {/* Empty State Message */}
      {(!student?.flowers_collected || student.flowers_collected.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mt-8 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
            <span className="text-4xl mb-4 block">🌱</span>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Your garden is waiting...</h3>
            <p className="text-gray-500 text-sm mb-4">
              Each time you solve a puzzle, a new flower will bloom here. Start your adventure and bring your garden to life!
            </p>
            <Link to={createPageUrl('GamePlay')}>
              <Button className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl">
                Start Adventure
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
