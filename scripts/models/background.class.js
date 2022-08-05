class Background extends MoveableObject {

    width = 720;
    height = 480;
    y = 0;

    constructor(image, x) {
        super().loadImage(image);
        this.x = x;
    }
}