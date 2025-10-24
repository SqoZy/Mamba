function startScreen() {
    background(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    noStroke()
    fill(255);
    text("press any key to start", width / 2, height / 2);
    if (keyIsPressed) return screen = 'gamescreen';
}

function gameScreen() {
    background(0);
    drawMap();
    player.show();
    player.move();
    player.checkCollision();
    food.forEach(f => f.show());
    walls.forEach(f => f.show());
    candies.forEach(f => f.show());
    points.display(width / 3, 100, 255, 24);

}

function endScreen() {
    background(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    noStroke();
    fill(255);
    text("Game Over", width / 2, height / 2 - 20);
    text("Press enter to restart", width / 2, height / 2 + 20);

    if (keyCode === ENTER) {
        screen = 'startscreen';
        setup();
    }
}