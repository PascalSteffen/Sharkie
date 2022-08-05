class JellyFish extends MoveableObject {

    width = 75;
    height = 75;

    collidingOffsetRight = 50;
    collidingOffsetLeft = 45;
    collidingOffsetTop = -88;
    collidingOffsetBottom = 160;

    IMAGES_SWIMMING_LILA = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'

    ];

    IMAGES_SWIMMING_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];


    /**
     * @param {string} kind - the kind of Fish
     * @param {number} x - spawn coordinate on X
     * @param {number} y - spawn coordinate on Y
     * @param {number} upRotation - max up rotation Y
     * @param {number} downRotation - max down rotation Y
     * 
     */
    constructor(kind, x, y, upRotation, downRotation) {
        super();
        this.x = x;
        this.y = y;
        this.upRotation = upRotation;
        this.downRotation = downRotation;
        this.speed = 2;

        if (kind == 'lila') {
            this.loadImages(this.IMAGES_SWIMMING_LILA);
            this.animate('lila');
            this.movingDownToUp();
        } else if (kind == 'yellow') {
            this.loadImages(this.IMAGES_SWIMMING_YELLOW);
            this.animate('yellow');
            this.movingUptoDown();
        }
    }


    /**
     * displays the image animations in the interval.
     * 
     */
    animate(kind) {
        if (kind == 'lila') {
            setInterval(() => {
                this.ImageAnimation(this.IMAGES_SWIMMING_LILA);
            }, 1000 / 10);

        } else if (kind == 'yellow') {
            setInterval(() => {
                this.ImageAnimation(this.IMAGES_SWIMMING_YELLOW);
            }, 1000 / 10);
        }
    }
}