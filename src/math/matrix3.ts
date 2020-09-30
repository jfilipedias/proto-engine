import { Vector2 } from "./vector2";

export class Matrix3 {
    elements: number[] = [];

    public constructor () {
        this.identity();
    }

    // Collum-Major notation
    public identity () {
        this.elements = [
            1, 0, 0,        // 1st collum
            0, 1, 0,        // 2nd collum
            0, 0, 1,        // 3rd collum
        ];
    }

    // TODO
    public inverse () {}

    // TODO
    public derterminant () {}

    // TODO
    public transpose () {}

    public transform (other: Vector2): Vector2 {
        var te = this.elements;

        var vector = new Vector2(
            te[0] * other.x + te[3] * other.y + te[6],
            te[1] * other.y + te[4] * other.y + te[7]
        );

        var vectorW = te[2] * other.x + te[5] * other.y + te[8];

        if (vectorW != 0) {
            vector.x /= vectorW;
            vector.y /= vectorW;
        }

        return vector;
    }
    
    // TODO
    public trs () {}


    public translate (x: number, y: number) {
        this.elements = [
            1, 0, 0,
            0, 1, 0,
            x, y, 1,
        ];
    }

    public scale (x: number, y: number) {
        this.elements = [
            x, 0, 0,
            0, y, 0,
            0, 0, 1,
        ];
    }

    public rotate (theta: number) {
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        this.elements = [
             cos, sin, 0,
            -sin, cos, 0,
               0,   0, 1,
        ]
    }

    // TODO
    public multiply (other: Matrix3): Matrix3 {
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