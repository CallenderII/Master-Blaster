function BadShot() {
	this.diameter = height*(3/100);
	this.xSpeed = 35;
	this.centreX = boss.xPos;
	this.centreY = boss.yPos;
	
	this.update = function() {
		this.centreX -= this.xSpeed;
	};

	this.display = function() {
		noStroke();
		fill(128);
		ellipse(this.centreX, this.centreY, this.diameter, this.diameter);
	};

	this.run = function() {
		this.update();
		this.display();
	};
}