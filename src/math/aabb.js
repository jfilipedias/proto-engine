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
        var aabbEdges = [];
        aabbEdges.push(new Vector2(this.max.x - this.min.x, this.min.y));
        aabbEdges.push(new Vector2(this.max.x, this.min.y - this.max.y));
        aabbEdges.push(new Vector2(this.min.x - this.max.x, this.max.y));
        aabbEdges.push(new Vector2(this.min.x, this.max.y - this.min.y));

        var obbPoints = obb.getPoints();

        var obbEdges = [];
        obbEdges.push(new Vector2(obbPoints[1].x - obbPoints[0].x, obbPoints[1].y - obbPoints[0].y));
        obbEdges.push(new Vector2(obbPoints[2].x - obbPoints[1].x, obbPoints[2].y - obbPoints[1].y));
        obbEdges.push(new Vector2(obbPoints[3].x - obbPoints[2].x, obbPoints[3].y - obbPoints[2].y));
        obbEdges.push(new Vector2(obbPoints[0].x - obbPoints[3].x, obbPoints[0].y - obbPoints[3].y));

        return !apart;
    } 

    contains(vector) {
        return vector.x >= this.min.x
            && vector.x <= this.max.x
            && vector.y >= this.min.y
            && vector.y <= this.max.y; 
    }
}