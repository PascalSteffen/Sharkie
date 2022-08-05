class Coins extends MoveableObject {

    width = 50;
    height = 50;

    collidingOffsetRight = 50;
    collidingOffsetLeft = 45;
    collidingOffsetTop = -60;
    collidingOffsetBottom = 140;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/4. Marcadores/1. Coins/1.png');

    }
}