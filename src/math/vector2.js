class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
   
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
   
    addScalar(scalar) {
        return new Vector2(this.x + scalar, this.y + scalar);
    }
   
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
   
    subtractScalar(scalar) {
        return new Vector2(this.x - scalar, this.y - scalar);
    }
   
    multiply(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
   
    multiplyScalar(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
   
    divide(other) {
        return new Vector2(this.x / other.x, this.y / other.y);
    }
   
    divideScalar(scalar) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }
   
    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
   
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }
   
    projectOnVector(other) {
        var scalarA = this.dot(other);
        var scalarB = other.dot(other);
        return other.multiplyScalar(scalarA / scalarB);
    }
   
    length() {
        return Math.sqrt(this.lengthSqrt());
    }
   
    lengthSqrt() {
        return this.x * this.x + this.y * this.y;
    }

    distanceTo(other) {
        var distance = this.subtract(other);
        
        return Math.sqrt(distance.lengthSqrt());
    }
   
    normalize() {
        return this.divideScalar(this.length());
    }
   
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}
