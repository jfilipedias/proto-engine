var clouds = [];
var cloudsColors = [];
var obbs = [];
var origin;
var pointsBuffer =[];

function setup () {
    createCanvas(600, 600);
    
    origin = new Vector2(width * 0.5, height * 0.5);
}

function draw () {
	background(255);
    drawGrid();

    drawBuffer();
    drawClouds();
    //drawOBBs();
}

function clearAll () {
    aabbs = [];
    clouds = [];
    pointsBuffer = [];
}

function drawBuffer () {
    if (pointsBuffer.length === 0) return;

    stroke (30, 30, 30);
    fill (30, 30, 30);
    for (var i = 0; i < pointsBuffer.length; i++)
        circle(origin.x + pointsBuffer[i].x, origin.y - pointsBuffer[i].y, 2);
}

function drawClouds () {
    if (clouds.length === 0) return;

    for (var i = 0; i < clouds.length; i++) {
        var currentCloud = clouds[i];

        var r = cloudsColors[i][0];
        var g = cloudsColors[i][1];
        var b = cloudsColors[i][2];
        
        fill(r, g, b);
        stroke (r, g, b);
 
        for (var j = 0; j < currentCloud.length; j++)  
            circle(origin.x + currentCloud[j].x, origin.y - currentCloud[j].y, 2);
    }
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

// TODO: refactor
function drawOBBs () {
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

function keyPressed () {
    if (keyCode === 13)
        setCloud();
    
    if (keyCode === 27)
        clearAll();
}

function mouseClicked () {
    var mousePosition = getMousePosition();

    if (mousePosition.x < -origin.x || mousePosition.x > origin.x || mousePosition.y < -origin.y || mousePosition.y > origin.y) 
        return;
        
    pointsBuffer.push(mousePosition);
}

function setCloud () {
    clouds.push(pointsBuffer);

    var r = random(240);
    var g = random(240);
    var b = random(240); 

    cloudsColors.push([r, g, b]);

    var aabb = new AABB(pointsBuffer);
    aabbs.push(aabb);

    pointsBuffer = [];
}
