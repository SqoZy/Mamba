class Player {
    constructor(x, y, width, height,) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tailLenght = 4;
        this.tail = new Tail();
        this.direction = 'right';
        this.directionQueue = [];
        this.walking = false;
        this.wallLenght = Math.floor(random(10, 25));
        this.nextWallTransform = Math.floor(random(2, 6));
        this.lastMoveTime = 0;
        this.moveInterval = 80;
        this.queueTimeout = 350;
        this.foodEaten = 0;
    }

    move() {
        if (millis() - this.lastMoveTime >= this.moveInterval) {
            let oldX = this.x;
            let oldY = this.y;

            this.cleanExpiredDirections();

            if (this.directionQueue.length > 0) {
                let nextDirection = this.directionQueue.shift().direction;

                if (this.isValidDirection(nextDirection)) return this.direction = nextDirection;
            }

            switch (this.direction) {
                case 'up':
                    this.y -= cellSize;
                    break;
                case 'down':
                    this.y += cellSize;
                    break;
                case 'left':
                    this.x -= cellSize;
                    break;
                case 'right':
                    this.x += cellSize;
                    break;
            }

            this.tail.addSegment(oldX, oldY);
            if (this.tail.tail.length > this.tailLenght) this.tail.tail.shift();

            this.lastMoveTime = millis();
        }
    }

    cleanExpiredDirections() {
        const currentTime = millis();
        this.directionQueue = this.directionQueue.filter(item =>
            currentTime - item.timestamp < this.queueTimeout
        );
    }

    isValidDirection(direction) {
        if (direction === 'up' && this.direction !== 'down') return true;
        if (direction === 'down' && this.direction !== 'up') return true;
        if (direction === 'left' && this.direction !== 'right') return true;
        if (direction === 'right' && this.direction !== 'left') return true;
        else return false;
    }

    setDirection(direction) {
        this.cleanExpiredDirections();

        if (this.directionQueue.length < 2 && this.isValidDirection(direction)) {
            if (this.directionQueue.length === 0 ||
                this.directionQueue[this.directionQueue.length - 1].direction !== direction) {
                this.directionQueue.push({
                    direction: direction,
                    timestamp: millis()
                });
            }
        }
    }

    show() {
        fill(255, 255, 0);
        rect(this.x, this.y, this.width, this.height);
        this.tail.show();
    }

    checkCollision() {
        if (this.x < mapOffsetX + cellSize ||
            this.x >= mapOffsetX + (map[0].length - 1) * cellSize ||
            this.y < mapOffsetY + cellSize ||
            this.y >= mapOffsetY + (map.length - 1) * cellSize) {
            screen = 'endscreen';
        }

        for (let i = 0; i < food.length; i++) {
            if (this.x === food[i].x && this.y === food[i].y) {
                console.log(this.tailLenght)
                points.add(food[i]);
                food.splice(i, 1);
                this.tailLenght++;
                this.foodEaten++;
                food.push(Food.generateRandomPosition(map[0].length, map.length, cellSize));
                this.checkFoodInTail();
                this.checkWallTransformations();

                if (this.tailLenght == this.wallLenght) return this.convertTailToWalls();
                console.log(this.tailLenght)
                break;
            }
        }
        for (let i = 0; i < candies.length; i++) {
            if (this.x === candies[i].x && this.y === candies[i].y) {
                points.add(candies[i]);
                candies.splice(i, 1);
                this.tailLenght++;
                this.foodEaten++;
                this.checkFoodInTail();
                this.checkWallTransformations();
                if (this.tailLenght == this.wallLenght) return this.convertTailToWalls();
                break;
            }
        }

        for (let i = 0; i < this.tail.tail.length; i++) {
            if (this.x === this.tail.tail[i].x && this.y === this.tail.tail[i].y) return screen = 'endscreen';
        }
        for (let i = 0; i < walls.length; i++) {
            if (this.x === walls[i].x && this.y === walls[i].y) return screen = 'endscreen';
        }

    }

    checkWallTransformations() {
        if (walls.length === 0) return;

        if (this.foodEaten > this.nextWallTransform) {
            let randomWall = Math.floor(random(0, walls.length));
            let wallToTransform = walls[randomWall];

            candies.push(new Candy(wallToTransform.x, wallToTransform.y));
            walls.splice(randomWall, 1);
            this.nextWallTransform = this.foodEaten + Math.floor(random(2, 6));

            console.log(`Wall at (${wallToTransform.x}, ${wallToTransform.y}) transformed into candy.`);
        }
    }

    checkFoodInTail() {
        for (let i = 0; i < food.length; i++) {
            for (let j = 0; j < this.tail.tail.length; j++) {
                if (food[i].x === this.tail.tail[j].x && food[i].y === this.tail.tail[j].y) {
                    food.splice(i, 1);
                    food.push(Food.generateRandomPosition(map[0].length, map.length));
                    console.log("food in tail");
                }
            }
        }
    }
    convertTailToWalls() {
        console.log(this.wallLenght)
        while (this.tail.tail.length > 4) {
            let segmentToConvert = this.tail.tail.shift();
            walls.push(new Wall(segmentToConvert.x, segmentToConvert.y));
        }
        this.tailLenght = 4;
        this.wallLenght = Math.floor(random(10, 25));
        console.log(this.wallLenght)
    }
}