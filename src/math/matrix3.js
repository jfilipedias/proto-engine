class Matrix3 {
    constructor() {
        this.elements = [];
        this.identity();
    }

    // Collum-Major notation
    identity() {
        this.elements = [
            1, 0, 0,        // 1st collum
            0, 1, 0,        // 2nd collum
            0, 0, 1,        // 3rd collum
        ];
    }
    
    transform(other) {
        var te = this.elements;
        var vector = new Vector2(
            te[0] * other.x + te[3] * other.y + te[6], 
            te[1] * other.x + te[4] * other.y + te[7]);
        
        var vectorW = te[2] * other.x + te[5] * other.y + te[8];
        
        if (vectorW != 0) {
            vector.x /= vectorW;
            vector.y /= vectorW;
        }
        
        return vector;
    }
    
    translate(x, y) {
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            x, y, 1,
        ];
    }
    
    scale(x, y) {
        this.elements = [
            x, 0, 0,
            0, y, 0,
            0, 0, 1,
        ];
    }
    
    rotate(theta) {
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        
        this.elements = [
             cos, sin, 0,
            -sin, cos, 0,
               0,   0, 1,
        ];
    }
    
    trs(translate, tetha, scale) {
        var tx = translate.x;
        var ty = translate.y;

        var cos = Math.cos(tetha);
        var sin = Math.sin(tetha);

        var sx = scale.x;
        var sy = scale.y;

        this.elements = [
            sx *  cos, sx * sin, 0,
            sy * -sin, sy * cos, 0,
                   tx,       ty, 1,
        ]
    }
    
    multiply(other) {
        var te = this.elements;
        var oe = other.elements;
        var result = new Matrix3();

        // 1st row
        result.elements[0] = te[0] * oe[0] + te[3] * oe[1] + te[6] + oe[2];
        result.elements[3] = te[0] * oe[3] + te[3] * oe[4] + te[6] + oe[5];
        result.elements[6] = te[0] * oe[6] + te[3] * oe[7] + te[6] + oe[8];
        
        // 2st row
        result.elements[1] = te[1] * oe[0] + te[4] * oe[1] + te[7] + oe[2];
        result.elements[4] = te[1] * oe[3] + te[4] * oe[4] + te[7] + oe[5];
        result.elements[7] = te[1] * oe[6] + te[4] * oe[7] + te[7] + oe[8];
        
        // 3st row
        result.elements[2] = te[2] * oe[0] + te[5] * oe[1] + te[8] + oe[2];
        result.elements[5] = te[2] * oe[3] + te[5] * oe[4] + te[8] + oe[5];
        result.elements[8] = te[2] * oe[6] + te[5] * oe[7] + te[8] + oe[8];
        
        return result;
    }
}
