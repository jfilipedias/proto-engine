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
        var points = this.getPoints();

        var edges = [];       
        edges.push(new Vector2(points[1].x - points[0].x, points[1].y - points[0].y));
        edges.push(new Vector2(points[2].x - points[1].x, points[2].y - points[1].y));
        edges.push(new Vector2(points[3].x - points[2].x, points[3].y - points[2].y));
        edges.push(new Vector2(points[0].x - points[3].x, points[0].y - points[3].y));


        var otherPoints = other.getPoints();

        var otherEdges = [];
        otherEdges.push(new Vector2(otherPoints[1].x - otherPoints[0].x, otherPoints[1].y - otherPoints[0].y));
        otherEdges.push(new Vector2(otherPoints[2].x - otherPoints[1].x, otherPoints[2].y - otherPoints[1].y));
        otherEdges.push(new Vector2(otherPoints[3].x - otherPoints[2].x, otherPoints[3].y - otherPoints[2].y));
        otherEdges.push(new Vector2(otherPoints[0].x - otherPoints[3].x, otherPoints[0].y - otherPoints[3].y));

        var separatingAxis = this.getSeparatingAxis(edges, otherEdges);

        var apart = Boolean(separatingAxis !== null);
        return !apart;
    }

    collidesAABB(aabb) {
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

        var separatingAxis = this.getSeparatingAxis(aabbEdges, obbEdges);

        var apart = Boolean(separatingAxis !== null);
        return !apart;
    }

    contains(point) {
        var u = new Vector2(1, 0);
        u = this.matrix.transform(u);
        var v = new Vector2(-u.y, u.x)
        
        // 3 Corners
        var extentA = obb.center.add((u.multiplyScalar(obb.extent.x)).subtract(v.multiplyScalar(obb.extent.y)));
        var extentB = obb.center.subtract((u.multiplyScalar(obb.extent.x)).add(v.multiplyScalar(obb.extent.y)));
        var extentC = obb.center.subtract((u.multiplyScalar(obb.extent.x)).subtract(v.multiplyScalar(obb.extent.y)));
 
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
        var max = -Infinity;
        var min =  Infinity;

        for (var i = 0; i < points.length; i++) {
            var dot = points[i].dot(vector);
            min = Math.min(min, dot);
            max = Math.max(max, dot);
        }

        return { max, min };
    }

    getPoints() {
        var points = [];
        points.push(obb.center.add((u.multiplyScalar(obb.extent.x)).subtract(v.multiplyScalar(obb.extent.y))));
        points.push(obb.center.subtract((u.multiplyScalar(obb.extent.x)).add(v.multiplyScalar(obb.extent.y))));
        points.push(obb.center.subtract((u.multiplyScalar(obb.extent.x)).subtract(v.multiplyScalar(obb.extent.y))));
        points.push(obb.center.add((u.multiplyScalar(obb.extent.x)).add(v.multiplyScalar(obb.extent.y))));

        return points;
    }

    getSeparatingAxis(edgesA, edgesB) {
        var edges = edgesA.concat(edgesB);

        for (var i = 0; i < edges.length; i++) {
            var separatingAxis = new Vector2(edges.y, -edges.x);
            
            var minA = +Infinity;
            var maxA = -Infinity;

            for (var j = 0; j < edgesA.length; j++) {
                var projection = edgesA.dot(separatingAxis);

                minA = min(minA, projection);
                maxA = max(maxA, projection);
            }

            var minB = +Infinity;
            var maxB = -Infinity;

            for (var j = 0; j < edgesB.length; j++) {
                var projection = edgesB.dot(separatingAxis);

                minB = min(minB, projection);
                maxB = max(maxB, projection);
            }

            if (maxA < minB || maxB < minA)
                return separatingAxis;
        }

        return null;
    }
}