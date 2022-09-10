class poisons extends MoveableObject {

    width = 50;
    height = 50;

    collidingOffsetRight = 50;
    collidingOffsetLeft = 45;
    collidingOffsetTop = -60;
    collidingOffsetBottom = 140;

    POISONS_IMAGE = [
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImages(this.POISONS_IMAGE);
        this.animate();

    }


    /**
     * displays the image animations in the interval.
     * 
     */
    animate() {
        setInterval(() => {
            this.ImageAnimation(this.POISONS_IMAGE);
        }, 1000 / 10);
    }
}