class CircleBounding {
    constructor(points) {
        if (points === undefined || points === null || points.length === 0)
            return;

        var pointA = points[0];
        var pointB = this.pickFurthest(pointA, points);
        var pointC = this.pickFurthest(pointB, points);

        this.center = new Vector2((pointB.x + pointC.x) * 0.5, (pointB.y + pointC.y) * 0.5);
        this.radius =  this.center.distanceTo(new Vector2(pointB.x, pointB.y));
    }

    pickFurthest(vector, points) {
        var distance = 0;
        var furthest = new Vector2();
            
        for (var i = 0; i < points.length; i++) {
            if (distance >= vector.distanceTo(points[i]))
                continue;

            distance = vector.distanceTo(points[i]);
            furthest = points[i];
        }

        return furthest
    }
}