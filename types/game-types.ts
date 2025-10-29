export type SquareValue = 'X' | 'O' | null;

export interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
}

export interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (squares: SquareValue[]) => void;
}

export interface GameStatusProps {
  winner: SquareValue;
  xIsNext: boolean;
  isDraw: boolean;
}

export interface MoveHistoryProps {
  history: SquareValue[][];
  currentMove: number;
  onJumpTo: (move: number) => void;
}