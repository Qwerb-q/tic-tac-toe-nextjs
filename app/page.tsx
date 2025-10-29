"use client";

import { useState, useCallback, useMemo } from 'react';
import { SquareValue } from '../types/game-types';
import Board from '../components/board';
import MoveHistory from '../components/move-history';

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  
  const xIsNext = useMemo(() => currentMove % 2 === 0, [currentMove]);
  const currentSquares = useMemo(() => history[currentMove], [history, currentMove]);

  const handlePlay = useCallback((nextSquares: SquareValue[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }, [history, currentMove]);

  const jumpTo = useCallback((nextMove: number) => {
    setCurrentMove(nextMove);
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6 items-center md:items-start justify-center min-h-screen bg-gray-50">
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <MoveHistory 
        history={history} 
        currentMove={currentMove} 
        onJumpTo={jumpTo} 
      />
    </div>
  );
}