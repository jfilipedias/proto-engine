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

                this.matrix.identity();
                this.matrix.rotate((i) * Math.PI / 180);

                this.center = this.getCenter(vector, normal, projectionV, projectionN);
            }
            
            vector = rotationMatrix.transform(vector);
        }
    }
    
    getCenter(vector, normal, projectionV, projectionN) {      
        var medianV = (projectionV.min + projectionV.max) * 0.5;
        var medianN = (projectionN.min + projectionN.max) * 0.5;

        var centerV = vector.multiplyScalar(medianV);
        var centerN = normal.multiplyScalar(medianN);

        return new Vector2((centerV.x + centerN.x), (centerV.y + centerN.y));
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