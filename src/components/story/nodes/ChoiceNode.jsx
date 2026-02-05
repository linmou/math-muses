import React from 'react';
import { Handle, Position } from 'reactflow';

export default function ChoiceNode({ data }) {
  return (
    <div className="bg-blue-100 rounded-lg border-2 border-blue-400 p-3 min-w-[200px] shadow-md">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🔀</span>
        <span className="text-xs font-semibold text-blue-700 uppercase">Choice</span>
      </div>
      <div className="text-sm text-gray-700">
        {data.question || 'No question...'}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {data.choices?.length || 0} choices
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}