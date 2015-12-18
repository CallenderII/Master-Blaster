function Score() {
	this.base = 0;
	this.x = windowWidth*(83/100);
	this.y = windowHeight*(1/20);

	this.add = function() {
		this.base += 1;
	};

	this.display = function() {
		noStroke();
		textSize(36);
		fill('#ababab');
		text('SCORE:' +this.base, this.x, this.y);
	};

	this.run = function(){
		this.display();
	};
}