class OBB {
    constructor(points) {
        this.matrix = new Matrix3();

        var vector = new Vector2 (1, 0);
        
        var rotationMatrix = new Matrix3();
        rotationMatrix.rotate(Math.PI / 180);
        
        var minArea = Infinity;
        
        // Get better fit
        for (var i = 0; i < 90; i++) {
            console.log('Running...');

            vector = rotationMatrix.transform(vector);
            var normal = new Vector2(-vector.x, vector.y)

            var projectionV = this.projectCloud(points, vector); 
            var projectionN = this.projectCloud(points, normal);
            
            var lengthV = projectionV.max - projectionV.min;
            var lengthN = projectionN.max - projectionN.min;

            var actualArea = lengthV * lengthN;

            if (actualArea <= minArea) {
                minArea = actualArea;

                this.matrix.identity();
                this.matrix.rotate((i+1) * Math.PI / 180);
            }
        }

        var vector = this.matrix.transform(new Vector2 (1, 0));
        console.log(vector.toString());
        
        var normal = new Vector2(-vector.y, vector.x);

        var projectionV = this.projectCloud(points, vector); 
        var projectionN = this.projectCloud(points, normal);

        var lengthV = projectionV.max - projectionV.min;
        var lengthN = projectionN.max - projectionN.min;

        this.center = this.getCenter(vector, normal, projectionV, projectionN);
        
        this.extent = new Vector2(lengthV/2, lengthN/2);
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