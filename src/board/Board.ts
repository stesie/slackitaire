export interface Board {
  getWidth(): number;
  getHeight(): number;

  isValidPosition(x: number, y: number): boolean;
}
