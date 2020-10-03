var vectorsList = [];

function setup () {
	createCanvas(600, 600);

	this.origin = new Vector2(width/2, height/2);
}

function draw () {
	// Grid Y axis
  stroke( 50, 50, 50 );
	line(this.origin.x, 0, this.origin.x, height);
	
	// Grid X axis
  stroke( 50, 50, 50 );
  line(0, this.origin.y, width, this.origin.y);  
}