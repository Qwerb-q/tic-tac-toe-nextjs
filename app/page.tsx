"use client";

import { useState } from 'react';
import { styleText } from 'util';

type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  const textColor = value === 'X' ? 'red' : value === 'O' ? 'blue' : 'black';
  return (
    <button 
      style={{
        background: '#fff',
        border: '2px solid #0008ffff',
        height: '60px', 
        textAlign: 'center',
        width: '60px',
        cursor: 'pointer',
        color: textColor,
        fontWeight: 'bold',
        fontSize: '24px',
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (squares: SquareValue[]) => void;
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let statusColor = 'white';
  if (winner) {
    status = 'Winner: ' + winner;
    statusColor = winner === 'X' ? 'red' : 'blue';
  } else {
    status = (
      <span>
        Next player: {}
        <span style={{ 
          color: xIsNext ? 'red' : 'blue',
          fontWeight: 'bold'
        }}>
          {xIsNext ? 'X' : 'O'} {}
        </span>
      </span>
    );
  }

  return (
    <div>
      <div style={{ color: statusColor, marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
        {status}
      </div>
      <div style={{ display: 'inline-block', border: '3px solid #0008ffff' }}>
        <div style={{ display: 'flex' }}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div style={{ display: 'flex' }}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div style={{ display: 'flex' }}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const getMoveColor = (move: number) => {
    if (move === 0) return 'black';
    return move % 2 === 1 ? 'red' : 'blue';
  };

  const moves = history.map((squares, move) => {
    let description: string;
    if (move > 0) {
      description = 'Go to move ' + move;
    } else {
      description = 'Go to game start';
    }

    const textColor = getMoveColor(move);
    return (
      <li key={move} style={{ marginBottom: '10px', listStyle: 'none' }}>
        <button 
          onClick={() => jumpTo(move)}
          style={{
            background: '#ffffffff',
            color: textColor,
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div style={{ 
      display: 'flex',  
      padding: '70px',
      gap: '40px',
    }}>
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ width: '200px' }}>
        <ol style={{ paddingLeft: '20px', margin: 0 }}>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: SquareValue[]): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}