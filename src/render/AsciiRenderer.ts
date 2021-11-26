import { Board } from "../board/Board";

export class AsciiRenderer {
  render(board: Board): string {
    let result = " ";
    for (let x = 0; x < board.getWidth(); x++) {
      result += " " + String.fromCharCode(97 + x);
    }
    result += "\n";

    for (let y = 0; y < board.getHeight(); y++) {
      result += y + 1;

      for (let x = 0; x < board.getWidth(); x++) {
        result +=
          " " +
          (!board.isValidPosition(x, y)
            ? " "
            : board.hasPegAt(x, y)
            ? "."
            : "o");
      }
      result += "\n";
    }

    return result;
  }
}
