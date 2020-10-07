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

        var intersectionCDAB = Math.sign(ab.cross(ac)) ^ Math.sign(ab.cross(ad));
        var intersectionABCD = Math.sign(cd.cross(ca)) ^ Math.sign(cd.cross(cb));
        var intersect = intersectionCDAB && intersectionABCD

        /* console.log(Math.sign(ab.cross(ac)) + " ^ " + Math.sign(ab.cross(ad)) + " = " + intersectionCDAB + "   " +
                    Math.sign(cd.cross(ca)) + " ^ " + Math.sign(cd.cross(cb)) + " = " + intersectionABCD); */
 
        if (!intersect)
            return null;

        var t = ac.dot(cd.normal()) / ab.dot(cd.normal());

        return this.start.lerp(this.end, t);
    }
}