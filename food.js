const changeToEnemyAt = 5;
const changeToOrangeAt = 2;
let foodImagesIndex = [];   // here images are in table because of animation
let foodCounter = 1; // first food after 1 sec
let foodTable = [];
let enemyTable = [];


function loadingFood(){
    let etableImageSrc = ["images/Santa/snowman0.png", "images/Santa/snowman1.png", "images/Santa/snowman2.png", "images/Santa/snowman3.png", "images/Santa/snowman4.png"];
    if (MEG_VERSION){
        etableImageSrc = ["images/MEG/meg_happy.svg", "images/MEG/meg_okay.svg",  "images/MEG/meg_unhappy.svg"];
    }

    etableImageSrc.forEach(function (src) {
        foodImagesIndex.push(images.length);
        images.push(getImageFile(src));
    });
}

function foodRotting(){
    foodCounter -= 1;

    if(foodCounter === 0){
        new Food();
        foodCounter = 2; // each next food after
    }

    foodTable.forEach(function (element, index){
        element.rotting();
    });
}

function eatFoodOn(x,y){
    foodTable.forEach(function (element, index){
        if (element.posX + 20 > x - 20 && element.posX < x + 20
            && element.posY + 20 > y - 20 && element.posY < y + 20) {
            element.eat();
        }
    })
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
                gameOver("Bad Audit");
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
        let index = foodImagesIndex[this.state];
        gameCanvas.getContext("2d").drawImage(images[index], this.posX-15, this.posY-15, 50, 50);

    }

    eat() {
        if (this.state === 0) {
            score += (7 - this.seconds)*2;
            eatenFreeshFood += 1;
        } else if (this.state === 1){
            score += 7 - this.seconds;
            eatenRootenFood += 1;
        } else {
            gameOver();
        }
        new Food();
        new Hero();

        delete foodTable[foodTable.indexOf(this)];
        delete this;
    }

}