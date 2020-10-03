var squareVectors = [];

var origin;

function setup () {
	createCanvas(600, 600);

	origin = new Vector2(width/2, height/2);
	
	squareVectors = createSquare (100, 120, 100);
}

function draw () {
	background(255);
	drawGrid();
	drawSquare(squareVectors);
	rotateSquare(squareVectors, PI * 0.02);
}

function drawGrid () {
	// Grid Y axis
	stroke(30, 30, 30);
	line(origin.x, 0, origin.x, height);
	line(origin.x, 0, origin.x - 5, 7);
	line(origin.x, 0, origin.x + 5, 7);
	
	fill(30, 30, 30);
	text("Y", origin.x - 20, 10);

	// Grid X axis
	stroke(30, 30, 30);
	line(0, origin.y, width, origin.y);  
	line(width - 7, origin.y - 5, width, origin.y);
	line(width - 7, origin.y + 5, width, origin.y);
	
	fill(30, 30, 30);
	text("X", width - 10, origin.y + 20);
}

function createSquare (positionX, positionY, size) {
	var vectors = [];
	
	// Right Top Corner
	vectors.push(new Vector2(origin.x + positionX + size/2, origin.y - positionY - size/2));
	// Left Top Corner
	vectors.push(new Vector2(origin.x + positionX - size/2, origin.y - positionY - size/2));
	// Left Bottom Corner
	vectors.push(new Vector2(origin.x + positionX - size/2, origin.y - positionY + size/2));
	// Right Bottom Corner
	vectors.push(new Vector2(origin.x + positionX + size/2, origin.y - positionY + size/2));

	return vectors;
}

function drawSquare (vectors) {
	stroke(35, 110, 230);
	line(vectors[0].x, vectors[0].y, vectors[1].x, vectors[1].y);
	line(vectors[1].x, vectors[1].y, vectors[2].x, vectors[2].y);
	line(vectors[2].x, vectors[2].y, vectors[3].x, vectors[3].y);
	line(vectors[3].x, vectors[3].y, vectors[0].x, vectors[0].y);
}

function rotateSquare (vectors, tetha) {
	var rotation = new Matrix3();
	rotation.rotate(tetha);

	for (var i = 0; i < vectors.length; i++)
		vectors[i] = rotation.transform(vectors[i]);
}