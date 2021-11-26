import { BitwiseBoard } from "./BitwiseBoard";

export class DiamondBoard extends BitwiseBoard {
  protected validPositions = [
    0b000010000, 0b000111000, 0b001111100, 0b011111110, 0b111111111,
    0b011111110, 0b001111100, 0b000111000, 0b000010000,
  ];
  protected pegs = [
    0b000010000, 0b000111000, 0b001111100, 0b011111110, 0b111101111,
    0b011111110, 0b001111100, 0b000111000, 0b000010000,
  ];

  getWidth() {
    return 9;
  }

  getHeight() {
    return 9;
  }
}
