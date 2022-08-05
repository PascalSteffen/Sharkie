let canvas;
let world;
let clickSound = new Audio('audio/click-sound.mp3');

/**
 * init-function to start the world.
 * 
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    ctx = canvas.getContext('2d');
}


//#################################################################################### Before the Game Start ###############################################################\\


/**
 * pushed the init-function to start.
 * 
 */
function startGame() {
    document.getElementById("startGame").classList.remove("transform");
    document.getElementById("startBackground").classList.add("transform");
    document.getElementById("informationBackground").classList.add("transform");
    document.getElementById("headline").classList.add("transform");

    setTimeout(() => {
        document.getElementById("startGame").classList.remove("d-none");
        document.getElementById("startBackground").classList.add("d-none");
        document.getElementById("informationBackground").classList.add("d-none");
        document.getElementById("headline").classList.add("d-none");
    }, 250);

    init();
    clickSound.play();
}


/**
 * Init the first-level 
 * showed all information before the game is starting.
 * 
 */
function information() {
    let x = window.matchMedia("(min-width: 916px)");
    let y = window.matchMedia("(min-height: 900px)");
    if (x.matches && y.matches) {
        document.getElementById("startBackground").classList.add("transform");
        document.getElementById("informationBackground").classList.remove("transform");
        setTimeout(() => {
            document.getElementById("startBackground").classList.add("d-none");
            document.getElementById("informationBackground").classList.remove("d-none");
        }, 250);

    } else {
        document.getElementById("startBackground").classList.add("transform");
        document.getElementById("informationBackground").classList.remove("transform");
        document.getElementById("keyboardMoveLine").classList.add("transform");
        document.getElementById("keyboardAttackLine").classList.add("transform");
        document.getElementById("tippBtn").classList.add("transform");
        document.getElementById("infoText").classList.remove("transform");
        document.getElementById("startBtn").classList.remove("transform");

        setTimeout(() => {
            document.getElementById("startBackground").classList.add("d-none");
            document.getElementById("informationBackground").classList.remove("d-none");
            document.getElementById("keyboardMoveLine").classList.add("d-none");
            document.getElementById("keyboardAttackLine").classList.add("d-none");
            document.getElementById("infoText").classList.remove("d-none");
            document.getElementById("tippBtn").classList.add("d-none");
            document.getElementById("startBtn").classList.remove("d-none");
        }, 250);
    }

    initLevel();
    clickSound.play();
}


/**
 * Show credits
 * 
 */
function credits() {
    document.getElementById("startBackground").classList.add("transform");
    document.getElementById("credits").classList.remove("transform");
    document.getElementById("creditsBackground").classList.remove("transform");
    document.getElementById("creditBtn").classList.remove("transform");
    setTimeout(() => {
        document.getElementById("startBackground").classList.add("d-none");
        document.getElementById("creditsBackground").classList.remove("d-none");
        document.getElementById("credits").classList.remove("d-none");
        document.getElementById("creditBtn").classList.remove("d-none");
    }, 250);

    initLevel();
    clickSound.play();

}


/**
 * Going back to main stage.
 * 
 */
function goingBack() {
    document.getElementById("startBackground").classList.remove("transform");
    document.getElementById("credits").classList.add("transform");
    document.getElementById("creditBtn").classList.add("transform");
    document.getElementById("creditsBackground").classList.add("transform");
    setTimeout(() => {
        document.getElementById("startBackground").classList.remove("d-none");
        document.getElementById("creditsBackground").classList.add("d-none");
        document.getElementById("credits").classList.add("d-none");
        document.getElementById("creditBtn").classList.add("d-none");
    }, 250);

    clickSound.play();
}


/**
 * Show Tipps
 * 
 */
function tipps() {
    document.getElementById("keyboardMoveLine").classList.add("transform");
    document.getElementById("keyboardAttackLine").classList.add("transform");
    document.getElementById("tippBtn").classList.add("transform");
    document.getElementById("infoText").classList.remove("transform");
    document.getElementById("startBtn").classList.remove("transform");

    setTimeout(() => {
        document.getElementById("keyboardMoveLine").classList.add("d-none");
        document.getElementById("keyboardAttackLine").classList.add("d-none");
        document.getElementById("infoText").classList.remove("d-none");
        document.getElementById("tippBtn").classList.add("d-none");
        document.getElementById("startBtn").classList.remove("d-none");
    }, 250);

    clickSound.play();
}