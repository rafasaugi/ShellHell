"use strict";

function startGame()
{
    GameArea.start();
}

//canvas
let GameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 1600;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        clearInterval(GameArea.interval);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.id = "Game-Window";

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        let h1Element = document.querySelector("h1.Game-Title");
        h1Element.insertAdjacentElement("afterend", this.canvas);
    },
    
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}

function updateGameArea(){
    GameArea.clear();
}