class OBB {
    constructor(points) {
        if (points === undefined || points === null || points.length === 0)
            return;
            
        this.matrix = new Matrix3();

        var vector = new Vector2 (1, 0);
        
        var rotationMatrix = new Matrix3();
        rotationMatrix.rotate(Math.PI / 180);
        
        var minArea = Infinity;
        
        // Get better fit between 0 and 90 degrees
        for (var i = 0; i < 90; i++) {
            var normal = new Vector2(-vector.y, vector.x)

            var projectionV = this.projectCloud(points, vector); 
            var projectionN = this.projectCloud(points, normal);
            
            var lengthV = projectionV.max - projectionV.min;
            var lengthN = projectionN.max - projectionN.min;

            var actualArea = lengthV * lengthN;

            if (actualArea < minArea) {
                minArea = actualArea;

                // Get Matrix
                this.matrix.identity();
                this.matrix.rotate((i) * Math.PI / 180);
                
                // Get Extent
                this.extent = new Vector2(lengthV/2, lengthN/2);
                
                // Get Center
                var medianV = (projectionV.min + projectionV.max) * 0.5;
                var medianN = (projectionN.min + projectionN.max) * 0.5;

                var centerV = vector.multiplyScalar(medianV);
                var centerN = normal.multiplyScalar(medianN);
                
                this.center = new Vector2((centerV.x + centerN.x), (centerV.y + centerN.y));
            }
            
            vector = rotationMatrix.transform(vector);
        }
    }

    contains(point) {
        var vector = new Vector2(1, 0);
        vector = this.matrix.transform(vector);
        var normal = new Vector2(-vector.y, vector.x)
        
        // 3 Corners
        var extentA = obb.center.add((vector.multiplyScalar(obb.extent.x)).subtract(normal.multiplyScalar(obb.extent.y)));
        var extentB = obb.center.subtract((vector.multiplyScalar(obb.extent.x)).add(normal.multiplyScalar(obb.extent.y)));
        var extentC = obb.center.subtract((vector.multiplyScalar(obb.extent.x)).subtract(normal.multiplyScalar(obb.extent.y)));
 
        // Porject on axis
        var minV = extentA.dot(vector); 
        var maxV = extentB.dot(vector);
        var minN = extentA.dot(normal); 
        var maxN = extentC.dot(normal); 
        
        var pointInV = point.dot(vector);
        var pointInN = point.dot(normal);

        var apart = 
            pointInV < maxV ||
            pointInV > minV ||
            pointInN < minN ||
            pointInN > maxN;
            
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
}