function Enemy() {
	this.xPos = random(100, 4*windowWidth);
	this.yPos = random(0, height - width*(10/100));
	this.w = random(40, height*(10/100));
	this.h = random(40, (width/4)*(10/100));

	this.r = random(50, 150);
	this.g = random(50, 150);
	this.b = random(50, 150);
	this.a = random(70, 97);

	this.ySpeed = random(6, -6);

	this.life = 3;

	this.gotHit = function() {
		this.life -= 1;
	};

	this.checkEdges = function(){
		if (this.yPos + this.h > height || this.yPos < 0){
			this.ySpeed = -1 * this.ySpeed;
		}
	};

	this.display = function() {
		stroke(10);
		fill(this.r, this.g, this.b, this.a);
		rect(this.xPos, this.yPos, this.w, this.h);
	};

	this.update = function() {
		this.checkEdges();
		this.yPos += this.ySpeed;
	};

	this.run = function() {
		this.update();
		this.display();
	};
}