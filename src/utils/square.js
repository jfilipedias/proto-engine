class Square {
    constructor (x, y, size) {
        this.x = x;
        this.y = y;
        
        this.pivot = new Vector2(this.x, this.y);

        this.size = size;

        this.points = [];
        
        // Right Top Corner
        this.points.push(new Vector2(this.x + size/2, this.y - size/2));
        // Left Top Corner
        this.points.push(new Vector2(this.x - size/2, this.y - size/2));
        // Left Bottom Corner
        this.points.push(new Vector2(this.x - size/2, this.y + size/2));
        // Right Bottom Corner
        this.points.push(new Vector2(this.x + size/2, this.y + size/2));
    }
}