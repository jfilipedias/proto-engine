var origin;

var lineA;
var lineB;

var points = [];

function setup () {
	createCanvas(600, 600);
	origin = new Vector2(width/2, height/2);
}

function draw () {
	background(255);
    drawGrid();

	// Line Preview
    if (points.length === 1 || points.length === 3)
        drawPreview(points[points.length - 1]);
	
	// Line AB
    if (points.length > 1 ) {
		drawLine(lineA.start, lineA.end);
		noStroke();
		text('A', lineA.start.x - 20, lineA.start.y - 20);
		text('B', lineA.end.x   + 20, lineA.end.y   - 20);
	}

	// Line CD
    if (points.length > 3) {
		drawLine(lineB.start, lineB.end);
		noStroke();
		text('C', lineB.start.x - 20, lineB.start.y - 20);
		text('D', lineB.end.x   + 20, lineB.end.y   - 20);
	}	

	if ( points.length < 4 ) return;

	var intersectionPoint = lineA.intersectLine(lineB);

	if (intersectionPoint === null) return;
	
	text('Intersect', 20, 20);
	fill(30, 30, 30);
	//circle(intersectionPoint.x, intersectionPoint.y, 10);
	//console.log(intersectionPoint);
}

function drawGrid () {
	stroke(30, 30, 30);
	strokeWeight(1);
	
	// Grid Y axis
	line(origin.x, 0, origin.x, height);
	line(origin.x, 0, origin.x - 5, 7);
	line(origin.x, 0, origin.x + 5, 7);
	
	fill(30, 30, 30);
	text("Y", origin.x - 20, 10);

	// Grid X axis
	line(0, origin.y, width, origin.y);  
	line(width - 7, origin.y - 5, width, origin.y);
	line(width - 7, origin.y + 5, width, origin.y);
	
	fill(30, 30, 30);
	text("X", width - 10, origin.y + 20);
}

function drawLine (start, end) {
	stroke(35, 110, 230);
	strokeWeight(2);
    line(start.x, start.y, end.x, end.y);
}

function drawPreview (start) {
	stroke(180, 180, 180);
	strokeWeight(1);
    line(start.x, start.y, mouseX, mouseY);
}

function mousePressed () {
    if (mouseX >= 0 && mouseX <= width 
     && mouseY >= 0 && mouseY <= height)
            points.push(new Vector2(mouseX, mouseY));
        
    if (points.length === 2)
        lineA = new Line(points[0], points[1]);

    if (points.length === 4)
        lineB = new Line(points[2], points[3]);
}