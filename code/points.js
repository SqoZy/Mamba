class Points {
    constructor() {
        this.score = 0;
    }

    add(object) {
        if (object instanceof Food) {
            this.addPoints(10);
        } else if (object instanceof Candy) {
            this.addPoints(25);
        }
    }

    addPoints = (points) => this.score += points;
    

    reset = () => this.score = 0;

    display(x , y, color, size) {
        fill(color);
        textSize(size);
        text(`Score: ${this.score}`, x, y);
    }
}