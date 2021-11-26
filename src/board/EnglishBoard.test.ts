import { EnglishBoard } from "./EnglishBoard";

describe("#isValidPosition", () => {
  it.each([
    [0, 0],
    [1, 1],
    [5, 5],
    [6, 6],
    [0, 6],
    [6, 0],
  ])("detects invalid position at %d,%d", (x, y) => {
    expect(new EnglishBoard().isValidPosition(x, y)).toBe(false);
  });

  it.each([
    [0, 2],
    [2, 0],
    [2, 2],
    [4, 4],
    [4, 6],
    [6, 4],
  ])("detects valid position at %d,%d", (x, y) => {
    expect(new EnglishBoard().isValidPosition(x, y)).toBe(true);
  });

  it.each([
    [-1, -1],
    [3, 7],
    [7, 3],
    [7, 7],
  ])("detects out of bounds position at %d,%d", (x, y) => {
    expect(() => new EnglishBoard().isValidPosition(x, y)).toThrow();
  });
});

describe("#hasPegAt", () => {
  it("initially has no peg right in the middle", () => {
    expect(new EnglishBoard().hasPegAt(3, 3)).toBe(false);
  });

  it("returns true if there is a peg", () => {
    expect(new EnglishBoard().hasPegAt(2, 2)).toBe(true);
  });
});

describe("#withPegAt", () => {
  it("adds a peg at the position", () => {
    expect(new EnglishBoard().withPegAt(3, 3).hasPegAt(3, 3)).toBe(true);
  });
});

describe("#withoutPegAt", () => {
  it("removes a peg from the position", () => {
    expect(new EnglishBoard().withoutPegAt(3, 1).hasPegAt(3, 1)).toBe(false);
  });
});
