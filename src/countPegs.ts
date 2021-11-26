import { Board } from "./board/Board";

export function countPegs(board: Board): number {
  let num = 0;

  for (let y = 0; y < board.getHeight(); y++) {
    for (let x = 0; x < board.getWidth(); x++) {
      if (board.isValidPosition(x, y) && board.hasPegAt(x, y)) {
        num++;
      }
    }
  }

  return num;
}
