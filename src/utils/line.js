class Line {
    constructor (start, end) {
        this.start = start;
        this.end = end;
    }

    intersectLine (other) {        
        var a = this.start;
        var b = this.end;
        var c = other.start;
        var d = other.end;

        var ab = b.subtract(a);
        var ac = c.subtract(a);
        var ad = d.subtract(a);
        var ca = a.subtract(c);
        var cb = b.subtract(c);
        var cd = d.subtract(c);

        var intersectionCDAB = Math.sign(ab.cross(ac)) ^ Math.sign(ab.cross(ad));
        var intersectionABCD = Math.sign(cd.cross(ca)) ^ Math.sign(cd.cross(cb));
        var intersect = intersectionCDAB && intersectionABCD
 
        if (intersect) {            
            var t = ac.dot(cd.normal()) / ab.dot(cd.normal());

            return this.start.lerp(this.end, t);
        }
        else if (ab.cross(ac) === 0 && ab.cross(ad) === 0 && cd.cross(ca) === 0 && cd.cross(cb) === 0) {
            var projectionABAC = ab.dot(ac) / ab.length();
            var projectionABAD = ab.dot(ad) / ab.length();

            var min = Math.min(projectionABAC, projectionABAD);
            var max = Math.max(projectionABAC, projectionABAD);

            if (min < ab.length() && max > 0)
                return NaN;
        }
        
        return null;
    }
}

