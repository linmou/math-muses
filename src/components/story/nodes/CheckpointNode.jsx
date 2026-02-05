import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CheckpointNode({ data }) {
  return (
    <div className="bg-green-100 rounded-lg border-2 border-green-400 p-3 min-w-[200px] shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">⭐</span>
        <span className="text-xs font-semibold text-green-700 uppercase">Checkpoint</span>
      </div>
      <div className="text-sm text-gray-700">
        {data.reward_type}: +{data.reward_value || 0}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}