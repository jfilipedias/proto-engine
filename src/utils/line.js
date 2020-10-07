class Line {
    constructor (start, end) {
        this.start = start;
        this.end = end;
    }

    intersectLine (other) {        
        var ab = this.start.subtract(this.end);
        var ac = this.start.subtract(other.start);
        var ad = this.start.subtract(other.end);
        var ca = other.start.subtract(this.start);
        var cb = other.start.subtract(this.end);
        var cd = other.start.subtract(other.end);

        if (ab.cross(ac) * ab.cross(ad) >= 0 || cd.cross(ca) * cd.cross(cb) >= 0)
            return null;

        var otherNormal = new Vector2(-other.start.y, other.start.x);

        var ba = this.end.subtract(this.start);
        
        console.log(ca.dot(otherNormal) + ba.dot(otherNormal));
        
        return ca.dot(otherNormal) / ba.dot(otherNormal);
    }
}