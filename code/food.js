class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  show() {
    fill(0, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }

  static generateRandomPosition(mapWidth, mapHeight) {
    const x = (Math.floor(Math.random() * (mapWidth - 2)) + 1) * cellSize + mapOffsetX;
    const y = (Math.floor(Math.random() * (mapHeight - 2)) + 1) * cellSize + mapOffsetY;

    return new Food(x, y);
  }
}