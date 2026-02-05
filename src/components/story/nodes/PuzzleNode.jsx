import React from 'react';
import { Handle, Position } from 'reactflow';

export default function PuzzleNode({ data }) {
  return (
    <div className="bg-amber-100 rounded-lg border-2 border-amber-400 p-3 min-w-[200px] shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🧩</span>
        <span className="text-xs font-semibold text-amber-700 uppercase">Puzzle</span>
      </div>
      <div className="text-sm text-gray-700">
        {data.puzzle_id || 'Select puzzle...'}
      </div>
      <Handle type="source" position={Position.Bottom} id="correct" style={{ left: '33%' }} />
      <Handle type="source" position={Position.Bottom} id="incorrect" style={{ left: '66%' }} />
    </div>
  );
}