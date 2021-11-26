import { Board } from "./src/board/Board";
import { EnglishBoard } from "./src/board/EnglishBoard";
import { Turn, turn, turnFromString } from "./src/GameEngine";
import { AsciiRenderer } from "./src/render/AsciiRenderer";

// b4-d4, c6-c4, a5-c5

const turns = ["b4-d4", "c6-c4", "a5-c5", "d5-b5", "f5-d5", "e7-e5", "e4-e6"];

const end = turns.reduce((oldBoard: Board, t: string) => {
  console.log("\n\n" + t + ":\n");
  const newBoard = turn(oldBoard, turnFromString(t));
  console.log(new AsciiRenderer().render(newBoard));

  return newBoard;
}, new EnglishBoard());
