var changeToEnemyAt = 10;
var changeToOrangeAt = 5;
var foodTable = [];
var enemyTable = [];

class Food{
    constructor(){
        this.seconds = 0;
        this.state = 0;
        this.posX = Math.random() * 600; // width of draw area
        this.posY = Math.random() * 400; // height of draw area
        foodTable.push(this);
    }

    secondAdd(){
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
        g.drawImage(images[this.state], this.posX-15, this.posY-15, 50, 50);

    }

    eat() {
        if (this.state == 0) {
            score += 10;
        } else if (this.state == 1){
            score += 5;
        } else {
            gameOver();
        }
        delete this;
    }

}