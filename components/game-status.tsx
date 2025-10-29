"use client";

import { useMemo } from 'react';
import { GameStatusProps } from '../types/game-types';

export default function GameStatus({ winner, xIsNext, isDraw }: GameStatusProps) {
  const { status, textColorClass } = useMemo(() => {
    if (winner) {
      return {
        status: `Winner: ${winner}`,
        textColorClass: winner === 'X' ? 'text-red-500' : 'text-blue-500'
      };
    }
    
    if (isDraw) {
      return {
        status: 'Draw: Game ended in a draw!',
        textColorClass: 'text-green-500'
      };
    }
    
    return {
      status: (
        <span>
          Next player: {' '}
          <span className={xIsNext ? 'text-red-500' : 'text-blue-500'}>
            {xIsNext ? 'X' : 'O'}
          </span>
        </span>
      ),
      textColorClass: 'text-black'
    };
  }, [winner, xIsNext, isDraw]);

  return (
    <div className={`mb-4 text-lg font-bold ${textColorClass}`}>
      {status}
    </div>
  );
}