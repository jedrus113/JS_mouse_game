var gameInterval;
var gameCanvas;
var eventCatcherDiv;
var images = [];
var frame = 0;
var scoreBox;
var score;

function startLoading()
{
    eventCatcherDiv = document.getElementById("EventCatcher");
    // eventCatcherDiv events go here

    images.push(getImageFile("images/meg_happy.svg"));
    images.push(getImageFile("images/meg_okay.svg"));
    images.push(getImageFile("images/meg_unhappy.svg"));
    images.push(getImageFile("images/tailGameOver.png"));
    images.push(getImageFile("images/auditGameOver.png"));

    scoreBox = document.getElementById("scoreBox");
    gameCanvas = document.getElementById("GraphicsBox");
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 50, 50);
    heroes = [];
    new Hero();
    score = 0;

    gameInterval = setInterval(hasLoaded, 250);
}

function getImageFile(filename)
{
    var imgVar = document.createElement("img");
    imgVar.setAttribute("src", filename);
    return imgVar;
}

function hasLoaded()
{

    eventCatcherDiv.addEventListener("mousemove", canvasMove);
    if (true) // Check to see if all info is loaded
    {
        clearInterval(gameInterval);
        setInterval(oneSecond, 1000);
        startGame();
    }
}

function oneSecond(){
    foodRotting();
}

function drawText(g, stringValue, fillText, x, y)
{
    g.font = "30px Arial";
    g.fillStyle = "#00FF00";
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
    frame += 0.1;

    gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawFoods();
    drawHeroes();
}


function badAuditGameOver(){
    gameCanvas.getContext("2d").drawImage(images[4], 200, 0, 235, 400);
    gameOver();
}

function eatTailGameOver(){
    gameCanvas.getContext("2d").drawImage(images[3], 200, 0, 235, 400);
    gameOver();
}

function gameOver(){
    clearInterval(gameInterval);

}