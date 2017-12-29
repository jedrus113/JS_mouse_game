let gameInterval;
let gameCanvas;
let eventCatcherDiv;
let images = [];
let scoreBox;
let score;


function startLoading()
{
    eventCatcherDiv = document.getElementById("EventCatcher");
    // eventCatcherDiv events go here

    images.push(getImageFile("images/meg_happy.svg"));
    images.push(getImageFile("images/meg_okay.svg"));
    images.push(getImageFile("images/meg_unhappy.svg"));
    images.push(getImageFile("images/gameOver.png"));

    scoreBox = document.getElementById("scoreBox");
    gameCanvas = document.getElementById("GraphicsBox");
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 130, 20, 200);
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
        setInterval(oneSecond, 1000);
        startGame();
    }
}

function oneSecond(){
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
    clearInterval(gameInterval);
    eventCatcherDiv.removeEventListener("mousemove", canvasMove);

    let g = gameCanvas.getContext("2d");
    g.drawImage(images[3], 200, 0, 235, 400);

    drawText(g, "Score: " + score, true, 30, 240, 150);

    drawText(g, "Death reason: " + reason, true, 17, 225, 285);

}