class MoveableObject extends DrawableObject {

    speed = 0.2;
    energie = 100;
    bossEnergie = 100;
    lastHit = 0;
    otherDirection = false;

    characterControl;
    characterAnimation;
    characterSwimming;
    characterAttackAnimation;
    characterDMG;
    bossAnimation;
    bossMovement;
    moveLeftToRight;
    moveRightToLeft;
    moveUpToDown;
    moveDownToUp;
    bossRotationAnimation;

    isMovingLeft = false;
    isMovingUp = false;

    collidingOffsetRight;
    collidingOffsetLeft;
    collidingOffsetTop;
    collidingOffsetBottom;

    /**
     * defines the falling of the respective object.
     * 
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * defined the max falling range to the ground.
     * @returns 
     */
    isAboveGround() {
        return this.y < 250;
    }


    /**
     * Check the coordinates from the first and second Object.
     * @param {object} moveableObject 
     * @returns 
     * 
     */
    isColliding(moveableObject) {
        return this.x + this.width - this.collidingOffsetRight > moveableObject.x &&
            this.y + this.height - this.collidingOffsetBottom > moveableObject.y &&
            this.x < moveableObject.x - this.collidingOffsetLeft + moveableObject.width &&
            this.y - this.collidingOffsetTop < moveableObject.y + moveableObject.height;
    }


    /**
     * define the Damage, when an enemy collide with the character
     * And safed the last Hit in an Timestep.
     * @param {number} dmgNumber 
     */
    hit(dmgNumber) {
        this.energie -= dmgNumber;
        if (this.energie < 0) {
            this.energie = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * define the Damage, when an enemy collide with the character
     * And safed the last Hit in an Timestep.
     * @param {number} dmgNumber 
     */
    hitBoss(dmgNumber) {
        this.bossEnergie -= dmgNumber;
        if (this.bossEnergie < 0) {
            this.bossEnergie = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * return true and the Hurt animation will played when the timepassed < 1.
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * return True, when energie = 0
     * Than played the dead animation on the character.
     * @returns 
     */
    isDead() {
        return this.energie == 0;
    }

    isBossDead() {
        return this.bossEnergie == 0;
    }


    /**
     * iterates through the respective array consisting of images for the animations.
     * @param {array} images 
     * 
     */
    ImageAnimation(images) {
        let i = this.currenImage % images.length;
        let path = images[i];
        this.img = this.imagesCache[path];
        this.currenImage++;
    }





    //#################################################################################### Enemy movement ###########################################################################


    movingLeftToRight() {
        this.moveLeftToRight = setInterval(() => {
            if (this.x > this.leftRoation && !this.isMovingLeft) {
                this.x -= 1;
                this.otherDirection = false;
                if (this.x == this.leftRoation) {
                    this.isMovingLeft = true;
                }
            } else if (this.x < this.rightRotation && this.isMovingLeft) {
                this.otherDirection = true;
                this.x += 1;
                if (this.x == this.rightRotation) {
                    this.isMovingLeft = false;
                }
            }
        }, 1000 / 60);
    }


    movingRightToLeft() {
        this.moveRightToLeft = setInterval(() => {
            if (this.x < this.rightRotation && !this.isMovingLeft) {
                this.x += 1;
                this.otherDirection = true;
                if (this.x == this.rightRotation) {
                    this.isMovingLeft = true;
                }
            } else if (this.x > this.leftRoation && this.isMovingLeft) {
                this.otherDirection = false;
                this.x -= 1;
                if (this.x == this.leftRoation) {
                    this.isMovingLeft = false;
                }
            }
        }, 1000 / 60);
    }


    movingUptoDown() {
        this.moveUpToDown = setInterval(() => {
            if (this.y > this.upRotation && !this.isMovingUp) {
                this.y -= 1;
                if (this.y == this.upRotation) {
                    this.isMovingUp = true;
                }
            } else if (this.y < this.downRotation && this.isMovingUp) {
                this.y += 1;
                if (this.y == this.downRotation) {
                    this.isMovingUp = false;
                }
            }
        }, 1000 / 60);
    }


    movingDownToUp() {
        this.moveDownToUp = setInterval(() => {
            if (this.y < this.downRotation && !this.isMovingUp) {
                this.y += 1;
                this.otherDirection = true;
                if (this.y == this.downRotation) {
                    this.isMovingUp = true;
                }
            } else if (this.y > this.upRotation && this.isMovingUp) {
                this.otherDirection = false;
                this.y -= 1;
                if (this.y == this.upRotation) {
                    this.isMovingUp = false;
                }
            }
        }, 1000 / 60);
    }


    bossRotation() {
        this.bossRotationAnimation = setInterval(() => {
            if (this.y < this.downRotation && !this.isMovingUp) {
                this.y += 1;
                if (this.y == this.downRotation) {
                    this.isMovingUp = true;
                }
            } else if (this.y > this.upRotation && this.isMovingUp) {
                this.y -= 1;
                if (this.y == this.upRotation) {
                    this.isMovingUp = false;
                }
            }
        }, 1000 / 60);
    }
}
