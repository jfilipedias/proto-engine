var squareVectors = [];

function setup () {
	createCanvas(600, 600);

	// World Origin
	this.origin = new Vector2(width/2, height/2);
	
	squareVectors = createSquare();
}

function draw () {
	drawGrid();
	
	drawSquare(squareVectors);
}

function drawGrid () {Bottom
	// Grid Y axis
	stroke( 50, 50, 50 );
	line(this.origin.x, 0, this.origin.x, height);

	// Grid X axis
	stroke( 50, 50, 50 );
	line(0, this.origin.y, width, this.origin.y);  
}

function createSquare (positionX, positionY, size) {
	var vectors = [];
	
	// Right Top Corner
	vectors.push(new Vector2(positionX + size/2, positionY - size/2));
	// Left Top Corner
	vectors.push(new Vector2(positionX - size/2, positionY - size/2));
	// Left Bottom Corner
	vectors.push(new Vector2(positionX - size/2, positionY + size/2));
	// Right Bottom Corner
	vectors.push(new Vector2(positionX + size/2, positionY + size/2));

	return vectors;
}

function drawSquare (vectors) {

}