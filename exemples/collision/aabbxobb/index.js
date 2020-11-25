var clouds = [];
var cloudsColors = [];
var aabbs = [];
var isAABBTime = false;
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

    drawAABBs();
    drawBuffer();
    drawClouds();
    drawOBBs();
    drawText();
}

function clearAll () {
    aabbs = [];
    obbs = [];
    clouds = [];
    pointsBuffer = [];
}

// Need a review
function drawAABBs () {
    if (aabbs.length === 0) return;
    
    for (var i = 0; i < aabbs.length; i++) {
        var collides = false;
        var currentAABB = aabbs[i];
        
        var others = aabbs.filter( function (aabb) {
            var equal = Object.is(currentAABB, aabb);
            return !equal;
        });

        for (var j = 0; j < others.length; j++) {
            collides = currentAABB.collides(others[j]);

            if (collides) break;
        }            
    
        stroke(35, 110, 230);       // Blue
        
        if (collides)
            stroke(242, 55, 41);    // Red
        
        if (currentAABB.contains(getMousePosition()))
    		stroke(255, 204, 0);    // Yellow

        line(origin.x + currentAABB.max.x, origin.y - currentAABB.max.y, origin.x + currentAABB.min.x, origin.y - currentAABB.max.y);
        line(origin.x + currentAABB.min.x, origin.y - currentAABB.max.y, origin.x + currentAABB.min.x, origin.y - currentAABB.min.y);
        line(origin.x + currentAABB.min.x, origin.y - currentAABB.min.y, origin.x + currentAABB.max.x, origin.y - currentAABB.min.y);
        line(origin.x + currentAABB.max.x, origin.y - currentAABB.min.y, origin.x + currentAABB.max.x, origin.y - currentAABB.max.y);
    }
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

// Need a review
function drawOBBs () {
    if (obbs.length === 0) return;

    for (var i = 0; i < obbs.length; i++) {
        var collides = false;
        var currentOBB = obbs[i];

        var others = obbs.filter( function (obb) {
            var equal = Object.is(currentOBB, obb);
            return !equal;
        });

        for (var j = 0; j < others.length; j++) {
            collides = currentOBB.collides(others[j]);

            if (collides) break;
        }            
    
        stroke(35, 110, 230);       // Blue
        
        if (collides)
            stroke(242, 55, 41);    // Red
        
        if (currentOBB.contains(getMousePosition()))
    		stroke(255, 204, 0);    // Yellow

        var obbPoints = currentOBB.getPoints();
        
        line(origin.x + obbPoints[0].x , origin.y - obbPoints[0].y, origin.x + obbPoints[1].x, origin.y - obbPoints[1].y);
        line(origin.x + obbPoints[1].x , origin.y - obbPoints[1].y, origin.x + obbPoints[2].x, origin.y - obbPoints[2].y);
        line(origin.x + obbPoints[2].x , origin.y - obbPoints[2].y, origin.x + obbPoints[3].x, origin.y - obbPoints[3].y);
        line(origin.x + obbPoints[3].x , origin.y - obbPoints[3].y, origin.x + obbPoints[0].x, origin.y - obbPoints[0].y);
    }
}

function drawText () {
    var boundBoxType = 'OBB';

    if (isAABBTime)
        boundBoxType = 'AABB';

    noStroke()
    fill(30);
    textSize(16);
    text(`Draw point for an ${boundBoxType}`, 10, 30);
}

function getMousePosition () {
    var x =  mouseX - origin.x;
    var y = -mouseY + origin.y;

    return new Vector2(x, y);
}

function keyPressed () {
    var enterCode = 13;
    var escCode = 27;

    if (keyCode === enterCode)
        setCloud();
    
    if (keyCode === escCode)
        clearAll();
}

function mouseClicked () {
    var mousePosition = getMousePosition();

    if (mousePosition.x < -origin.x || mousePosition.x > origin.x || mousePosition.y < -origin.y || mousePosition.y > origin.y) 
        return;
        
    pointsBuffer.push(mousePosition);
}

function setCloud () {
    if (pointsBuffer.length < 3) return;
    
    clouds.push(pointsBuffer);

    var r = random(240);
    var g = random(240);
    var b = random(240); 

    cloudsColors.push([r, g, b]);

    if (isAABBTime) {
        var aabb = new AABB(pointsBuffer);
        aabbs.push(aabb);
    } else {
        var obb = new OBB(pointsBuffer);
        obbs.push(obb);    
    }

    isAABBTime = !isAABBTime;
    
    pointsBuffer = [];
}
