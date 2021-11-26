export interface Board {
  getWidth(): number;
  getHeight(): number;

  isValidPosition(x: number, y: number): boolean;

  hasPegAt(x: number, y: number): boolean;
  withoutPegAt(x: number, y: number): Board;
  withPegAt(x: number, y: number): Board;
}
