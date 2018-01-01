const  MEG_VERSION = true;

if (MEG_VERSION){
    const  gameOverImageSrc ="images/MEG/gameOver.png";
    const etableImageSrc = ["images/MEG/meg_happy.svg", "images/MEG/meg_okay.svg",  "images/MEG/meg_unhappy.svg"];
} else {
    const  gameOverImageSrc ="images/MEG/gameOver.png";
    const etableImageSrc = ["images/Santa/snowman0.png", "images/Santa/snowman1.png", "images/Santa/snowman2.png", "images/Santa/snowman3.png", "images/Santa/snowman4.png"];
}
const heroImageSrc = ["images/hero0.png", "images/hero1.png"];
const tailImageSrc = ["images/tail0.png", "images/tail1.png"];

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
    eventCatcherDiv = document.getElementById("EventCatcher");

    images.push(getImageFile("images/MEG/meg_happy.svg"));
    images.push(getImageFile("images/MEG/meg_okay.svg"));
    images.push(getImageFile("images/MEG/meg_unhappy.svg"));
    images.push(getImageFile("images/MEG/gameOver.png"));

    scoreBox = document.getElementById("scoreBox");
    gameCanvas = document.getElementById("GraphicsBox");

    showLoadingScreen();

    heroes = [];
    new Hero();
    score = 0;
    secondAlive = 0;
    eatenFreeshFood = 0;
    eatenRootenFood = 0;

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
        eventCatcherDiv.addEventListener("mousemove", canvasMove);
        clearInterval(gameInterval);
        secondInterval = setInterval(oneSecond, 1000);
        startGame();
    }
}

function oneSecond(){
    secondAlive += 1;
    foodRotting();
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