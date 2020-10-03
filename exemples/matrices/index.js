var vectorsList = [];

function setup () {
	createCanvas(900, 900);

	this.origin = new Vector2(width/2, height/2);
}

function draw () {
	// eixo Y
  stroke( 50, 50, 50 );
	line(this.origin.x, 0, this.origin.x, height);
	
	// eixo X
  stroke( 50, 50, 50 );
  line(0, this.origin.y, width, this.origin.y);  
}