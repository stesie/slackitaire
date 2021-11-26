import { EnglishBoard } from "./src/board/EnglishBoard";
import { turn } from "./src/GameEngine";
import { AsciiRenderer } from "./src/render/AsciiRenderer";

console.log(
  new AsciiRenderer().render(
    turn(
      turn(new EnglishBoard(), {
        startX: 1,
        startY: 3,
        endX: 3,
        endY: 3,
      }),
      {
        startX: 2,
        startY: 1,
        endX: 2,
        endY: 3,
      }
    )
  )
);
