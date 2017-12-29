var heroes = [];
var i = 0;  // index of the current head
var toching = [];

function heroMoveTo(x,y){
    i++;
    if (i >= heroes.length){
        i=0;
    }
    return heroes[i].moveTo(x,y)
}

function drawHeroes(){
    heroes.forEach(function (element, index) {
        element.draw();
    });
}

class Hero {
    constructor(){
        if (heroes.length > 0){
            this.posX = heroes[i].posX;
            this.posY = heroes[i].posY;
        } else {
            this.posY = 20;
            this.posX = 20;
        }
        heroes.push(this);
        toching.push(heroes.length - 1);
    }

    draw(){
        var g = gameCanvas.getContext("2d");
        g.fillStyle = "#0000FF";
        g.fillRect(this.posX, this.posY, 20, 20);
    }

    // return false if move is not possible
    moveTo(x,y){
        this.posX = x;
        this.posY = y;

        if (this.checkCollisionWithTail(x,y)){
            gameOver("suicide (you eat your tail)");
            return false;
        }

        eatFoodOn(x,y);
        return !checkCollisionWithEnemy(x,y);
    }

    // returns true if colision detected
    checkCollisionWithTail(x, y){
        if (toching.indexOf(i) === -1) {
            toching.push(i);
        }

        return heroes.some(function(element, index) {
            var tochID = toching.indexOf(index);
            if (element.posX + 10 > x - 10 && element.posX < x + 10
                && element.posY + 10 > y - 10 && element.posY < y + 10) {
                if (tochID === -1) {
                    return true;
                }
            }
            else if(tochID >= 0){
                toching.splice(tochID, 1);
            }
        });
    }

}