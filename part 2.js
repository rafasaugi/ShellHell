//variables

//Game Objects
let player;
let grass1;
let grass2;
let grass3;
let grass4;
let grass5;
let grass6;
let grass7;
let grass8;
let grass9;

//Animation Variables
let playerSprite = "images"
let imagesScale = 0.4;

function Component(width, height, source, x, y, type, angle = 0) {
    this.type = type;
    this.angle = angle;

    if (type === "image" || type === "grass") {
        this.image = new Image();
        this.image.src = source;
    }
    else if (type === "player") {
        this.image = new Image();
        this.image.src = playerSprite;
    }

    this.width = width;
    this.height = height;

    this x = x;
    this.y = y;

    this.update = function () {
        let ctx = GameArea.context;

        ctx.save();

        //Rotate the player based on angle
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);

        //Images and Animated Images
        if (type === "image") {
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }

        ctx.restore();




    }


