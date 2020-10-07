class Line {
    constructor (start, end) {
        this.start = start;
        this.end = end;
    }

    intersectLine (other) {        
        var ab = this.end.subtract(this.start);
        var ac = other.start.subtract(this.start);
        var ad = other.end.subtract(this.start);
        var ca = this.start.subtract(other.start);
        var cb = this.end.subtract(other.start);
        var cd = other.end.subtract(other.start);

        if (ab.cross(ac) * ab.cross(ad) >= 0 || cd.cross(ca) * cd.cross(cb) >= 0)
            return null;

        var otherNormal = new Vector2(-cd.y, cd.x);

        var ba = this.end.subtract(this.start);
        var t = ac.dot(otherNormal) / ab.dot(otherNormal);

        return this.start.lerp(this.end, t);
    }
}