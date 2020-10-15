class CircleBounding {
    constructor(points) {
        if (points === undefined || points === null || points.length === 0)
            return;
        
        var pointA = points[0];
        var pointB = this.pickFurthest(pointA, points);
        var pointC = this.pickFurthest(pointB, points);
        var pointD = this.pickFurthest(pointC, points);
        var pointE = this.pickFurthest(pointD, points);

        this.center = new Vector2((pointD.x + pointE.x) * 0.5, (pointD.y + pointE.y) * 0.5);
        this.radius =  this.center.distanceTo(new Vector2(pointE.x, pointE.y));
    }

    collides(other) {
        return this.center.distanceTo(other.center) <= this.radius + other.radius;
    }
    
    contains(vector) {
        return this.center.distanceTo(vector) <=this.radius; 
    }

    pickFurthest(vector, points) {
        var futhestDistance = -Infinity;
        var furthestPoint = new Vector2();
            
        for (var i = 0; i < points.length; i++) {
            if (vector.distanceTo(points[i]) < futhestDistance)
                continue;

            futhestDistance = vector.distanceTo(points[i]);
            furthestPoint = points[i];
        }

        return furthestPoint
    }
}