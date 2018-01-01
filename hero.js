let heroHeadImagesIndex = [];   // head animation
let heroTailImagesIndex = [];   // tail animation
let heroes = [];
let i = 0;  // index of the current head
let toching = [];


// TODO: HERO FACES DISPLAY

function loadingHero(){
    const heroImageSrc = ["images/hero0.png", "images/hero1.png"];
    const tailImageSrc = ["images/tail0.png", "images/tail1.png"];

    heroImageSrc.forEach(function (src) {
        heroHeadImagesIndex.push(images.length);
        images.push(getImageFile(src));
    });
    tailImageSrc.forEach(function (src) {
        heroTailImagesIndex.push(images.length);
        images.push(getImageFile(src));
    });

}

function heroMoveTo(x,y){
    i++;
    if (i >= heroes.length){
        i=0;
    }
    return heroes[i].moveTo(x,y)
}

function drawHeroes(){
    heroes.forEach(function (element, index) {
        if (index != i)
            element.draw();
    });
    heroes[i].draw(); // head draw as last
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
        this.animationStep = 0;
        heroes.push(this);
        toching.push(heroes.length - 1);
    }

    draw(){
        var g = gameCanvas.getContext("2d");
        this.animationStep += 1;
        let index;
        if (heroes[i] == this){ // this is head
            if (this.animationStep >= heroHeadImagesIndex.length){
                this.animationStep = 0;
            }
            index = heroHeadImagesIndex[this.animationStep];
        } else {
            if (this.animationStep >= heroTailImagesIndex.length){
                this.animationStep = 0;
            }
            index = heroTailImagesIndex[this.animationStep];
        }
        gameCanvas.getContext("2d").drawImage(images[index], this.posX-10, this.posY-10, 20, 20);
    }

    // return false if move is not possible
    moveTo(x,y){
        this.posX = x;
        this.posY = y;

        if (this.checkCollisionWithTail(x,y)){
            gameOver("Bitten Tail");
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
            if (element.posX + 8 > x - 8 && element.posX < x + 8
                && element.posY + 8 > y - 8 && element.posY < y + 8) {
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