var origin;
var cloudPointsA;
var cloudPointsB;

function setup () {
	createCanvas(600, 600);

	origin = new Vector2(width/2, height/2);
	
	cloudPointsA = createCloud(-35, 100, 50, 90, 100);
    cloudPointsB = createCloud(0, 20, 50, 90, 100);
    //cloudPointsB = createCloud(100, 20, 50, 90, 100);	 // This dont collide
}

function draw () {
	background(255);
	drawGrid();
	
	stroke(30);
    drawCloud(cloudPointsA);

    stroke(232, 23, 110);
    drawCloud(cloudPointsB);
    
    var aabbA = new AABB(cloudPointsA);
    var aabbB = new AABB(cloudPointsB);
    
    stroke(35, 110, 230);
    if (aabbA.collides(aabbB))
        stroke(242, 55, 41);
    
    drawSquare(aabbA);

    stroke(35, 110, 230);
    if (aabbA.collides(aabbB))
        stroke(242, 55, 41);

	drawSquare(aabbB);
}

function createCloud (x, y, width, height, n) {
    var points = [];

    for (var i = 0; i < n; i++)
        points.push(new Vector2( (x + Math.random() * width - i * 0.2), (y + Math.random() * height + i * 0.2) ));

    return points;
}

function drawCloud (points) {
    for (var i = 0; i < points.length; i++)
        circle(origin.x + points[i].x, origin.y - points[i].y, 2);
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

function drawSquare (aabb) {

    if (aabb.contains(getMousePosition()))
	    stroke(30, 30, 30);

	line(origin.x + aabb.max.x, origin.y - aabb.max.y, origin.x + aabb.min.x, origin.y - aabb.max.y);
	line(origin.x + aabb.min.x, origin.y - aabb.max.y, origin.x + aabb.min.x, origin.y - aabb.min.y);
	line(origin.x + aabb.min.x, origin.y - aabb.min.y, origin.x + aabb.max.x, origin.y - aabb.min.y);
	line(origin.x + aabb.max.x, origin.y - aabb.min.y, origin.x + aabb.max.x, origin.y - aabb.max.y);
}

function getMousePosition () {
    var x =  mouseX - origin.x;
    var y = -mouseY + origin.y;

    return new Vector2(x, y);
}