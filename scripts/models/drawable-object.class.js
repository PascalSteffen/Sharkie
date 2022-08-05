class DrawableObject {

    x = 120;
    y = 250;
    width = 200;
    height = 150;
    img;
    currenImage = 0;
    imagesCache = {};


    /**
     * load one Image.
     * @param {string} path 
     * 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * show all Objects.
     * @param {object} moveableObject 
     * 
     */
    drawImage(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (error) {
            console.log(error, this.img);
        }

    }

    /**
     * iterates through the respective array consisting of images.
     * @param {array} arr 
     * 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imagesCache[path] = img;
        });
    }
}