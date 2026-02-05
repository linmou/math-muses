import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/card';

export default function PuzzleVisualization({ puzzleType, data }) {
  const [selectedBox, setSelectedBox] = useState(null);

  // Fabric division visualization (360 ÷ 3)
  if (puzzleType === 'fabric_division') {
    const totalLength = 360;
    const parts = 3;
    const partLength = totalLength / parts;

    return (
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <h4 className="text-center font-semibold text-gray-700 mb-4">Visual Representation</h4>
        
        <div className="space-y-6">
          {/* Total fabric bar */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Total: 360 meters</p>
            <div className="h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                360m
              </div>
            </div>
          </div>

          {/* Divided parts */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Divided into 3 equal parts:</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((part) => (
                <motion.div
                  key={part}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBox(part)}
                  className={`h-12 rounded-lg cursor-pointer transition-all ${
                    selectedBox === part 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 ring-4 ring-amber-300' 
                      : 'bg-gradient-to-r from-purple-200 to-pink-200'
                  }`}
                >
                  <div className="h-full flex items-center justify-center text-gray-700 font-bold">
                    120m
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-20 h-10 bg-blue-200 rounded flex items-center justify-center text-sm font-semibold">
                🌙 Moon
              </div>
              <div className="text-gray-600">→</div>
              <div className="h-10 w-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex items-center justify-center font-bold">
                1 box = 120m
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-10 bg-yellow-200 rounded flex items-center justify-center text-sm font-semibold">
                ☀️ Sun
              </div>
              <div className="text-gray-600">→</div>
              <div className="flex gap-2">
                <div className="h-10 w-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex items-center justify-center font-bold">120m</div>
                <div className="text-gray-600">+</div>
                <div className="h-10 w-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex items-center justify-center font-bold">120m</div>
              </div>
              <div className="text-sm text-gray-600">= 240m</div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Crystal buttons visualization (600 ÷ 4)
  if (puzzleType === 'crystal_buttons') {
    return (
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
        <h4 className="text-center font-semibold text-gray-700 mb-4">Visual Representation</h4>
        
        <div className="space-y-6">
          {/* Total buttons */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Total: 600 crystal buttons</p>
            <div className="h-12 bg-gradient-to-r from-purple-400 to-yellow-300 rounded-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                600 buttons
              </div>
            </div>
          </div>

          {/* Divided into boxes */}
          <div>
            <p className="text-sm text-gray-600 mb-2">If Purple = 1 box, Yellow = 3 boxes, Total = 4 boxes</p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((box) => (
                <motion.div
                  key={box}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBox(box)}
                  className={`h-16 rounded-lg cursor-pointer transition-all ${
                    selectedBox === box 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 ring-4 ring-amber-300' 
                      : 'bg-gradient-to-r from-indigo-200 to-purple-200'
                  }`}
                >
                  <div className="h-full flex items-center justify-center text-gray-700 font-bold text-sm">
                    📦<br/>150
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Calculation */}
          <div className="bg-white/50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">600 ÷ 4 = 150 per box</p>
          </div>

          {/* Result */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-24 h-10 bg-purple-300 rounded flex items-center justify-center text-sm font-semibold">
                💜 Purple
              </div>
              <div className="text-gray-600">→</div>
              <div className="h-10 w-16 bg-gradient-to-r from-indigo-200 to-purple-200 rounded flex items-center justify-center font-bold text-xs">
                150
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-10 bg-yellow-300 rounded flex items-center justify-center text-sm font-semibold">
                💛 Yellow
              </div>
              <div className="text-gray-600">→</div>
              <div className="grid grid-cols-3 gap-1 w-40">
                <div className="h-10 bg-gradient-to-r from-indigo-200 to-purple-200 rounded flex items-center justify-center text-xs font-bold">150</div>
                <div className="h-10 bg-gradient-to-r from-indigo-200 to-purple-200 rounded flex items-center justify-center text-xs font-bold">150</div>
                <div className="h-10 bg-gradient-to-r from-indigo-200 to-purple-200 rounded flex items-center justify-center text-xs font-bold">150</div>
              </div>
              <div className="text-sm text-gray-600">= 450</div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Rose's dresses (6 ÷ 3)
  if (puzzleType === 'rose_dresses') {
    return (
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50">
        <h4 className="text-center font-semibold text-gray-700 mb-4">Visual Representation</h4>
        
        <div className="space-y-6">
          {/* Total dresses */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Total: 6 dresses</p>
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5,6].map((dress) => (
                <div key={dress} className="text-3xl">👗</div>
              ))}
            </div>
          </div>

          {/* Parts */}
          <div>
            <p className="text-sm text-gray-600 mb-2">If Purple = 1 part, Yellow = 2 parts, Total = 3 parts</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((part) => (
                <motion.div
                  key={part}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBox(part)}
                  className={`h-16 rounded-lg cursor-pointer transition-all ${
                    selectedBox === part 
                      ? 'bg-gradient-to-r from-amber-400 to-orange-400 ring-4 ring-amber-300' 
                      : 'bg-gradient-to-r from-pink-200 to-rose-200'
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center text-gray-700">
                    <div className="text-2xl">👗👗</div>
                    <div className="text-xs font-bold">2 dresses</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-24 h-10 bg-purple-300 rounded flex items-center justify-center text-sm font-semibold">
                💜 Purple
              </div>
              <div className="text-gray-600">→</div>
              <div className="h-10 w-32 bg-gradient-to-r from-pink-200 to-rose-200 rounded flex items-center justify-center">
                <span className="text-2xl">👗👗</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-24 h-10 bg-yellow-300 rounded flex items-center justify-center text-sm font-semibold">
                💛 Yellow
              </div>
              <div className="text-gray-600">→</div>
              <div className="flex gap-1">
                <div className="h-10 w-20 bg-gradient-to-r from-pink-200 to-rose-200 rounded flex items-center justify-center">
                  <span className="text-2xl">👗👗</span>
                </div>
                <div className="h-10 w-20 bg-gradient-to-r from-pink-200 to-rose-200 rounded flex items-center justify-center">
                  <span className="text-2xl">👗👗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Age problem visualization
  if (puzzleType === 'age_difference') {
    return (
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50">
        <h4 className="text-center font-semibold text-gray-700 mb-4">Timeline Visualization</h4>
        
        <div className="space-y-6">
          {/* Timeline */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500">10 years ago</span>
              <span className="text-xs text-gray-500">Now</span>
              <span className="text-xs text-gray-500">18 years later</span>
            </div>
            <div className="h-2 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-full relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full"></div>
            </div>
          </div>

          {/* Visual representation */}
          <div className="space-y-4">
            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Master (Grandma Wang)</p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-blue-200 rounded text-sm">10 yrs ago: 44</div>
                <div className="text-gray-400">→</div>
                <div className="px-3 py-2 bg-purple-300 rounded text-sm font-bold">Now: 54</div>
              </div>
            </div>

            <div className="bg-white/50 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Apprentice (Vera)</p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-2 bg-purple-300 rounded text-sm font-bold">Now: ?</div>
                <div className="text-gray-400">→</div>
                <div className="px-3 py-2 bg-pink-200 rounded text-sm">18 yrs later: ?</div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border-2 border-amber-200">
              <p className="text-sm text-center">
                Apprentice (in 18 yrs) = Master (10 yrs ago)<br/>
                <span className="font-bold">Age difference = 18 + 10 = 28 years</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}