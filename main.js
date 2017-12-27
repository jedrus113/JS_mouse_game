var gameInterval;
var gameCanvas;
var eventCatcherDiv;
var coinX = 100;
var coinY = 100;

function startLoading()
{
    eventCatcherDiv = document.getElementById("EventCatcher");
    // eventCatcherDiv events go here

    gameCanvas = document.getElementById("GraphicsBox");
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 50, 50);
    new Hero();

    gameInterval = setInterval(hasLoaded, 250);
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
    g.fillStyle = "#FFD700";
    g.beginPath();
    g.arc(coinX, coinY, 20, 0, 2*Math.PI);
    g.fill();
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
    }

}

function runGame()
{
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
