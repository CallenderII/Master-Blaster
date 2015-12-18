function goodShot() {
	this.diameter = height*(2/100);
	this.xSpeed = 40;
	this.centreX = goodGuy.centreX;
	this.centreY = goodGuy.centreY;
	
	this.update = function() {
		this.centreX += this.xSpeed;
		if (this.centreX === windowWidth) {
			goodShotArray.splice(goodShotArray.indexOf(this), 1);
		}
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