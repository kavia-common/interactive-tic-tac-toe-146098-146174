export type Player = "X" | "O" | null;
export type Board = Player[];

export const initialBoard = (): Board => Array(9).fill(null);

export const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export function calculateWinner(board: Board): { winner: Player; line: number[] | null } {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function nextPlayer(board: Board): Exclude<Player, null> {
  const xCount = board.filter((c) => c === "X").length;
  const oCount = board.filter((c) => c === "O").length;
  return xCount === oCount ? "X" : "O";
}

export function makeMove(board: Board, index: number, player: Exclude<Player, null>): Board {
  if (board[index] !== null) return board;
  const copy = board.slice();
  copy[index] = player;
  return copy;
}

export function gameStatus(board: Board): {
  label: string;
  done: boolean;
  winner: Player;
  line: number[] | null;
} {
  const { winner, line } = calculateWinner(board);
  if (winner) {
    return { label: `Winner: ${winner}`, done: true, winner, line };
  }
  if (isBoardFull(board)) {
    return { label: "Draw", done: true, winner: null, line: null };
  }
  const turn = nextPlayer(board);
  return { label: `Turn: ${turn}`, done: false, winner: null, line: null };
}
