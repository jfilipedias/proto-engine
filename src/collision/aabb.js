class AABB {
    constructor (vectors) {
        this.min = new Vector2();
        this.max = new Vector2();

        if (vectors.length <= 0)
            return;
        
        for (var i = 0; i < vectors.length; i++) {
            this.min.x = Math.min(this.min.x, vectors[i].x);
            this.min.y = Math.max(this.min.y, vectors[i].y);    // Screen Y coordinate is inverted

            this.max.x = Math.max(this.max.x, vectors[i].x);
            this.max.y = Math.min(this.max.y, vectors[i].y);    // Screen Y coordinate is inverted
        }
    }
}