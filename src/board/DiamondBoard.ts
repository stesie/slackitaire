import { Board } from "./Board";

export class DiamondBoard implements Board {
  private validPositions = [
    0b000010000, 0b000111000, 0b001111100, 0b011111110, 0b111111111,
    0b011111110, 0b001111100, 0b000111000, 0b000010000,
  ];
  private pegs = [
    0b000010000, 0b000111000, 0b001111100, 0b011111110, 0b111101111,
    0b011111110, 0b001111100, 0b000111000, 0b000010000,
  ];

  getWidth() {
    return 9;
  }

  getHeight() {
    return 9;
  }

  isValidPosition(x: number, y: number): boolean {
    if (x < 0 || x >= 9 || y < 0 || y >= 9) {
      throw new Error("out of bounds");
    }

    return !!(this.validPositions[y] & (1 << x));
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

    const copy = new DiamondBoard();
    copy.pegs = [...this.pegs];
    copy.pegs[y] &= ~(1 << x);

    return copy;
  }

  withPegAt(x: number, y: number): Board {
    if (!this.isValidPosition(x, y)) {
      throw new Error("invalid position");
    }

    const copy = new DiamondBoard();
    copy.pegs = [...this.pegs];
    copy.pegs[y] |= 1 << x;

    return copy;
  }
}
