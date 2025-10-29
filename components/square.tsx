"use client";

import { useMemo } from 'react';
import { SquareProps } from '../types/game-types';

export default function Square({ value, onSquareClick }: SquareProps) {
  const textColorClass = useMemo(() => 
    value === 'X' ? 'text-red-500' : value === 'O' ? 'text-blue-500' : 'text-black',
    [value]
  );

  return (
    <button 
      className={`
        bg-white border border-gray-400 
        h-14 w-14 text-center cursor-pointer 
        font-bold text-xl
        hover:bg-gray-100 transition-colors
        ${textColorClass}
      `}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}