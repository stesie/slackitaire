import { Board } from "./Board";

export class EnglishBoard implements Board {
  private pegs = [
    0b0011100, 0b0011100, 0b1111111, 0b1110111, 0b1111111, 0b0011100, 0b0011100,
  ];

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

  hasPegAt(x: number, y: number): boolean {
    if (!this.isValidPosition(x, y)) {
      throw new Error("invalid position");
    }

    return !!(this.pegs[y] & (1 << x));
  }

  withoutPegAt(x: number, y: number): Board {
    if (!this.isValidPosition(x, y)) {
      throw new Error("invalid position");
    }

    const copy = new EnglishBoard();
    copy.pegs = [...this.pegs];
    copy.pegs[y] &= ~(1 << x);

    return copy;
  }

  withPegAt(x: number, y: number): Board {
    if (!this.isValidPosition(x, y)) {
      throw new Error("invalid position");
    }

    const copy = new EnglishBoard();
    copy.pegs = [...this.pegs];
    copy.pegs[y] |= 1 << x;

    return copy;
  }
}
