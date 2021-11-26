import { BitwiseBoard } from "./BitwiseBoard";

export class EuropeanBoard extends BitwiseBoard {
  protected validPositions = [
    0b0011100, 0b0111110, 0b1111111, 0b1111111, 0b1111111, 0b0111110, 0b0011100,
  ];
  protected pegs = [
    0b0011100, 0b0111110, 0b1111111, 0b1110111, 0b1111111, 0b0111110, 0b0011100,
  ];

  getWidth() {
    return 7;
  }

  getHeight() {
    return 7;
  }
}
