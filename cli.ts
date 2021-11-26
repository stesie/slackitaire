import { EnglishBoard } from "./src/board/EnglishBoard";
import { applyTurnList, turnListFromString } from "./src/rules";
import { AsciiRenderer } from "./src/render/AsciiRenderer";

const turnList = turnListFromString(
  "b4-d4, c6-c4, a5-c5, d5-b5, f5-d5, e7-e5, e4-e6, c7-e7-e5, c3-c5, c1-c3, e2-e4-e6-c6-c4-c2, a3-a5-c5-e5, g3-e3, d3-f3, g5-g3-e3, e1-c1-c3, b3-d3-f3-f5-d5-d3, d2-d4"
);

const newBoard = applyTurnList(new EnglishBoard(), turnList);
console.log(new AsciiRenderer().render(newBoard));
