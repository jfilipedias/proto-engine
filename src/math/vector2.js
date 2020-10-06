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
   
    cross(other) {
        return this.x * other.y - this.y * other.x;
    }

    distanceTo(other) {
        var distance = this.subtract(other);
        
        return Math.sqrt(distance.lengthSqrt());
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
   
    length() {
        return Math.sqrt(this.lengthSqrt());
    }
   
    lengthSqrt() {
        return this.x * this.x + this.y * this.y;
    }
   
    normalize() {
        return this.divideScalar(this.length());
    }
   
    multiply(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }
   
    multiplyScalar(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
   
    projectOnVector(other) {
        var scalarA = this.dot(other);
        var scalarB = other.dot(other);
        return other.multiplyScalar(scalarA / scalarB);
    }
   
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
   
    subtractScalar(scalar) {
        return new Vector2(this.x - scalar, this.y - scalar);
    }
   
    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }
}
