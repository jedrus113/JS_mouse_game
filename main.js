var gameInterval;
var gameCanvas;
var eventCatcherDiv;
var coinX = 100;
var coinY = 100;
var images = [];
var frame = 0;

function startLoading()
{
    eventCatcherDiv = document.getElementById("EventCatcher");
    // eventCatcherDiv events go here

    images.push(getImageFile("images/strawberry.png"));

    gameCanvas = document.getElementById("GraphicsBox");
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 50, 50);
    heroes = [];
    new Hero();

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
        startGame();
    }
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

function drawCoin(g)
{

    var myFrame = Math.round(frame) % 3;
    g.drawImage(images[0], 30*myFrame, 0, 30, 30, coinX-15, coinY-15, 30, 30);
}


function startGame()
{
    gameInterval = setInterval(runGame, 25);
}

function canvasMove(E)
{
    E = E || window.event;
    if (!heroMoveTo(E.pageX, E.pageY)){
        clearInterval(gameInterval);
        startLoading();
    }

}

function runGame()
{
    frame += 0.1;
    if (isTouchingCoin())
        moveCoin();
    gameCanvas.getContext("2d").clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawCoin(gameCanvas.getContext("2d"));

    heroes.forEach(function (element, index) {
        element.draw();
    });
}

function isTouchingCoin()
{
    // 20x20 is the size of the hero.
    // The radius of the coin is 20.
    return heroes.some(function (element, index) {
        if (element.posX + 20 > coinX - 20 && element.posX < coinX + 20
            && element.posY + 20 > coinY - 20 && element.posY < coinY + 20)
            return true;
    });

}

function moveCoin()
{
    new Hero();
    coinX = Math.random() * 600; // width of draw area
    coinY = Math.random() * 400; // height of draw area
}
