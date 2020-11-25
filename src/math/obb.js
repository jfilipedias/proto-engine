class OBB {
    constructor(points) {
        if (points === undefined || points === null || points.length === 0)
            return;
            
        this.matrix = new Matrix3();

        // Local X Axis
        var u = new Vector2 (1, 0);
        
        var rotationMatrix = new Matrix3();
        rotationMatrix.rotate(Math.PI / 180);
        
        var minArea = Infinity;
        
        // Get better fit between 0 and 90 degrees
        for (var i = 0; i < 90; i++) {
            // Local Y Axis
            var v = new Vector2(-u.y, u.x)

            var projectionU = this.projectCloud(points, u); 
            var projectionV = this.projectCloud(points, v);
            
            var lengthU = projectionU.max - projectionU.min;
            var lengthV = projectionV.max - projectionV.min;

            var actualArea = lengthU * lengthV;

            // Store the better fit
            if (actualArea < minArea) {
                minArea = actualArea;

                // Get Matrix
                this.matrix.identity();
                this.matrix.rotate((i) * Math.PI / 180);
                
                // Get Extent
                this.extent = new Vector2(lengthU/2, lengthV/2);
                
                // Get Center
                var medianU = (projectionU.min + projectionU.max) * 0.5;
                var medianV = (projectionV.min + projectionV.max) * 0.5;

                var centerU = u.multiplyScalar(medianU);
                var centerV = v.multiplyScalar(medianV);
                
                this.center = new Vector2((centerU.x + centerV.x), (centerU.y + centerV.y));
            }
            
            u = rotationMatrix.transform(u);
        }
    }

    collides(other) {
        var thisPoints = this.getPoints();

        var thisEdges = [];       
        thisEdges.push(new Vector2(thisPoints[1].x - thisPoints[0].x, thisPoints[1].y - thisPoints[0].y));
        thisEdges.push(new Vector2(thisPoints[2].x - thisPoints[1].x, thisPoints[2].y - thisPoints[1].y));
        thisEdges.push(new Vector2(thisPoints[3].x - thisPoints[2].x, thisPoints[3].y - thisPoints[2].y));
        thisEdges.push(new Vector2(thisPoints[0].x - thisPoints[3].x, thisPoints[0].y - thisPoints[3].y));

        var otherPoints = other.getPoints();

        var otherEdges = [];
        otherEdges.push(new Vector2(otherPoints[1].x - otherPoints[0].x, otherPoints[1].y - otherPoints[0].y));
        otherEdges.push(new Vector2(otherPoints[2].x - otherPoints[1].x, otherPoints[2].y - otherPoints[1].y));
        otherEdges.push(new Vector2(otherPoints[3].x - otherPoints[2].x, otherPoints[3].y - otherPoints[2].y));
        otherEdges.push(new Vector2(otherPoints[0].x - otherPoints[3].x, otherPoints[0].y - otherPoints[3].y));

        var edges = thisEdges.concat(otherEdges);

        var apart = this.getSeparatingAxis(edges, thisPoints, otherPoints);
        return !apart;
    }

    collidesAABB(aabb) {
        var aabbPoints = [];
        aabbPoints.push(new Vector2(aabb.min.x, aabb.min.y));
        aabbPoints.push(new Vector2(aabb.max.x, aabb.min.y));
        aabbPoints.push(new Vector2(aabb.max.x, aabb.max.y));
        aabbPoints.push(new Vector2(aabb.min.x, aabb.max.y));

        var aabbEdges = [];
        aabbEdges.push(new Vector2(aabb.max.x - aabb.min.x, aabb.min.y));
        aabbEdges.push(new Vector2(aabb.max.x, aabb.min.y - aabb.max.y));
        aabbEdges.push(new Vector2(aabb.min.x - aabb.max.x, aabb.max.y));
        aabbEdges.push(new Vector2(aabb.min.x, aabb.max.y - aabb.min.y));

        var obbPoints = this.getPoints();

        var obbEdges = [];
        obbEdges.push(new Vector2(obbPoints[1].x - obbPoints[0].x, obbPoints[1].y - obbPoints[0].y));
        obbEdges.push(new Vector2(obbPoints[2].x - obbPoints[1].x, obbPoints[2].y - obbPoints[1].y));
        obbEdges.push(new Vector2(obbPoints[3].x - obbPoints[2].x, obbPoints[3].y - obbPoints[2].y));
        obbEdges.push(new Vector2(obbPoints[0].x - obbPoints[3].x, obbPoints[0].y - obbPoints[3].y));

        var edges  = aabbEdges.concat(obbEdges);

        var apart = this.getSeparatingAxis(edges, aabbPoints, obbPoints);
        return !apart;
    }

    contains(point) {
        var u = new Vector2(1, 0);
        u = this.matrix.transform(u);
        var v = new Vector2(-u.y, u.x)
        
        // 3 Corners
        var extentA = this.center.add((u.multiplyScalar(this.extent.x)).subtract(v.multiplyScalar(this.extent.y)));
        var extentB = this.center.subtract((u.multiplyScalar(this.extent.x)).add(v.multiplyScalar(this.extent.y)));
        var extentC = this.center.subtract((u.multiplyScalar(this.extent.x)).subtract(v.multiplyScalar(this.extent.y)));
 
        // Porject on axis
        var minU = extentA.dot(u); 
        var maxU = extentB.dot(u);
        var minV = extentA.dot(v); 
        var maxV = extentC.dot(v); 
        
        var pointInU = point.dot(u);
        var pointInV = point.dot(v);

        var apart = 
            pointInU < maxU ||
            pointInU > minU ||
            pointInV < minV ||
            pointInV > maxV;
            
        return !apart; 
    }

    projectCloud(points, vector) {
        var min = +Infinity;
        var max = -Infinity;

        for (var i = 0; i < points.length; i++) {
            var projection = points[i].dot(vector);
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        }

        return { max, min };
    }

    getPoints() {
        var u = new Vector2(1, 0);
        u = this.matrix.transform(u);
        var v = new Vector2(-u.y, u.x);

        var points = [];
        points.push(this.center.add((u.multiplyScalar(this.extent.x)).subtract(v.multiplyScalar(this.extent.y))));
        points.push(this.center.subtract((u.multiplyScalar(this.extent.x)).add(v.multiplyScalar(this.extent.y))));
        points.push(this.center.subtract((u.multiplyScalar(this.extent.x)).subtract(v.multiplyScalar(this.extent.y))));
        points.push(this.center.add((u.multiplyScalar(this.extent.x)).add(v.multiplyScalar(this.extent.y))));

        return points;
    }

    getSeparatingAxis(edges, pointsA, pointsB) {
        for (var i = 0; i < edges.length; i++) {
            var edgeNormal = edges[i].normal();
            
            var minA = +Infinity;
            var maxA = -Infinity;

            for (var j = 0; j < pointsA.length; j++) {
                var projection = edgeNormal.dot(pointsA[j]);
                minA = Math.min(minA, projection);
                maxA = Math.max(maxA, projection);
            }

            var minB = +Infinity;
            var maxB = -Infinity;

            for (var j = 0; j < pointsB.length; j++) {
                var projection = edgeNormal.dot(pointsB[j]);
                minB = Math.min(minB, projection);
                maxB = Math.max(maxB, projection);
            }

            if (maxA < minB || maxB < minA)
                return true;
        }

        return false;
    }
}