class normalFish extends MoveableObject {

    world;
    width = 75;
    height = 75;

    collidingOffsetRight = 50;
    collidingOffsetLeft = 50;
    collidingOffsetTop = -88;
    collidingOffsetBottom = 170;

    IMAGES_SWIMMING_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    IMAGES_SWIMMING_ORANGE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png'
    ];

    IMAGES_SWIMMING_ROSA = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ];


    /**
     * @param {string} kind - the kind of Fish
     * @param {number} x - spawn coordinate on X
     * @param {number} y - spawn coordinate on Y
     * @param {number} leftRoation - max left rotation X
     * @param {number} rightRotation - max right rotation X
     * 
     */
    constructor(kind, x, y, leftRoation, rightRotation) {
        super();
        this.x = x;
        this.y = y;
        this.leftRoation = leftRoation;
        this.rightRotation = rightRotation;
        this.speed = 1.5;

        if (kind == 'green') {
            this.loadImages(this.IMAGES_SWIMMING_GREEN);
            this.animate('green');
            this.movingLeftToRight();
        } else if (kind == 'orange') {
            this.loadImages(this.IMAGES_SWIMMING_ORANGE);
            this.animate('orange');
            this.movingLeftToRight();
        } else if (kind == 'rosa') {
            this.loadImages(this.IMAGES_SWIMMING_ROSA);
            this.animate('rosa');
            this.movingLeftToRight();
        }
    }


    /**
     * displays the image animations in the interval.
     * 
     */
    animate(kind) {
        if (kind == 'green') {
            setInterval(() => {
                this.ImageAnimation(this.IMAGES_SWIMMING_GREEN);
            }, 1000 / 10);
        } else if (kind == 'orange') {
            setInterval(() => {
                this.ImageAnimation(this.IMAGES_SWIMMING_ORANGE);
            }, 1000 / 10);
        } else if (kind == 'rosa') {
            setInterval(() => {
                this.ImageAnimation(this.IMAGES_SWIMMING_ROSA);
            }, 1000 / 10);
        }
    }
}

