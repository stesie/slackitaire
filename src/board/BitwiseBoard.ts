import { Board } from "./Board";

export abstract class BitwiseBoard implements Board {
  protected validPositions: number[] = [];
  protected pegs: number[] = [];

  abstract getWidth(): number;
  abstract getHeight(): number;

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

    const copy = new (this.constructor as { new (): BitwiseBoard })();
    copy.pegs = [...this.pegs];
    copy.pegs[y] &= ~(1 << x);

    return copy;
  }

  withPegAt(x: number, y: number): Board {
    if (!this.isValidPosition(x, y)) {
      throw new Error("invalid position");
    }

    const copy = new (this.constructor as { new (): BitwiseBoard })();
    copy.pegs = [...this.pegs];
    copy.pegs[y] |= 1 << x;

    return copy;
  }
}
