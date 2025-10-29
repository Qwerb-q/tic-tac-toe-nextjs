"use client";

import { useMemo, useCallback } from 'react';
import { MoveHistoryProps } from '../types/game-types';

export default function MoveHistory({ history, currentMove, onJumpTo }: MoveHistoryProps) {
  const getMoveColorClass = useCallback((move: number) => {
    if (move === 0) return 'text-black';
    return move % 2 === 1 ? 'text-red-500' : 'text-blue-500';
  }, []);

  const moves = useMemo(() => 
    history.map((_, move) => {
      const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
      const textColorClass = getMoveColorClass(move);

      return (
        <li key={move} className="mb-2 list-none">
          <button 
            onClick={() => onJumpTo(move)}
            className={`
              w-full text-left font-bold cursor-pointer 
              px-3 py-2 border border-gray-300 
              bg-white hover:bg-gray-50 transition-colors
              ${textColorClass}
            `}
          >
            {description}
          </button>
        </li>
      );
    }), 
    [history, getMoveColorClass, onJumpTo]
  );

  return (
    <div className="w-48 p-4 bg-white border border-gray-300 rounded">
      <h3 className="text-base font-semibold mb-3 text-gray-800">Move History</h3>
      <ol className="pl-0 m-0">{moves}</ol>
    </div>
  );
}