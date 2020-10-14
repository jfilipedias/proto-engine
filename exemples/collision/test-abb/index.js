var square;
var origin;

function setup () {
	createCanvas(600, 600);

	origin = new Vector2(width/2, height/2);
	squareA = new Square(100, 100, 80);
    squareA.pivot = squareA.pivot.add(origin);
    
    squareB = new Square(220, 180, 150);
    squareB.pivot = squareB.pivot.add(origin);
}

function draw () {
	background(255);
    drawGrid();
    
    var aabb1 = new AABB(squareA.points);
    var aabb2 = new AABB(squareB.points);
    
    stroke(35, 110, 230);
    if (aabb1.collides(aabb2))
        stroke(242, 55, 41);
    
    drawSquare(squareA.points);

    stroke(35, 110, 230);
    if (aabb1.collides(aabb2))
        stroke(242, 55, 41);

	drawSquare(squareB.points);
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
    var aabb = new AABB(points);

    if (aabb.contains(getMousePosition()))
	    stroke(30, 30, 30);

	line(origin.x + points[0].x, origin.y - points[0].y, origin.x + points[1].x, origin.y - points[1].y);
	line(origin.x + points[1].x, origin.y - points[1].y, origin.x + points[2].x, origin.y - points[2].y);
	line(origin.x + points[2].x, origin.y - points[2].y, origin.x + points[3].x, origin.y - points[3].y);
	line(origin.x + points[3].x, origin.y - points[3].y, origin.x + points[0].x, origin.y - points[0].y);
}

function getMousePosition () {
    var x =  mouseX - origin.x;
    var y = -mouseY + origin.y;

    return new Vector2(x, y);
}