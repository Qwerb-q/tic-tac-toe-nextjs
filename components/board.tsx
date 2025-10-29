"use client";

import { useCallback, useMemo } from 'react';
import { BoardProps } from '../types/game-types';
import { calculateWinner, isDraw } from '../utils/game-logic';
import Square from './square';
import GameStatus from './game-status';

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares), [squares]);

  const handleClick = useCallback((i: number) => {
    if (winner || draw || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }, [winner, draw, squares, xIsNext, onPlay]);

  return (
    <div className="p-4">
      <GameStatus winner={winner} xIsNext={xIsNext} isDraw={draw} />
      <div className="inline-block border-2 border-gray-800">
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}