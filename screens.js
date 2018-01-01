let gameOverImageIndex;
let averageScoreMessage = "Average Score: ";
let fastPointsMessage = "Full snowmans: ";
let slowPointsMessage = "Half-melted snowmans: ";
let enemiesLeftMessage = "Melted snowmans: ";
let gameOverReasonMessage = "Melted by: ";
let emailaddress = "dabski.andrzej@gmail.com";

function loadingScreens(){
    let gameOverImageSrc = "images/Santa/gameOver.png";
    if (MEG_VERSION){
        gameOverImageSrc = "images/MEG/gameOver.png";
        averageScoreMessage = "Avg Audit Score: ";
        fastPointsMessage = "Good Audits: ";
        slowPointsMessage = "OK Audits: ";
        enemiesLeftMessage = "Bad Audits Left: ";
        gameOverReasonMessage = "Death reason: ";
    }

    gameOverImageIndex = images.length;
    images.push(getImageFile(gameOverImageSrc));
}

function showLoadingScreen(){
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 130, 20, 200);
}

function getGameOverImage(){
    return images[gameOverImageIndex];
}

function showGameOverScreen(reason){
    let g = gameCanvas.getContext("2d");
    g.drawImage(getGameOverImage(), 200, 0, 235, 400);

    drawText(g, "Score: " + score, true, 30, 240, 130);

    let auditAverage = Math.round(score / (eatenFreeshFood + eatenRootenFood));

    let fontSize = 18;
    drawText(g, averageScoreMessage + auditAverage, true, fontSize, 238, 155);
    drawText(g, "Time Survived: " + secondAlive + "s", true, fontSize, 220, 180);
    drawText(g, fastPointsMessage + eatenFreeshFood, true, fontSize, 220, 205);
    drawText(g, slowPointsMessage + eatenRootenFood, true, fontSize, 220, 230);
    drawText(g, enemiesLeftMessage + enemyTable.length, true, fontSize, 220, 255);
    drawText(g, gameOverReasonMessage + reason, true, fontSize, 220, 280);

    drawText(g, "Programmer: Andrzej Dąbski", true, 15, 215, 385);
    drawText(g, "dabski.andrzej@gmail.com", true, 15, 215, 397);
}