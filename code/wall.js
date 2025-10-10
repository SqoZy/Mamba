class Wall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.foodCountWhenCreated = player.foodEaten; 
    this.foodNeededToTransform = Math.floor(random(3, 11)); 
  }

  show() {
    fill(255, 255, 255);
    rect(this.x, this.y, this.width, this.height);
  }

  shouldTransform() {
    return walls.length >= 20 && 
           (player.foodEaten - this.foodCountWhenCreated) >= this.foodNeededToTransform;
  }

  createCandy() {
    candies.push(new Candy(this.x, this.y));
    console.log(`Candy created at (${this.x}, ${this.y})`);
  }
}