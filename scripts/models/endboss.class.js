class Endboss extends MoveableObject {

    world;
    x = 3800;
    y = -50;
    width = 450;
    height = 450;
    speed = 8.5;
    speedY = 2;
    acceleration = 0;
    upRotation = -125;
    downRotation = 75;
    firstContact = false;
    endbossSpawn = new Audio('audio/endboss-spawm.mp3');

    IMAGES_SWIMMING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    IMAGES_SPAWNING = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    collidingOffsetRight = 75;
    collidingOffsetLeft = 65;
    collidingOffsetTop = -225;
    collidingOffsetBottom = 220;


    constructor() {
        super().loadImage('');
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animateSpawn();
        this.animate();
        this.dmgAnimate();
        this.bossRotation();
    }


    /**
     * displays the images when the boss is spawned.
     * 
     */
    animateSpawn() {
        let spawnAnimation = setInterval(() => {
            if (this.world.character.x > 3300 && !this.firstContact) {
                document.getElementById("bossHeart").classList.remove('d-none');
                document.getElementById("bossLife").classList.remove('d-none');
                document.getElementById("bossHeart").classList.remove('transform');
                document.getElementById("bossLife").classList.remove('transform');
                this.endbossSpawn.play();
                this.ImageAnimation(this.IMAGES_SPAWNING);
                setTimeout(() => {
                    clearInterval(spawnAnimation);
                    this.firstContact = true;
                }, 700);
            }
        }, 1000 / 10);
    }


    /**
     * displays the image animations in the interval.
     * 
     */
    animate() {
        this.bossMovement = setInterval(() => {
            if (this.firstContact == true && !this.isBossDead()) {
                this.ImageAnimation(this.IMAGES_ATTACK);
                this.x -= this.speed;
            }
        }, 1000 / 10);
    }


    /**
     * defines the damage animation and sets the game to gameover on death
     * 
     */
    dmgAnimate() {
        this.bossAnimation = setInterval(() => {
            if (this.isBossDead()) {
                this.ImageAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.world.bossIsDead();
                    setTimeout(() => {
                        this.applyGravity();
                    }, 200);
                }, 1000 / 10);

            } else if (this.isHurt()) {
                this.ImageAnimation(this.IMAGES_HURT);
                this.x += this.speed;
            }
        }, 1000 / 10);
    }
}