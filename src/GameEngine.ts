import { Board } from "./board/Board";

export interface Turn {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function turnFromString(str: string): Turn {
  const matches = str.match(/^([a-z])(\d+)-([a-z])(\d+)$/);

  if (!matches) {
    throw new Error("invalid syntax");
  }

  return {
    startX: matches[1].charCodeAt(0) - 97,
    startY: Number.parseInt(matches[2], 10) - 1,
    endX: matches[3].charCodeAt(0) - 97,
    endY: Number.parseInt(matches[4], 10) - 1,
  };
}

export function turn(board: Board, turn: Turn): Board {
  if (!board.isValidPosition(turn.startX, turn.startY)) {
    throw new Error("start position is not valid");
  }

  if (!board.isValidPosition(turn.endX, turn.endY)) {
    throw new Error("end position is not valid");
  }

  if (!board.hasPegAt(turn.startX, turn.startY)) {
    throw new Error("no peg at start position");
  }

  if (board.hasPegAt(turn.endX, turn.endY)) {
    throw new Error("peg at end position");
  }

  const distX = Math.abs(turn.endX - turn.startX);
  const distY = Math.abs(turn.endY - turn.startY);

  if ((distX !== 2 || distY !== 0) && (distX !== 0 || distY !== 2)) {
    throw new Error("turn too long or short or diagonal");
  }

  const middleX = turn.startX + (turn.endX - turn.startX) / 2;
  const middleY = turn.startY + (turn.endY - turn.startY) / 2;

  if (!board.hasPegAt(middleX, middleY)) {
    throw new Error("middle peg missing");
  }

  return board
    .withoutPegAt(turn.startX, turn.startY)
    .withoutPegAt(middleX, middleY)
    .withPegAt(turn.endX, turn.endY);
}
