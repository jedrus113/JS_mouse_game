const  MEG_VERSION = true;


let gameInterval;
let secondInterval;
let gameCanvas;
let eventCatcherDiv;
let images = [];
let scoreBox;
let score;
let secondAlive;
let eatenFreeshFood;
let eatenRootenFood;


function startLoading()
{
    gameCanvas = document.getElementById("GraphicsBox");
    showLoadingScreen();

    loadingScreens();
    loadingFood();
    loadingHero();

    eventCatcherDiv = document.getElementById("EventCatcher");
    scoreBox = document.getElementById("scoreBox");

    // start checking if images has been loaded
    gameInterval = setInterval(hasLoaded, 250);
}

function getImageFile(filename)
{
    var imgVar = document.createElement("img");
    imgVar.setAttribute("src", filename);
    return imgVar;
}

function didEverythingLoad()
{
    for (let j = 0; j < images.length; j++)
        if (!images[j].complete) return false;
    return true;

}

function hasLoaded()
{


    if (didEverythingLoad()) // Check to see if all info is loaded
    {
        clearInterval(gameInterval);

        heroes = [];
        new Hero();
        score = 0;
        secondAlive = 0;
        eatenFreeshFood = 0;
        eatenRootenFood = 0;

        eventCatcherDiv.addEventListener("mousemove", canvasMove);
        secondInterval = setInterval(oneSecond, 1000);
        startGame();
    }
}

function oneSecond(){
    secondAlive += 1;
    foodRotting();
    heroAnimationNext();
}

function drawText(g, stringValue, fillText, size, x, y)
{
    g.font = "" + size + "px Arial";
    g.fillStyle = "#000000";
    if (fillText)
        g.fillText(stringValue, x, y);
    else
        g.strokeText(stringValue, x, y);
}

function startGame()
{
    gameInterval = setInterval(runGame, 25);
}

function canvasMove(E)
{
    E = E || window.event;
    heroMoveTo(E.pageX, E.pageY);

}

function runGame()
{
    scoreBox.innerHTML = score;

    gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawFoods();
    drawHeroes();
}

function gameOver(reason){
    clearInterval(secondInterval);
    clearInterval(gameInterval);
    eventCatcherDiv.removeEventListener("mousemove", canvasMove);
    showGameOverScreen(reason);
}