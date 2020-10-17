class AABB {
    constructor(points) {
        if (points === undefined || points === null || points.length === 0)
            return;

        this.min = new Vector2( Infinity,  Infinity);
        this.max = new Vector2(-Infinity, -Infinity);
            
        for (var i = 0; i < points.length; i++) {
            var vector = points[i];

            this.min.x = Math.min(this.min.x, vector.x);
            this.min.y = Math.min(this.min.y, vector.y);

            this.max.x = Math.max(this.max.x, vector.x);
            this.max.y = Math.max(this.max.y, vector.y);
        }
    }

    collides(other) {
        var apart = 
            this.min.x > other.max.x ||
            this.min.y > other.max.y ||
            this.max.x < other.min.x ||
            this.max.y < other.min.y;
        
        return !apart;
    }

    collidesOBB(obb) {
        var aabbCenter = this.min.add(this.max).divideScalar(2);
        
        // Checking separation on X axis
        var x = new Vector2(1, 0);
        var distanceX = Math.abs(aabbCenter.x + obb.center.x);

        var aabbRadiusX = Math.abs(aabbCenter.x + this.max.X);
        var obbRadiusX = Math.abs(obb.center.dot(x) + obb.extent.dot(x)); // Need correction

        var apartX = aabbRadiusX + obbRadiusX > distanceX;

        // Checking separation on Y axis
        var y = new Vector2(0, 1);
        var distanceY = Math.abs(aabbCenter.y + obb.center.y);

        var aabbRadiusY = Math.abs(aabbCenter.y + this.max.y);
        var obbRadiusY = Math.abs(obb.center.dot(y) + topCorner.dot(y)); // Need correction
        
        var apartY = aabbRadiusY + obbRadiusY > distanceY;

        console.log(apartX, apartY);

        var apart = apartX || apartY;

        return !apart;
    } 

    contains(vector) {
        return vector.x >= this.min.x
            && vector.x <= this.max.x
            && vector.y >= this.min.y
            && vector.y <= this.max.y; 
    }
}