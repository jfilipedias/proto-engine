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
        var aabbCenter = this.min.add(this.max).multiplyScalar(0.5);
 
        // AABB Axis
        var x = new Vector2(1, 0);
        var y = new Vector2(0, 1);

        // OBB Axis
        var u = obb.matrix.transform(x);        // OBB X Axis
        var v = new Vector2(-obbX.y, obbX.x);   // OBB Y Axis

        // Checking separation on X axis
        var distanceX = Math.abs(aabbCenter.x + obb.center.x);
        var aabbRadiusProjectionX = Math.abs(aabbCenter.x + this.max.X);
        var obbRadiusProjectionX = obb.extent.x * u.projectOnVector(x).length() + obb.extent.y * v.projectOnVector(x).length();

        var apartX = aabbRadiusProjectionX + obbRadiusProjectionX > distanceX;

        // Checking separation on Y axis
        var distanceY = Math.abs(aabbCenter.y + obb.center.y);
        var aabbRadiusProjectionY = Math.abs(aabbCenter.y + this.max.y);
        var obbRadiusProjectionY = obb.extent.x * u.projectOnVector(y).length() + obb.extent.y * v.projectOnVector(y).length()
        
        var apartY = aabbRadiusProjectionY + obbRadiusProjectionY > distanceY;

        // Rotate to OBB space
        var inverseRotation = obb.matrix.transpose();

        // Checking separation on U axis
        var distanceU = aabbCenter.projectOnVector(u).add(obb.center.projectOnVector(u)).length();
        var aabbRadiusProjectionU = aabbCenter.projectOnVector(u).add(aabb.max.projectOnVector(u)).length();
        var obbRadiusProjectionU = obb.center.projectOnVector(u).add(obb.extent.projectOnVector(u)).length();
        
        var apartU = aabbRadiusProjectionU + obbRadiusProjectionU > distanceU;

        // Checking separation on V axis
        var distanceV = aabbCenter.projectOnVector(v).add(obb.center.projectOnVector(v)).length();
        var aabbRadiusProjectionV = aabbCenter.projectOnVector(v).add(aabb.max.projectOnVector(v)).length();
        var obbRadiusProjectionV = obb.center.projectOnVector(v).add(obb.extent.projectOnVector(v)).length();

        var apartV = aabbRadiusProjectionV + obbRadiusProjectionV > distanceV;

        var apart = apartX || apartY || apartU || apartV;

        return !apart;
    } 

    contains(vector) {
        return vector.x >= this.min.x
            && vector.x <= this.max.x
            && vector.y >= this.min.y
            && vector.y <= this.max.y; 
    }
}