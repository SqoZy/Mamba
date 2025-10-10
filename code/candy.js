class Candy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}