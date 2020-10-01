export default class Vector2 {
	x: number;
	y: number;
	
	public constructor (x: number = 0, y: number = 0){
		this.x = x;
		this.y = y;
	}

	public add (other: Vector2): Vector2 {
		return  new Vector2(this.x + other.x, this.y + other.y);
	}

	public addScalar (scalar: number): Vector2 {
		return  new Vector2(this.x + scalar, this.y + scalar);
	}

	public subtract (other: Vector2): Vector2 {
		return  new Vector2(this.x - other.x, this.y - other.y);
	}

	public subtractScalar (scalar: number): Vector2 {
		return  new Vector2(this.x - scalar, this.y - scalar);
	}

	public multiply (other: Vector2): Vector2 {
		return  new Vector2(this.x * other.x, this.y * other.y);
	}

	public multiplyScalar (scalar: number): Vector2 {
		return  new Vector2(this.x * scalar, this.y * scalar);
	}

	public divide (other: Vector2): Vector2 {
		return  new Vector2(this.x / other.x, this.y / other.y);
	}

	public divideScalar (scalar: number): Vector2 {
		return  new Vector2(this.x / scalar, this.y / scalar);
	}

	public dot (other: Vector2): number {		
		return this.x * other.x + this.y * other.y;
	}

	public cross (other: Vector2): number {		
		return this.x * other.y - this.y * other.x;
	}

	public projectOnVector (other: Vector2): Vector2 {
		var scalarA = this.dot(other);
		var scalarB = other.dot(other);
		
		return other.multiplyScalar(scalarA / scalarB);
	}

	public length (): number {
		return Math.sqrt(this.lengthSqrt());
	}

	public lengthSqrt (): number {
		return this.x * this.x + this.y * this.y;
	}

	public normalize (): Vector2 {
		return this.divideScalar(this.length());
	}

	public toString (): string {
		return "(" + this.x + ", " + this.y + ")";
	}
}