import React from 'react';
import { Handle, Position } from 'reactflow';

export default function DialogueNode({ data }) {
  const characters = {
    narrator: { emoji: '📖', color: 'bg-gray-100' },
    vera: { emoji: '👗', color: 'bg-purple-100' },
    dodo: { emoji: '🎨', color: 'bg-pink-100' },
    rainy: { emoji: '📚', color: 'bg-blue-100' },
    bebe: { emoji: '🌍', color: 'bg-green-100' },
  };

  const char = characters[data.character] || characters.narrator;

  return (
    <div className={`${char.color} rounded-lg border-2 border-gray-300 p-3 min-w-[200px] shadow-md`}>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{char.emoji}</span>
        <span className="text-xs font-semibold text-gray-600 uppercase">{data.character}</span>
      </div>
      <div className="text-sm text-gray-700">
        {data.text || 'No text yet...'}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}