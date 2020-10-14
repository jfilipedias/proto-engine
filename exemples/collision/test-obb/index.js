var origin;
var cloudPoints;

function setup () {
    createCanvas(600, 600);
    
    origin = new Vector2(width * 0.5, height * 0.5);
    
    cloudPoints = createCloud(-35, 100, 50, 90, 50);
}

function draw () {
	background(255);
    drawGrid();

    var v = getMousePosition();
    stroke(35, 110, 230);
    line(origin.x, origin.y, mouseX, mouseY);

    var vHate = v.normalize();

    var n = new Vector2(-v.y, v.x);
    stroke(242, 55, 41);
    line(origin.x, origin.y, origin.x + n.x, origin.y - n.y);
    
    var nHate = n.normalize();

    drawCloud(cloudPoints);

    var projectionV = projectCloud(cloudPoints, vHate);
    var projectionN = projectCloud(cloudPoints, nHate);

    var lengthV = projectionV.max - projectionV.min;
    var medianV = (projectionV.min + projectionV.max) * 0.5;
    var centerV = vHate.multiplyScalar(medianV);

    var lengthN = projectionN.max - projectionN.min;
    var medianN = (projectionN.min + projectionN.max) * 0.5;
    var centerN = nHate.multiplyScalar(medianN);
    
    var centerX = (centerV.x + centerN.x);
    var centerY = (centerV.y + centerN.y);
    var center = new Vector2(centerX, centerY);
    
    stroke(255, 204, 0);
    circle(origin.x + centerX, origin.y - centerY, 5);
   
    var pointA = center.add((vHate.multiplyScalar(lengthV/2)).subtract(nHate.multiplyScalar(lengthN/2)));
    circle(origin.x + pointA.x, origin.y - pointA.y, 5);
    
    var pointB = center.subtract((vHate.multiplyScalar(lengthV/2)).add(nHate.multiplyScalar(lengthN/2)));
    circle(origin.x + pointB.x, origin.y - pointB.y, 5);

    var pointC = center.subtract((vHate.multiplyScalar(lengthV/2)).subtract(nHate.multiplyScalar(lengthN/2)));
    circle(origin.x + pointC.x, origin.y - pointC.y, 5);
    
    var pointD = center.add((vHate.multiplyScalar(lengthV/2)).add(nHate.multiplyScalar(lengthN/2)));
    circle(origin.x + pointD.x, origin.y - pointD.y, 5);
    
    line(origin.x + pointA.x , origin.y - pointA.y, origin.x + pointB.x, origin.y - pointB.y);
    line(origin.x + pointB.x , origin.y - pointB.y, origin.x + pointC.x, origin.y - pointC.y);
    line(origin.x + pointC.x , origin.y - pointC.y, origin.x + pointD.x, origin.y - pointD.y);
    line(origin.x + pointD.x , origin.y - pointD.y, origin.x + pointA.x, origin.y - pointA.y);
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

function createCloud (x, y, width, height, n) {
    var points = [];

    for (i = 0; i < n; i++)
        points.push(new Vector2( (x + Math.random() * width - i ), (y + Math.random() * height + i) ));

    return points;
}

function drawCloud (points) {
    stroke(30);
    for (i = 0; i < points.length; i++)
        circle(origin.x + points[i].x, origin.y - points[i].y, 2);
}

function projectCloud (points, vector) {
    var max = -Infinity;
    var min =  Infinity;

    for (i = 0; i < points.length; i++) {
        var dot = points[i].dot(vector);
        var projection = vector.multiplyScalar(dot);

        min = Math.min(min, dot);
        max = Math.max(max, dot);

        //stroke(131, 78, 204);
        //circle(origin.x + projection.x, origin.y - projection.y, 2);
    }

    //var medianDot = (min + max) * 0.5;
    //var medianVector = vector.multiplyScalar(medianDot);

    //stroke(90, 204, 78);
    //circle(origin.x + medianVector.x, origin.y - medianVector.y, 5);

    return { max, min };
}

function getMousePosition () {
    var x =  mouseX - origin.x;
    var y = -mouseY + origin.y;

    return new Vector2(x, y);
}