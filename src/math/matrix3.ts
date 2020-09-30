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

    public transform (other: Vector2): Vector2 {
        const te = this.elements;

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
}