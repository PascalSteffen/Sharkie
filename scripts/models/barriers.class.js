class Barriers extends MoveableObject {

    width = 700;
    height = 225;

    constructor(img, kind, x, y) {
        super().loadImage(img);
        this.kind = kind;
        this.x = x;
        this.y = y;

        if (kind == 'bottom') {
            this.collidingOffsetRight = 0;
            this.collidingOffsetLeft = 75;
            this.collidingOffsetTop = -225;
            this.collidingOffsetBottom = 150;

        } else if (kind == 'top') {
            this.collidingOffsetRight = 0;
            this.collidingOffsetLeft = 100;
            this.collidingOffsetTop = 100;
            this.collidingOffsetBottom = 300;
        }
    }

}