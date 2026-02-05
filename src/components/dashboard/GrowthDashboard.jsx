import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flower2, Brain, Heart, TrendingUp, Award, Sparkles } from 'lucide-react';
import { Card } from "../../components/ui/card";

export default function GrowthDashboard({ 
  student,
  puzzleAttempts = [],
  totalPuzzlesSolved = 0
}) {
  // Calculate personal stats
  const totalAttempts = puzzleAttempts.length;
  const successRate = totalAttempts > 0 
    ? Math.round((puzzleAttempts.filter(a => a.is_correct).length / totalAttempts) * 100) 
    : 0;
  
  const growthMindsetPoints = student?.growth_mindset_points || 0;
  const totalPicarats = student?.total_picarats || 0;
  const flowersCollected = student?.flowers_collected?.length || 0;
  
  // Find highlights
  const recentSuccess = puzzleAttempts.filter(a => a.is_correct).slice(-3);
  const mostImproved = puzzleAttempts.filter(a => a.attempt_number > 1 && a.is_correct);

  const statCards = [
    {
      icon: Star,
      label: 'Picarats',
      value: totalPicarats,
      color: 'from-yellow-400 to-amber-400',
      bgColor: 'bg-amber-50'
    },
    {
      icon: Flower2,
      label: 'Flowers Collected',
      value: flowersCollected,
      color: 'from-pink-400 to-rose-400',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Brain,
      label: 'Puzzles Solved',
      value: totalPuzzlesSolved,
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Heart,
      label: 'Growth Mindset',
      value: growthMindsetPoints,
      color: 'from-green-400 to-emerald-400',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl md:text-3xl font-serif text-amber-800 mb-2">
          🌟 My Growth Journey
        </h2>
        <p className="text-amber-600/70">
          Only compare with yesterday's self, every step is progress
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${stat.bgColor} p-4 rounded-2xl border-none shadow-lg`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} 
                flex items-center justify-center mb-3 shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Personal Highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-amber-200 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full 
              flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-medium text-amber-800">✨ My Highlights</h3>
          </div>

          <div className="space-y-3">
            {/* Persistence Badge */}
            {mostImproved.length > 0 && (
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <span className="text-2xl">💪</span>
                <div>
                  <p className="font-medium text-gray-800">Persistence</p>
                  <p className="text-sm text-gray-500">
                    {mostImproved.length} puzzles solved after retrying!
                  </p>
                </div>
              </div>
            )}

            {/* Recent Successes */}
            {recentSuccess.length > 0 && (
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="font-medium text-gray-800">Recent Achievements</p>
                  <p className="text-sm text-gray-500">
                    Successfully solved {recentSuccess.length} puzzles recently!
                  </p>
                </div>
              </div>
            )}

            {/* Growth Mindset */}
            {growthMindsetPoints >= 10 && (
              <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="font-medium text-gray-800">Growth Mindset</p>
                  <p className="text-sm text-gray-500">
                    You're developing a stronger growth mindset!
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {mostImproved.length === 0 && recentSuccess.length === 0 && (
              <div className="text-center py-4">
                <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-2" />
                <p className="text-gray-500">Start your adventure to unlock more highlights!</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Progress Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <span className="font-medium text-purple-700">Aunt Vera's Words</span>
        </div>
        <p className="text-purple-700 italic">
          "Failure is not a finish line—it's a detour guiding you to a better version of yourself."
        </p>
      </motion.div>

      {/* No Ranking Notice */}
      <div className="text-center text-sm text-gray-400">
        <p>🌸 No rankings or comparisons here, only your own growth story 🌸</p>
      </div>
    </div>
  );
}