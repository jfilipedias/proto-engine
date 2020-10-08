var square;

var origin;

function setup () {
	createCanvas(600, 600);

	origin = new Vector2(width/2, height/2);
	square = new Square(0, 0, 100);
	square.pivot = square.pivot.add(origin);

    var translate = new Vector2(100, 150);
    var theta = PI * 0.25;
    var scale = new Vector2(1.2, 0.5);

    // Apply TRS
    var trs = new Matrix3();
    trs.trs(translate, theta, scale);

    for (var i = 0; i < square.points.length; i++)
        square.points[i] = trs.transform(square.points[i]);
    
        
    // Apply Inverse TRS
    /* var trsInverse = new Matrix3();
    trsInverse.trsInverse(translate, theta, scale);

    for (var i = 0; i < square.points.length; i++)
        square.points[i] = trsInverse.transform(square.points[i]); */
}

function draw () {
	background(255);
	drawGrid();
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
