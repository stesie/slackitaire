import { EnglishBoard } from "./board/EnglishBoard";
import { GameEngine, Turn } from "./GameEngine";

describe("#turn", () => {
  it("checks start for valid position", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard(), {
        startX: 1,
        startY: 1,
        endX: 3,
        endY: 3,
      })
    ).toThrow();
  });

  it("checks end for valid position", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard(), {
        startX: 3,
        startY: 3,
        endX: 1,
        endY: 1,
      })
    ).toThrow();
  });

  it("fails if there is no peg at start position", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard(), {
        startX: 3,
        startY: 3,
        endX: 3,
        endY: 3,
      })
    ).toThrow();
  });

  it("fails if there is a peg at end position", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard(), {
        startX: 0,
        startY: 3,
        endX: 2,
        endY: 3,
      })
    ).toThrow();
  });

  it.each([
    { startX: 0, startY: 3, endX: 3, endY: 3 },
    { startX: 2, startY: 3, endX: 3, endY: 3 },
    { startX: 4, startY: 3, endX: 3, endY: 3 },
    { startX: 6, startY: 3, endX: 3, endY: 3 },

    { startX: 3, startY: 0, endX: 3, endY: 3 },
    { startX: 3, startY: 2, endX: 3, endY: 3 },
    { startX: 3, startY: 4, endX: 3, endY: 3 },
    { startX: 3, startY: 6, endX: 3, endY: 3 },
  ])("fails on too long or too short turns (%s)", (turn: Turn) => {
    expect(() => new GameEngine().turn(new EnglishBoard(), turn)).toThrow();
  });

  it.each([
    { startX: 1, startY: 3, endX: 3, endY: 3 },
    { startX: 5, startY: 3, endX: 3, endY: 3 },
    { startX: 3, startY: 1, endX: 3, endY: 3 },
    { startX: 3, startY: 5, endX: 3, endY: 3 },
  ])("does not throw on valid turns", (turn: Turn) => {
    expect(() => new GameEngine().turn(new EnglishBoard(), turn)).not.toThrow();
  });

  it.each([
    [{ startX: 1, startY: 3, endX: 3, endY: 3 }, [2, 3]],
    [{ startX: 5, startY: 3, endX: 3, endY: 3 }, [4, 3]],
    [{ startX: 3, startY: 1, endX: 3, endY: 3 }, [3, 2]],
    [{ startX: 3, startY: 5, endX: 3, endY: 3 }, [3, 4]],
  ])("returns a updated board on a valid turn", (turn, [middleX, middleY]) => {
    const result = new GameEngine().turn(new EnglishBoard(), turn);

    expect(result.hasPegAt(turn.startX, turn.startY)).toBe(false);
    expect(result.hasPegAt(middleX, middleY)).toBe(false);
    expect(result.hasPegAt(turn.endX, turn.endY)).toBe(true);
  });

  it("fails if middle peg is missing", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard().withoutPegAt(2, 3), {
        startX: 1,
        startY: 3,
        endX: 3,
        endY: 3,
      })
    ).toThrow();
  });

  it("fails on diagonal turns", () => {
    expect(() =>
      new GameEngine().turn(new EnglishBoard().withoutPegAt(2, 4), {
        startX: 0,
        startY: 2,
        endX: 2,
        endY: 4,
      })
    ).toThrow();
  });
});
