import { Board } from "./Board";

export class EnglishBoard implements Board {
  getWidth() {
    return 7;
  }

  getHeight() {
    return 7;
  }

  isValidPosition(x: number, y: number): boolean {
    if (x < 0 || x >= 7 || y < 0 || y >= 7) {
      throw new Error("out of bounds");
    }

    if ((y < 2 || y > 4) && (x < 2 || x > 4)) {
      return false;
    }

    return true;
  }
}
