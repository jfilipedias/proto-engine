var origin;
var cloudPointsA;
var cloudPointsB;
var boundingCircleA;
var boundingCircleB;

function setup () {
    createCanvas(600, 600);
    
    origin = new Vector2(width * 0.5, height * 0.5);
    
    cloudPointsA = createCloud(-35, 100, 50, 90, 100);
    cloudPointsB = createCloud(0, 20, 50, 90, 100);
    //cloudPointsB = createCloud(100, 20, 50, 90, 100);   // This dont collide 
    
    boundingCircleA = new BoundingCirle(cloudPointsA);
    boundingCircleB = new BoundingCirle(cloudPointsB);
}

function draw () {
	background(255);
    drawGrid();
    
    stroke(30);
    drawCloud(cloudPointsA);

    stroke(232, 23, 110);
    drawCloud(cloudPointsB);

    noFill();
    stroke(35, 110, 230); // Blue
    if(boundingCircleA.collides(boundingCircleB))   
        stroke(242, 55, 41); // Red

    // Circle A
    drawCircle(boundingCircleA);

    stroke(35, 110, 230); // Blue
    if(boundingCircleA.collides(boundingCircleB))   
        stroke(242, 55, 41); // Red

    // Circle B
    drawCircle(boundingCircleB);
}

function drawCircle(circleBounding) {
    if(circleBounding.contains(getMousePosition()))   
        stroke(255, 204, 0); // Yellow

    circle(origin.x + circleBounding.center.x, origin.y - circleBounding.center.y, circleBounding.radius * 2);
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

function drawBouding (boundingCircle) {
    var vector = new Vector2(1, 0);
    vector = boundingCircle.matrix.transform(vector);
    normal = new Vector2(-vector.y, vector.x);

    var projectionV = projectCloud(cloudPoints, vector);
    var projectionN = projectCloud(cloudPoints, normal);

    var lengthV = projectionV.max - projectionV.min;
    var lengthN = projectionN.max - projectionN.min;
    
    var pointA = boundingCircle.center.add((vector.multiplyScalar(lengthV/2)).subtract(normal.multiplyScalar(lengthN/2)));
    var pointB = boundingCircle.center.subtract((vector.multiplyScalar(lengthV/2)).add(normal.multiplyScalar(lengthN/2)));
    var pointC = boundingCircle.center.subtract((vector.multiplyScalar(lengthV/2)).subtract(normal.multiplyScalar(lengthN/2)));
    var pointD = boundingCircle.center.add((vector.multiplyScalar(lengthV/2)).add(normal.multiplyScalar(lengthN/2)));
    
    
    line(origin.x + pointA.x , origin.y - pointA.y, origin.x + pointB.x, origin.y - pointB.y);
    line(origin.x + pointB.x , origin.y - pointB.y, origin.x + pointC.x, origin.y - pointC.y);
    line(origin.x + pointC.x , origin.y - pointC.y, origin.x + pointD.x, origin.y - pointD.y);
    line(origin.x + pointD.x , origin.y - pointD.y, origin.x + pointA.x, origin.y - pointA.y);
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
