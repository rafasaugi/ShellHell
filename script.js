"use strict";


//Variables


//Game Objects
let player;
let bullet1;
let bullet2;
let bullet3;
let crosshair;
let grass1;
let grass2;
let grass3;
let grass4;
let grass5;
let grass6;
let grass7;
let grass8;
let grass9;


//Game Objects Arrays
let bullets;
let zombies = [];
let grassArray = [];


//Player Movement Variables
let moveForward;
let moveBackwards;
let angle;
let movementSpeed = 0.5;


//Zombie Variables
let zombiesWaitTime = [];
let zombiesAnimationPosition = [];
let zombiesPlayerCollision = [];
let spawnZombiesInterval;


//Score Variables
let highscore = 0;
let score = 0;


//Game play variables
let gameOver = false;
let restartScreen;


//Shoot variables
let bulletAngle;
let bulletSpeed = 20;
let canShoot = true;
let shootAnimationOver = true;
let bulletActive = false;


//Grass variables
let currentMaxX = 1280;
let currentMinX = -1280;
let currentMaxY = 720;
let currentMinY = -720;


//Animation variables
let playerSprite = "images/Top_Down_Survivor/Top_Down_Survivor/shotgun/idle/survivor-idle_shotgun_0.png";
let zombieSprite = "images/tds_zombie/export/Movement/skeleton-move_0.png";
let imagesScale = 0.4;


let playerMovementAnimation = [];
for(let i = 0; i<20;i++)
{
    playerMovementAnimation.push(new Image());
    playerMovementAnimation[i].src = "images/Top_Down_Survivor/Top_Down_Survivor/shotgun/move/survivor-move_shotgun_"+i.toString()+".png";
}


let playerShootAnimation = [];
for(let i = 0; i<3;i++)
{
    playerShootAnimation.push(new Image());
    playerShootAnimation[i].src = "images/Top_Down_Survivor/Top_Down_Survivor/shotgun/shoot/survivor-shoot_shotgun_"+i.toString()+".png";
}


let playerIdleAnimation = [];
for(let i = 0; i<20;i++)
{
    playerIdleAnimation.push(new Image());
    playerIdleAnimation[i].src = "images/Top_Down_Survivor/Top_Down_Survivor/shotgun/idle/survivor-idle_shotgun_"+i.toString()+".png";
}


let zombieMovementAnimation = [];
for(let i = 0; i<16;i++)
{
    zombieMovementAnimation.push(new Image());
    zombieMovementAnimation[i].src = "images/tds_zombie/export/Movement/skeleton-move_"+i.toString()+".png";
}


let zombieAttackAnimation = [];
for(let i = 0; i<8;i++)
{
    zombieAttackAnimation.push(new Image());
    zombieAttackAnimation[i].src = "images/tds_zombie/export/Attack/skeleton-attack_"+i.toString()+".png";
}


function startGame()
{
    GameArea.start();


    //Initialize Game Objects
    player = new Component(313*imagesScale,207*imagesScale,playerSprite,640-(313*imagesScale)/2,360-(202*imagesScale)/2,"player",0);
    grass1 = new Component(1280,720,"images/grass.png",-1280,720,"grass");
    grass2 = new Component(1280,720,"images/grass.png",0,720,"grass");
    grass3 = new Component(1280,720,"images/grass.png",1280,720,"grass");
    grass4 = new Component(1280,720,"images/grass.png",-1280,0,"grass");
    grass5 = new Component(1280,720,"images/grass.png",0,0,"grass");
    grass6 = new Component(1280,720,"images/grass.png",1280,0,"grass");
    grass7 = new Component(1280,720,"images/grass.png",-1280,-720,"grass");
    grass8 = new Component(1280,720,"images/grass.png",0,-720,"grass");
    grass9 = new Component(1280,720,"images/grass.png",1280,-720,"grass");
    bullet1 = new Component(10,2,"images/bullet.png",-10,-2,"image");
    bullet2 = new Component(10,2,"images/bullet.png",-10,-2,"image");
    bullet3 = new Component(10,2,"images/bullet.png",-10,-2,"image");
    crosshair = new Component(40,40,"images/crosshair097.png",640,360,"image");
    restartScreen = new Component(1280,720,"images/Game Over.png", 0,0,"image");
    bullets = [bullet1,bullet2,bullet3];
    grassArray = [grass1, grass2, grass3, grass4, grass5, grass6, grass7, grass8, grass9];


    //Reset Game
    zombies = [];
    spawnZombiesInterval = setInterval(spawnZombie, getRandomInterval());
    score = 0;
    gameOver = false;


    //Get Input
    window.addEventListener("keydown", handleMovementPress);
    window.addEventListener("keyup", handleMovementRelease);
    window.addEventListener("mousedown", Shoot);




}


//Create Canvas
let GameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        clearInterval(GameArea.interval);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.id = "Game-Window";


        //Put the canvas underneath the Game Title
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        let h1Element = document.querySelector("h1.Game-Title");
        h1Element.insertAdjacentElement("afterend", this.canvas);
    },


    clear: function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
}


//Create Game Components
function Component(width, height, source, x, y, type, angle=0){
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


    this.x = x;
    this.y = y;
}



    this.update = function(){


        let ctx = GameArea.context;


        //Score text and High score text
        if(gameOver === false)
        {
            ctx.font = "50px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(score.toString(), 640, 100);
        }
        else{
            ctx.font = "60px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("High Score: " + highscore.toString(), 640, 700);
        }

    }
        ctx.save();


        // Rotate the player image based on the angle
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);


        //Images and Animated Images
        if(type === "image")
        {
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        else if(type === "player")
        {
            this.image.src = playerSprite;
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        else if(type === "grass")
        {
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        }

            if(moveForward){
                // Movement & Idle animation
                if(!shootAnimationOver)
                {
                    playerShootAnimationFunction();
                }
                else {
                    playerMovementAnimationFunction()
                }


                //Move player
                this.x -= movementSpeed*10 * Math.cos(player.angle);
                this.y -= movementSpeed*10 * Math.sin(player.angle);


                //Move other game objects when moving player
                bullet1.x -= movementSpeed * Math.cos(bulletAngle);
                bullet1.y -= movementSpeed * Math.sin(bulletAngle);


                bullet2.x -= movementSpeed * Math.cos(bulletAngle);
                bullet2.y -= movementSpeed * Math.sin(bulletAngle);


                bullet3.x -= movementSpeed * Math.cos(bulletAngle);
                bullet3.y -= movementSpeed * Math.sin(bulletAngle);


                for(let i = 0; i<zombies.length; i++)
                {
                    zombies[i].x -= movementSpeed * Math.cos(player.angle);
                    zombies[i].y -= movementSpeed * Math.sin(player.angle);
                }
            }
