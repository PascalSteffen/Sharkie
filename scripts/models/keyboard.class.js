class Keyboard {

    LEFT = false; // Key A
    RIGHT = false; // Key D
    UP = false; // Key W
    DOWN = false; // Key S
    SPACE = false;


    constructor() {
        this.KeyEvents();
        this.mobileKeyEvents();
    }

    mobileKeyEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        document.getElementById('btnUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });

        document.getElementById('btnUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });

        document.getElementById('btnDown').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.DOWN = true;
        });

        document.getElementById('btnDown').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.DOWN = false;
        });

        document.getElementById('btnAttack').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        document.getElementById('btnAttack').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }


    KeyEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 68) {
                this.RIGHT = true;
            }

            if (e.keyCode == 65) {
                this.LEFT = true;
            }

            if (e.keyCode == 87) {
                this.UP = true;
            }

            if (e.keyCode == 83) {
                this.DOWN = true;
            }

            if (e.keyCode == 32) {
                this.SPACE = true;
            }
        });


        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 68) {
                this.RIGHT = false;
            }

            if (e.keyCode == 65) {
                this.LEFT = false;
            }

            if (e.keyCode == 87) {
                this.UP = false;
            }

            if (e.keyCode == 83) {
                this.DOWN = false;
            }

            if (e.keyCode == 32) {
                this.SPACE = false;
            }
        });
    }
}

