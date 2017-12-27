

class Hero {
    constructor(){
        this.posX = 20;
        this.posY = 20;
    }

    draw(){
        var g = gameCanvas.getContext("2d");
        g.fillStyle = "#0000FF";
        g.fillRect(this.posX, this.posY, 20, 20);
    }

    moveTo(x,y){
        this.posX = x;
        this.posY = y;
    }

}