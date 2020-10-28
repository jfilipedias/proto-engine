var origin;
var cloudPoints;
var obb;

function setup () {
    createCanvas(600, 600);
    
    origin = new Vector2(width * 0.5, height * 0.5);
    
    cloudPoints = createCloud(-35, 100, 50, 90, 100);

    obb = new OBB(cloudPoints);
}

function draw () {
	background(255);
    drawGrid();

    drawCloud(cloudPoints);

    stroke(35, 110, 230); // Blue
    if (obb.contains(getMousePosition()))
        stroke(255, 204, 0); // Yellow
    
    drawOBB(obb);
}

function createCloud (x, y, width, height, n) {
    var points = [];

    for (var i = 0; i < n; i++)
        points.push(new Vector2( (x + Math.random() * width - i ), (y + Math.random() * height + i) ));

    return points;
}

function drawCloud (points) {
    stroke(30);
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

function drawOBB (obb) {
    var u = new Vector2(1, 0);
    u = obb.matrix.transform(u);
    var v = new Vector2(-u.y, u.x);

    var obbPoints = obb.getPoints();
    
    line(origin.x + obbPoints[0].x , origin.y - obbPoints[0].y, origin.x + obbPoints[1].x, origin.y - obbPoints[1].y);
    line(origin.x + obbPoints[1].x , origin.y - obbPoints[1].y, origin.x + obbPoints[2].x, origin.y - obbPoints[2].y);
    line(origin.x + obbPoints[2].x , origin.y - obbPoints[2].y, origin.x + obbPoints[3].x, origin.y - obbPoints[3].y);
	line(origin.x + obbPoints[3].x , origin.y - obbPoints[3].y, origin.x + obbPoints[0].x, origin.y - obbPoints[0].y);
}

function getMousePosition () {
    var x =  mouseX - origin.x;
    var y = -mouseY + origin.y;

    return new Vector2(x, y);
}

function projectCloud (points, vector) {
    var max = -Infinity;
    var min =  Infinity;

    for (var i = 0; i < points.length; i++) {
        var dot = points[i].dot(vector);

        min = Math.min(min, dot);
        max = Math.max(max, dot);
    }
    return { max, min };
}
