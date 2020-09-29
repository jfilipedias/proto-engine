export class Vector2 {
	x: number;
	y: number;
	
	constructor (x: number = 0, y: number = 0){
		this.x = x;
		this.y = y;
	}

	add (otherVector: Vector2): Vector2 {
		return  new Vector2(this.x + otherVector.x, this.y + otherVector.y);
	}

	addScalar (scalar: number): Vector2 {
		return  new Vector2(this.x + scalar, this.y + scalar);
	}

	subtract (otherVector: Vector2): Vector2 {
		return  new Vector2(this.x - otherVector.x, this.y - otherVector.y);
	}

	subtractScalar (scalar: number): Vector2 {
		return  new Vector2(this.x - scalar, this.y - scalar);
	}

	multiply (otherVector: Vector2): Vector2 {
		return  new Vector2(this.x * otherVector.x, this.y * otherVector.y);
	}

	multiplyScalar (scalar: number): Vector2 {
		return  new Vector2(this.x * scalar, this.y * scalar);
	}

	divide (otherVector: Vector2): Vector2 {
		return  new Vector2(this.x / otherVector.x, this.y / otherVector.y);
	}

	divideScalar (scalar: number): Vector2 {
		return  new Vector2(this.x / scalar, this.y / scalar);
	}

	dot (otherVector: Vector2): number {		
		return this.x * otherVector.x + this.y * otherVector.y;
	}

	cross (otherVector: Vector2): number {		
		return this.x * otherVector.y - this.y * otherVector.x;
	}

	length (): number {
		return Math.sqrt(this.lengthSqrt());
	}

	lengthSqrt (): number {
		return this.x * this.x + this.y * this.y;
	}

	normalize (): Vector2 {
		return this.divideScalar(this.length());
	}

	toString (): string {
		return "(" + this.x + ", " + this.y + ")";
	}
}