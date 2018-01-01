const changeToEnemyAt = 5;
const changeToOrangeAt = 2;
let foodImagesIndex = [];   // here images are in table because of animation
let lastAnimationStep;
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

    lastAnimationStep = foodImagesIndex.length-1;
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
        this.stage = -1;
        this.posX = Math.random() * 600; // width of draw area
        this.posY = Math.random() * 400; // height of draw area
        foodTable.push(this);
    }

    rotting(){
        this.stage += 1;
        if (this.stage === lastAnimationStep){
            enemyTable.push(this);
            var index = foodTable.indexOf(this);
            delete foodTable[index];
        }
    }

    draw(){
        if (this.stage >= 0){
            let index = foodImagesIndex[this.stage];
            gameCanvas.getContext("2d").drawImage(images[index], this.posX-15, this.posY-15, 50, 50);
        }
    }

    eat() {
        if (this.stage === lastAnimationStep){
            gameOver("Bad Audit");
        } else if(this.stage < lastAnimationStep -1) {
            score += (lastAnimationStep - this.stage)*2;
            eatenFreeshFood += 1;
        } else {
            score += (lastAnimationStep - this.stage);
            eatenRootenFood += 1;
        }
        new Food();
        new Hero();

        delete foodTable[foodTable.indexOf(this)];
        delete this;
    }

}