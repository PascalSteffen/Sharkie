class World {
    character = new Character();
    endboss = new Endboss();
    keyboard = new Keyboard();
    level = level1;

    canvas;
    ctx;
    background_x = -719;
    imagePosition = 1;
    camera_x = 0;
    coinCounter = 0;
    isGameOver = false;
    isWin = false;
    runCollisions;
    barrierSlide;
    inputDmg;
    backgroundMusicIsPlay;
    firstGameStartMusic;
    loadingInterval;

    coinCollecting = new Audio('audio/coin-collecting.mp3');
    sharkEat = new Audio('audio/shark-eat.mp3');
    backgroundMusic = new Audio('audio/background-music.mp3');
    hurtSound = new Audio('audio/hurt-sound.mp3');
    gameOverSound = new Audio('audio/game-over.mp3');
    levelfinsh = new Audio('audio/level-finish.mp3');
    clickSound = new Audio('audio/click-sound.mp3');


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        if (!this.isGameOver || !this.isWin) {
            this.generateBackground();
            this.draw();
            this.setWorld();
            this.updateTakeableObjects();
            this.run();
            setTimeout(() => {
                this.playBackgroundMusic();
            }, 10000);
        }
    }


    /**
     * The function allows the character & endboss class to access variables from the world.
     * Note: The variable "world" must be define in the character and endboss class.
     * 
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }


    /**
     * Run functions for all collisions.
     * 
     */
    run() {
        this.runCollisions = setInterval(() => {
            // Fishes & Poison & Coins & Boss & Barrier vs. Character 
            this.checkCollisions(this.level.poisons, 50);
            this.checkCollisionsEndbossWithCharacter(50);
            this.checkCollisionsCoin(this.level.coins);
            this.checkCollisionsDMG(this.level.normalFish);
            this.checkCollisionsDMG(this.level.jellyfish);

            // Boss vs. Poison & NormalFish & Jellyfish
            this.checkCollisionsBossWithNormalFish(this.level.normalFish);
            this.checkCollisionsBossWithObjects(this.level.poisons, 20)
            this.checkCollisionsBossWithObjects(this.level.jellyfish, 10)
        }, 1);
        this.inputDmg = setInterval(() => {
            this.checkCollisions(this.level.normalFish, 10);
            this.checkCollisions(this.level.jellyfish, 25);
            this.biteBoss(10);
        }, 600);
        this.barrierSlide = setInterval(() => {
            this.checkCollisionsBottomBarrierWithCharacter(this.level.barriers);
        }, 175);
    }


    //#################################################################################### Check character collisions ###############################################################\\


    /**
     * Check the collidation Coords from the enemies.
     * When the enemies collidate, than hit the character.
     * @param {object} Object
     * @param {number} dmgNumber
     * 
     */
    checkCollisions(Object, dmgNumber) {
        Object.forEach((obj) => {
            if (obj.isColliding(this.character) && !this.keyboard.SPACE && !this.character.isHurt()) {
                this.character.hit(dmgNumber);
                this.updateTakeableObjects();
                this.hurtSound.play();
                if (Object == this.level.poisons) {
                    this.level.poisons.splice(this.level.poisons.indexOf(obj), 1);
                }
            }
        })
    }


    /**
     * Check the collidation coords from the coins.
     * When the objects collidate, that coinCounter++.
     * @param {object} Object
     *  
     */
    checkCollisionsCoin(Object) {
        Object.forEach((coin) => {
            if (coin.isColliding(this.character) && !this.character.isHurt()) {
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coinCounter++;
                this.coinCollecting.play();
                this.updateTakeableObjects();
            }
        })
    }


    //#################################################################################### Check boss collisions ###############################################################\\

    /**
     * Check the collidation coords from the poisons.
     * When the poisons collidate, than hit the character.
     * @param {object} Object
     * @param {number} dmgNumber
     *  
     */
    checkCollisionsBossWithObjects(Object, dmgNumber) {
        Object.forEach((obj) => {
            if (obj.isColliding(this.endboss) && !this.endboss.isHurt()) {
                this.endboss.hitBoss(dmgNumber);
                Object.splice(Object.indexOf(obj), 1);
                this.sharkEat.play();
                this.updateTakeableObjects();
            }
        })
    }


    checkCollisionsBossWithNormalFish(Object) {
        Object.forEach((obj) => {
            if (obj.isColliding(this.endboss) && !this.endboss.isHurt()) {
                if (this.endboss.bossEnergie >= 90 && this.endboss.bossEnergie <= 100) {
                    this.endboss.bossEnergie = 100;
                } else {
                    this.endboss.bossEnergie += 10;
                }
                Object.splice(Object.indexOf(obj), 1);
                this.sharkEat.play();
                this.updateTakeableObjects();
            }
        })
    }


    /**
     * Check the collidation coords from the endboss.
     * When the endboss collidate, than hit the character.
     * @param {number} dmgNumber
     * 
     */
    checkCollisionsEndbossWithCharacter(dmgNumber) {
        if (this.endboss.isColliding(this.character) && !this.endboss.isHurt() && !this.endboss.isBossDead() && !this.character.isHurt()) {
            this.character.hit(dmgNumber)
            this.hurtSound.play();
            this.updateTakeableObjects();
        }
    }


    //#################################################################################### Eat and bite collisions ###############################################################\\

    /**
     * Check the collidation coords from the object.
     * When the character collidate and pushed SPACE than eats the objects.
     * @param {object} Object
     *  
     */
    checkCollisionsDMG(Object) {
        if (Object == this.level.normalFish) {
            this.eatNormalFish(Object);

        } else if (Object == this.level.jellyfish) {
            this.eatJellyFish(Object);
        }
    }


    /**
     * Eat-function for the normalFish.
     * @param {object} Object 
     * 
     */
    eatNormalFish(Object) {
        Object.forEach((normalFish) => {
            if (normalFish.isColliding(this.character) && this.keyboard.SPACE && !this.character.isHurt()) {
                clearInterval(Object.moveLeftToRight);
                clearInterval(Object.moveRightToLeft);
                if (this.character.energie >= 90 && this.character.energie <= 100) {
                    this.character.energie = 100;
                } else {
                    this.character.energie += 10;
                }
                Object.splice(Object.indexOf(normalFish), 1);
                this.sharkEat.play();
                this.updateTakeableObjects();
            }
        })
    }


    /**
     * Eat-function for the Jellyfish
     * @param {object} Object 
     * 
     */
    eatJellyFish(Object) {
        Object.forEach((jellyfish) => {
            if (jellyfish.isColliding(this.character) && this.keyboard.SPACE && !this.character.isHurt()) {
                clearInterval(Object.moveDownToUp);
                clearInterval(Object.moveDownToUp);
                Object.splice(Object.indexOf(jellyfish), 1);
                this.sharkEat.play();
                this.character.energie = 0;
                this.updateTakeableObjects();
            }
        })
    }


    /**
     * Bite-function for the endboss
     * Check the collidation coords from the endboss.
     * When the character collidate and pushed SPACE than bite the endboss.
     * @param {number} dmgNumber
     * 
     */
    biteBoss(dmgNumber) {
        if (this.endboss.isColliding(this.character) && this.keyboard.SPACE && this.endboss.isHurt()) {
            this.endboss.hitBoss(dmgNumber)
            this.sharkEat.play();
            this.updateTakeableObjects();
        }
    }


    //#################################################################################### Barrier collisions ###############################################################\\


    /**
     * Check the collidation coords from the barrier.
     * When the character collidate, than slided the character over the barrier.
     * @param {object} Object
     *  
     */
    checkCollisionsBottomBarrierWithCharacter(Object) {
        Object.forEach((barrier) => {
            if (barrier.isColliding(this.character) && barrier.kind == 'bottom') {
                this.bottomBarrier();
            } else if (barrier.isColliding(this.character) && barrier.kind == 'top') {
                this.topBarrier();
            }
        })
    }


    bottomBarrier() {
        let interval = setInterval(() => {
            this.character.y -= 0.6;
            setTimeout(() => {
                clearInterval(interval);
                this.character.y += 0.2;
            }, 750);
        }, 1000 / 60);
    }


    topBarrier() {
        let interval = setInterval(() => {
            this.character.y += 0.6;
            setTimeout(() => {
                clearInterval(interval);
                this.character.y -= 0.2;
            }, 750);
        }, 1000 / 60);
    }


    //#################################################################################### Draw canvas & extras. ###############################################################\\


    /**
     * Represent the map in the world.
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear any objects from the Map.

        this.ctx.translate(this.camera_x, 0);

        this.addObjectToWorld(this.level.background);

        this.addObjectToWorld(this.level.normalFish);
        this.addObjectToWorld(this.level.jellyfish);
        this.addObjectToWorld(this.level.coins);
        this.addObjectToWorld(this.level.poisons);

        this.addToWorld(this.endboss);

        this.addToWorld(this.character);
        this.addObjectToWorld(this.level.barriers);
        this.ctx.translate(-this.camera_x, 0);

        // Draw is always called.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Added each object from an array.
     * @param {object} object - (enemies, lights, ground ...).
     * 
     */
    addObjectToWorld(object) {
        object.forEach(obj => {
            this.addToWorld(obj);
        });
    }


    /**
     * Added an object (from no array).
     * @param {object} moveableObject - (character)
     * 
     */
    addToWorld(moveableObject) {
        if (moveableObject.otherDirection) {
            this.mirrorImage(moveableObject);
        }

        moveableObject.drawImage(this.ctx);

        if (moveableObject.otherDirection) {
            this.mirrorImageBack(moveableObject);
        }
    }


    /**
     * Mirror the image, when otherDirection (variable in moveable-objekt.class) is changed.
     * @param {object} moveableObject 
     * 
     */
    mirrorImage(moveableObject) {
        this.ctx.save(); // Save the Context characteristics
        this.ctx.translate(moveableObject.width, 0); // Mirror the image
        this.ctx.scale(-1, 1); // Move properties to their original position
        moveableObject.x = moveableObject.x * -1
    }


    /**
     * Mirror the image back to their original position.
     * @param {object} moveableObject 
     * 
     */
    mirrorImageBack(moveableObject) {
        moveableObject.x = moveableObject.x * -1
        this.ctx.restore();
    }


    /**
     * Generate the background.
     * 
     */
    generateBackground() {
        for (let i = 0; i < 8; i++) {
            this.level.background.push(
                new Background(`img/3. Background/Layers/5. Water/D${this.imagePosition}.png`, this.background_x),
                new Background(`img/3. Background/Layers/3.Fondo 1/D${this.imagePosition}.png`, this.background_x),
                new Background(`img/3. Background/Layers/4.Fondo 2/D${this.imagePosition}.png`, this.background_x),
                new Background(`img/3. Background/Layers/2. Floor/D${this.imagePosition}.png`, this.background_x),
                new Background(`img/3. Background/Layers/1. Light/${this.imagePosition}.png`, this.background_x)
            )

            this.background_x += 719

            if (this.imagePosition >= 2) {
                this.imagePosition = 1;
            } else {
                this.imagePosition++;
            }
        }
    }


    /**
     * main music-function. At death the music end.
     * 
     */
    playBackgroundMusic() {
        document.getElementById("unmute").classList.remove("d-none");
        document.getElementById("mute").classList.add("d-none");
        this.backgroundMusicIsPlay = setInterval(() => {
            if (this.character.energie > 1) {
                this.backgroundMusic.play();
                this.backgroundMusic.volume = 0.5;
            } else {
                setTimeout(() => {
                    this.backgroundMusic.pause();
                }, 250);
            }
        }, 1);
    }


    /**
     * Update-function for the Coins, characterenergie and bossenergie.
     * 
     */
    updateTakeableObjects() {
        document.getElementById("coins").innerHTML = `${this.coinCounter} / ${this.level.coins.length + this.coinCounter}`;
        document.getElementById("heart").innerHTML = `${this.character.energie} %`;
        document.getElementById("bossLife").innerHTML = `${this.endboss.bossEnergie} %`
    }


    //#################################################################################### GameOver #######################################################################\\


    /**
     * GameOver-function to stop the game.
     * 
     */
    gameover() {
        this.isGameOver = true;
        this.gameOverSound.play();
        if (this.isGameOver == true) {
            setTimeout(() => {
                document.getElementById("restart").classList.remove("transform");
                document.getElementById("restart").classList.remove("d-none");
                document.getElementById("gameOverText").innerHTML = "Game Over!";
            }, 2000);

        }

        this.clearExtraIntervals();
        this.clearBossMovement();
        this.clearFishMovement(this.level.normalFish);
        this.clearFishMovement(this.level.jellyfish);
        this.clearCharacterMovement();
        this.clearSounds();

        initLevel();
    }


    /**
     * Cleared the movements from the boss.
     * 
     */
    bossIsDead() {
        this.isWin = true;
        this.levelfinsh.play();
        if (this.isWin == true) {
            setTimeout(() => {
                document.getElementById("nextLevel").classList.remove("transform");
                document.getElementById("nextLevel").classList.remove("d-none");
            }, 2000);
        }

        this.clearExtraIntervals();
        this.clearBossMovement();
        this.clearFishMovement(this.level.normalFish);
        this.clearFishMovement(this.level.jellyfish);
        this.clearCharacterMovement();
        this.clearSounds();
        this.clearBackgroundMusic();

        initLevel();
    }


    //#################################################################################### Clears #######################################################################\\


    /**
     * Cleared all movements from the fishes.
     * @param {object} object 
     * 
     */
    clearFishMovement(object) {
        object.forEach(obj => {
            clearInterval(obj.moveLeftToRight);
            clearInterval(obj.moveRightToLeft);
            clearInterval(obj.moveUpToDown);
            clearInterval(obj.moveDownToUp);
        })
    }


    /**
     * Cleared all movements from the Boss.
     * 
     */
    clearBossMovement() {
        clearInterval(this.endboss.bossAnimation);
        clearInterval(this.endboss.bossMovement);
        clearInterval(this.endboss.bossRotationAnimation);
    }


    /**
     * Cleared all movements from the character
     * 
     */
    clearCharacterMovement() {
        clearInterval(this.character.characterControl);
        clearInterval(this.character.characterSwimming);
        clearInterval(this.character.characterAttackAnimation);
        clearInterval(this.character.characterDMG);
    }

    clearExtraIntervals() {
        clearInterval(this.runCollisions);
        clearInterval(this.barrierSlide);
        clearInterval(this.inputDmg);
        clearInterval(this.firstGameStartMusic);
    }


    /**
     * Clear all sounds from the World
     * 
     */
    clearSounds() {
        this.coinCollecting.pause();
        this.sharkEat.pause();
        this.hurtSound.pause();
    }

    clearBackgroundMusic() {
        this.backgroundMusic.pause();
        clearInterval(this.backgroundMusicIsPlay);
        document.getElementById("unmute").classList.add("d-none");
        document.getElementById("mute").classList.remove("d-none");
    }


    //#################################################################################### After the game #####################################################################\\


    /**
     * Restart the game.
     * 
     */
    restart() {
        this.isGameOver = false;
        this.isWin = false;
        document.getElementById("restart").classList.add("transform");
        document.getElementById("bossHeart").classList.add('transform');
        document.getElementById("bossLife").classList.add('transform');
        document.getElementById("restart").classList.add("d-none");
        document.getElementById("bossHeart").classList.add('d-none');
        document.getElementById("bossLife").classList.add('d-none');
        document.getElementById("loading").classList.remove("transform");
        document.getElementById("loading").classList.remove("d-none");
        init();
        this.clickSound.play();
        setTimeout(() => {
            clearInterval(this.loadingInterval);
            document.getElementById("loading").classList.add("transform");
            document.getElementById("loading").classList.add("d-none");
        }, 10000);
    }

    comingSoon() {
        document.getElementById("nextLevel").classList.add("transform");
        document.getElementById("nextLevel").classList.add("d-none");
        document.getElementById("restart").classList.remove("transform");
        document.getElementById("restart").classList.remove("d-none");
        document.getElementById("gameOverText").innerHTML = "Next Level coming Soon";
        clickSound.play();
    }

}