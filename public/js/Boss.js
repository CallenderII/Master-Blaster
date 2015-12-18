function Boss() {
	this.xPos = (3*width);
	this.yPos = (height* 50/100);
	this.diameter = height*(25/100);
	this.ySpeed = random(-10, 10);

	this.life = 4000;

	this.gotHit = function() {
		this.life -= 5;
	};

	this.checkEdges = function() {
		if (this.yPos + this.diameter/2 > height || this.yPos - this.diameter/2 < 0){
			this.ySpeed = -1 * this.ySpeed;
		}
	};

	this.shoot = function() {
		setTimeout(	function() {
			badShot = new BadShot();
			badShotArray.push(badShot);
			return;
		}, 3000);
	};

	this.update = function() {
		this.checkEdges();
		this.yPos += this.ySpeed;
	};

	this.display = function() {
		ellipseMode(CENTER);
		stroke(10);
		fill(120);
		ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
	};

	this.run = function() {
		this.update();
		this.display();
	};
}