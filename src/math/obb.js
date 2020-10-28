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
}