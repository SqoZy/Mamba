let cellSize = 20;
let screen;

let player;
let points;
let foodcount = 7;
let food = new Array(foodcount);
let walls = [];
let candies = [];
let mapOffsetX, mapOffsetY; 

let map = [
  "########################################",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "#                                      #",
  "########################################",
]

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  points = new Points();
  
  let mapWidth = map[0].length * cellSize;
  let mapHeight = map.length * cellSize;
  mapOffsetX = (width - mapWidth) / 2;
  mapOffsetY = (height - mapHeight) / 2;
  
  player = new Player(mapOffsetX + 100, mapOffsetY + 100, cellSize, cellSize, 1);
  screen = 'startscreen';

  points.reset();
  walls = [];
  candies = [];
    
  for (let i = 0; i < foodcount; i++) {
    food[i] = Food.generateRandomPosition(map[0].length, map.length);
  }
}

function draw() {
  if (screen === 'startscreen') return startScreen();
  if (screen === 'gamescreen')  return gameScreen();
  if (screen === 'endscreen')   return endScreen();
}

function drawMap() {
  map.forEach((row, j) => {
    row.split('').forEach((cell, i) => {
      if (cell === '#') {
        noStroke();
        fill(255);
        // Add offset to center the map
        rect(i * cellSize + mapOffsetX, j * cellSize + mapOffsetY, cellSize, cellSize);
      } else if (cell === ' ') {
        fill(0);
        // Add offset to center the map
        rect(i * cellSize + mapOffsetX, j * cellSize + mapOffsetY, cellSize, cellSize);
      }
    });	
  });
}

function keyPressed() {
  if      (keyCode === UP_ARROW)    return player.setDirection('up');
  else if (keyCode === DOWN_ARROW)  return player.setDirection('down');
  else if (keyCode === LEFT_ARROW)  return player.setDirection('left');
  else if (keyCode === RIGHT_ARROW) return player.setDirection('right');
}