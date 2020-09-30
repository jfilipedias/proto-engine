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

    /* public transform (other: Vector2): Vector2 {
        var vector = new Vector2(
            this.elements[0] * other.x + this.elements[3] * other.y + this.elements [6],
            this.elements[1] * other.y + this.elements[4] * other.y + 
        );

        return other;
    } */
}