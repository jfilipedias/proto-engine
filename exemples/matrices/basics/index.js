var square;

var origin;

function setup () {
	createCanvas(600, 600);

	origin = new Vector2(width/2, height/2);
	square = new Square(0, 0, 100);
	square.pivot = square.pivot.add(origin);

	scaleSquare(square.points, 1.2, 0.5);
	translateSquare(square, 150, 150);
}

function draw () {
	background(255);
	drawGrid();

	rotateSquare(PI * 0.01, square.points, square.pivot);
	drawSquare(square.points);
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

function drawSquare (points) {
	stroke(35, 110, 230);
	line(origin.x + points[0].x, origin.y - points[0].y, origin.x + points[1].x, origin.y - points[1].y);
	line(origin.x + points[1].x, origin.y - points[1].y, origin.x + points[2].x, origin.y - points[2].y);
	line(origin.x + points[2].x, origin.y - points[2].y, origin.x + points[3].x, origin.y - points[3].y);
	line(origin.x + points[3].x, origin.y - points[3].y, origin.x + points[0].x, origin.y - points[0].y);
}

function scaleSquare (points, x, y) {
	var matrix = new Matrix3();
	matrix.scale(x,y);
	
	for (var i = 0; i < points.length; i++)
		points[i] = matrix.transform(points[i]);
}

function rotateSquare (tetha, points, pivot = origin) {
	var originOffset = pivot.subtract(origin);

	var matrixRotation = new Matrix3();
	matrixRotation.rotate(tetha);

	for (var i = 0; i < points.length; i++) {	
		var matrixTraslation = new Matrix3();

		// Move to origin
		matrixTraslation.translate(-originOffset.x, -originOffset.y);
		points[i] = matrixTraslation.transform(points[i]);
		
		// Apply Rotation
		points[i] = matrixRotation.transform(points[i]);

		// Bring Back to Pivot
		matrixTraslation.translate(originOffset.x, originOffset.y);
		points[i] = matrixTraslation.transform(points[i]);
	}
}

function translateSquare (square, x, y) {
	var matrix = new Matrix3();
	matrix.translate(x,y);

	// Pivot transform
	square.pivot = square.pivot.add(new Vector2(x, y));

	// Points transform
	for (var i = 0; i < square.points.length; i++)
		square.points[i] = matrix.transform(square.points[i]);
}