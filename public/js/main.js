var goodGuy;
var enemyArray = [];
var goodShotArray = [];
var badShotArray = [];
var score;
var shot;
var enemy;
var boss;
var badShot;
var playerIsClose = false;
var gameIsDone = false;
var gameTrack;
var laser;

function preload() {
	gameTrack = loadSound('media/ghostly-trap.mp3');
	laser = loadSound('media/laser.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight-50);
	goodGuy = new Player();
	score = new Score();
	boss = new Boss();

	for (var i = 0; i < 150; i++){
		enemy = new Enemy();
		enemyArray.push(enemy);
	}
	gameTrack.setVolume(0.5);
	gameTrack.loop();
	laser.setVolume(0.2);
}

function draw() {
	background(255);
	goodGuy.run();
	score.run();
	boss.run();

	for (var i = 0; i < badShotArray.length; i++) {
		badShotArray[i].run();
		if (badShotArray[i].centreX >= goodGuy.centreX - goodGuy.diameter/2 && badShotArray[i].centreX <= goodGuy.centreX + goodGuy.diameter/2 && badShotArray[i].centreY <= goodGuy.centreY + goodGuy.diameter/2 && badShotArray[i].centreY >= goodGuy.centreY - goodGuy.diameter/2 ) {
			goodGuy.gotHit();
			//console.log(goodGuy.life);
		}
	}

	for (var j = 0; j < enemyArray.length; j++){
		enemyArray[j].run();
		//Super long conditional. Should have put this in a function
		if ((enemyArray[j].xPos >= goodGuy.centreX - goodGuy.diameter/2 && enemyArray[j].xPos <= goodGuy.centreX + goodGuy.diameter/2 && enemyArray[j].yPos <= goodGuy.centreY + goodGuy.diameter/2 && enemyArray[j].yPos >= goodGuy.centreY - goodGuy.diameter/2) || (enemyArray[j].xPos + enemyArray[j].w >= goodGuy.centreX - goodGuy.diameter/2 && enemyArray[j].xPos + enemyArray[j].w <= goodGuy.centreX + goodGuy.diameter/2 && enemyArray[j].yPos <= goodGuy.centreY + goodGuy.diameter/2 && enemyArray[j].yPos >= goodGuy.centreY - goodGuy.diameter/2) || (enemyArray[j].xPos >= goodGuy.centreX - goodGuy.diameter/2 && enemyArray[j].xPos <= goodGuy.centreX + goodGuy.diameter/2 && enemyArray[j].yPos + enemyArray[j].h <= goodGuy.centreY + goodGuy.diameter/2 && enemyArray[j].yPos + enemyArray[j].h>= goodGuy.centreY - goodGuy.diameter/2) || (enemyArray[j].xPos + enemyArray[j].w >= goodGuy.centreX - goodGuy.diameter/2 && enemyArray[j].xPos + enemyArray[j].w <= goodGuy.centreX + goodGuy.diameter/2 && enemyArray[j].yPos + enemyArray[j].h <= goodGuy.centreY + goodGuy.diameter/2 && enemyArray[j].yPos + enemyArray[j].h >= goodGuy.centreY - goodGuy.diameter/2)) {
			goodGuy.gotTouched();
		}
	}

	keyPressDem();
	runAndCheckStuff();
	sendThemAway();

}

var keyPressDem = function() {
	if (keyIsPressed === true && keyCode === 32) {
		shot = new goodShot();
		goodShotArray.push(shot);
		laser.play();
		return;
	}

	if (keyIsPressed === true && keyCode === LEFT_ARROW) {
		if (playerIsClose && goodGuy.centreX > (boss.xPos - 700)){
			return;
		}
		for (i = 0; i < enemyArray.length; i++) {
			enemyArray[i].xPos += 5;
		}
		boss.xPos += 3;
	}
	if (keyIsPressed === true && keyCode === RIGHT_ARROW) {
		if (playerIsClose && goodGuy.centreX > boss.xPos + 200){
			return;
		}
		for (i = 0; i < enemyArray.length; i++) {
			enemyArray[i].xPos -= 5;
		}
		boss.xPos -=3;
		//return false;
	}
	if (keyIsPressed === true && keyCode === UP_ARROW) {
		goodGuy.centreY -= 5;
		//return false;
	}
	if (keyIsPressed === true && keyCode === DOWN_ARROW) {
		goodGuy.centreY += 5;
		//return false;
	}
};

var runAndCheckStuff = function() {
	var distance = Math.sqrt(Math.pow((boss.xPos - goodGuy.centreX), 2) + (Math.pow((boss.yPos - goodGuy.centreY), 2)));
	if (distance <= 1200) {
		playerIsClose = true;
		boss.shoot();
	}

	for (var j = goodShotArray.length-1; j >= 0; j--){
		goodShotArray[j].run();
		if (goodShotArray[j].centreX >= windowWidth/2 && goodShotArray.length > 1) {
			goodShotArray.splice(j, 1);
		}

		for (var k = enemyArray.length - 1; k >=0; k--){
			if (goodShotArray[j].centreX >= enemyArray[k].xPos && goodShotArray[j].centreX <= enemyArray[k].xPos + enemyArray[k].w && goodShotArray[j].centreY <= enemyArray[k].yPos + enemyArray[k].h && goodShotArray[j].centreY >= enemyArray[k].yPos){
				score.add();
				enemyArray[k].gotHit();
				if (enemyArray[k].life === 0) {
					enemyArray.splice(k, 1);
				}
			}
		}
		
		if (goodShotArray[j].centreX >= boss.xPos - boss.diameter/2 && goodShotArray[j].centreX <= boss.xPos + boss.diameter/2 && goodShotArray[j].centreY <= boss.yPos + boss.diameter/2 && goodShotArray[j].centreY >= boss.yPos - boss.diameter/2){
			boss.gotHit();
			console.log(boss.life);
			score.add();
		}
	}
	if (boss.life <= 0 || goodGuy.life <= 0) {
		gameIsDone = true;
	}
};

var sendThemAway = function() {
	var base = score.base;
	if (gameIsDone) {
		document.location.href = "/gameOver?gamescore="+base;
	}
};



