function Player() {
	this.diameter = height*(8/100);
	this.centreX = width*(10/100);
	this.centreY = height*(50/100);

	this.life = 500;

	this.gotHit = function() {
		this.life -= 3;
	};

	this.gotTouched = function() {
		this.life -= 1;
	};

	this.display = function() {
		ellipseMode(CENTER);
		stroke(0);
		fill(255);
		ellipse(this.centreX, this.centreY, this.diameter, this.diameter);
		noStroke();
		textSize(36);
		fill('#ababab');
		text('LIFE:' +this.life, windowWidth*(3/100), windowHeight*(1/20));

	};

	this.run = function() {
		this.display();
	};
}
