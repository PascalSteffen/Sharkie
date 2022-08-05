class Character extends MoveableObject {

    world;
    x = 0;
    y = 50;
    width = 250;
    height = 300;
    speedX = 3;
    speedY = 3;
    acceleration = 1;
    speedBarrier = 1;

    IMAGES_SWIMMING_FORWARD = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    IMAGES_SWIMMING = [
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_ATTACK = [
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png'
    ];

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ];

    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING_FORWARD);
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.swimmingAnimation();
        this.moveControl();
        this.moveAnimation();
        this.attackAnimation();
        this.dmgAnimate();

    }


    /**
     * Defined the movecontrol for the character.
     * 
     */
    moveControl() {
        this.characterControl = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt() && !this.isDead()) {
                this.swimmRight();
            }

            if (this.world.keyboard.LEFT && this.x > -125 && !this.isHurt() && !this.isDead()) {
                this.swimmLeft();
            }

            if (this.world.keyboard.UP && this.y > -100 && !this.isHurt() && !this.isDead()) {
                this.swimmHigh();
            }
            if (this.world.keyboard.DOWN && this.y < 250 && !this.isHurt() && !this.isDead()) {
                this.swimmDown();
            }
            this.world.camera_x = -this.x + 150;
        }, 1000 / 60);
    }


    /**
     * Defined the move animation, when the key right and left is pressed.
     * 
     */
    moveAnimation() {
        this.characterAnimation = setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isHurt() && !this.isDead() || this.world.keyboard.LEFT && !this.isHurt() && !this.isDead()) {
                this.ImageAnimation(this.IMAGES_SWIMMING_FORWARD);
            }
        }, 1000 / 12);
    }

    swimmingAnimation() {
        this.characterSwimming = setInterval(() => {
            if (!this.isHurt() || !this.isDead()) {
                this.ImageAnimation(this.IMAGES_SWIMMING);
            }
        }, 1000 / 12);
    }

    /**
     * Defined the attack animation from the character.
     * 
     */
    attackAnimation() {
        this.characterAttackAnimation = setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isHurt()) {
                this.ImageAnimation(this.IMAGES_ATTACK);
            }
        }, 1000 / 12);
    }


    /**
     * defines the damage animation and sets the game to gameover on death.
     * 
     */
    dmgAnimate() {
        this.characterDMG = setInterval(() => {
            if (this.isDead()) {
                this.ImageAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.world.gameover();
                    setTimeout(() => {
                        this.applyGravity();
                    }, 200);
                }, 1000 / 10);

            } else if (this.isHurt()) {
                this.ImageAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 12);
    }


    swimmHigh() {
        this.y -= this.speedY;
    }

    swimmDown() {
        this.y += this.speedY;
    }


    swimmLeft() {
        this.x -= this.speedX;
        this.otherDirection = true;
    }


    swimmRight() {
        this.x += this.speedX;
        this.otherDirection = false;
    }

}