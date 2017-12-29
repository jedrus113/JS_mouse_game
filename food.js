var changeToEnemyAt = 10;
var changeToOrangeAt = 5;
var foodCounter = 3; // first food after 3 sec
var foodTable = [];
var enemyTable = [];

function foodRotting(){
    foodCounter -= 1;

    if(foodCounter === 0){
        new Food();
        foodCounter = 5; // each next food after
    }

    foodTable.forEach(function (element, index){
        element.rotting();
    });
}

function drawFoods(){
    foodTable.forEach(function (element, index){
        element.draw();
    });
    enemyTable.forEach(function (element, index){
        element.draw();
    });
}

function checkCollisionWithEnemy(x,y){
    return enemyTable.some(function(element, index) {
        if (element.posX + 20 > x - 20 && element.posX < x + 20
            && element.posY + 20 > y - 20 && element.posY < y + 20) {
                return true;
        }
    });
}

class Food{
    constructor(){
        this.seconds = 0;
        this.state = 0;
        this.posX = Math.random() * 600; // width of draw area
        this.posY = Math.random() * 400; // height of draw area
        foodTable.push(this);
    }

    rotting(){
        this.seconds += 1;
        if (this.seconds === changeToEnemyAt){
            this.state = 2;
            enemyTable.push(this);
            var index = foodTable.indexOf(this);
            delete foodTable[index];
        } else if (this.seconds === changeToOrangeAt){
            this.state = 1;
        }
    }

    draw(){
        gameCanvas.getContext("2d").drawImage(images[this.state], this.posX-15, this.posY-15, 50, 50);

    }

    eat() {
        if (this.state === 0) {
            score += (10 - this.seconds)*2;
        } else if (this.state === 1){
            score += 10 - this.seconds;
        } else {
            gameOver();
        }
        new Food();
        delete this;
    }

}