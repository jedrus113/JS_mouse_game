

function showLoadingScreen(){
    drawText(gameCanvas.getContext("2d"), "Loading...", true, 130, 20, 200);
}

function showGameOverScreen(reason){
    let g = gameCanvas.getContext("2d");
    g.drawImage(images[3], 200, 0, 235, 400);

    drawText(g, "Score: " + score, true, 30, 240, 130);

    let auditAverage = Math.round(score / (eatenFreeshFood + eatenRootenFood));

    let fontSize = 18;
    drawText(g, "Avg Audit Score: " + auditAverage, true, fontSize, 238, 155);
    drawText(g, "Time Survived: " + secondAlive + "s", true, fontSize, 220, 180);
    drawText(g, "Good Audits: " + eatenFreeshFood, true, fontSize, 220, 205);
    drawText(g, "OK Audits: " + eatenRootenFood, true, fontSize, 220, 230);
    drawText(g, "Bad Audits Left: " + enemyTable.length, true, fontSize, 220, 255);
    drawText(g, "Death reason: " + reason, true, fontSize, 220, 280);

    drawText(g, "Programmer: Andrzej Dąbski", true, 15, 215, 385);
    drawText(g, "andrew@medicaleguides.com", true, 15, 215, 397);
}