import { CGDirection } from "./CGDirection";

export interface Vector2Like {
    x: number;
    y: number;
}

function isVector2Like(value: any): value is Vector2Like {
    return typeof value?.x === "number" && typeof value?.y === "number";
}

export class Vector2 {
    public static from(vectorLike: Vector2Like) {
        return new Vector2(vectorLike);
    }

    public static fromCGDirection(direction: CGDirection): Vector2 {
        let x: number;
        let y: number;

        switch (direction) {
            case CGDirection.Up:
                x = 0;
                y = -1;
                break;
            case CGDirection.UpRight:
                x = 1;
                y = -1;
                break;
            case CGDirection.Right:
                x = 1;
                y = 0;
                break;
            case CGDirection.DownRight:
                x = 1;
                y = 1;
                break;
            case CGDirection.Down:
                x = 0;
                y = 1;
                break;
            case CGDirection.DownLeft:
                x = -1;
                y = 1;
                break;
            case CGDirection.Left:
                x = -1;
                y = 0;
                break;
            case CGDirection.UpLeft:
                x = -1;
                y = -1;
                break;
            default:
                x = 0;
                y = 0;
                break;
        }

        return new Vector2(x, y);
    }

    public static distanceBetween(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): number {
        let xA: number;
        let yA: number;
        let xB: number;
        let yB: number;
        if (vectorA instanceof Vector2) {
            xA = vectorA.getX();
            yA = vectorA.getY();
        } else {
            xA = vectorA.x;
            yA = vectorA.y;
        }
        if (vectorB instanceof Vector2) {
            xB = vectorB.getX();
            yB = vectorB.getY();
        } else {
            xB = vectorB.x;
            yB = vectorB.y;
        }
        return Math.sqrt(((xA - xB) ** 2) + ((yA - yB) ** 2));
    }
    
    public static add(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): Vector2 {
        let xA: number;
        let yA: number;
        let xB: number;
        let yB: number;
        if (vectorA instanceof Vector2) {
            xA = vectorA.getX();
            yA = vectorA.getY();
        } else {
            xA = vectorA.x;
            yA = vectorA.y;
        }
        if (vectorB instanceof Vector2) {
            xB = vectorB.getX();
            yB = vectorB.getY();
        } else {
            xB = vectorB.x;
            yB = vectorB.y;
        }
        return new Vector2(xA + xB, yA + yB);
    }

    private x: number;
    private y: number;

    constructor(x: number, y: number)
    constructor(vectorLike: Vector2Like)
    constructor(vectorOrNumber: number | Vector2Like, y?: number) {
        this.x = isVector2Like(vectorOrNumber) ? vectorOrNumber.x : vectorOrNumber;
        this.y = isVector2Like(vectorOrNumber) ? vectorOrNumber.y : y ?? 0;
    }

    public getX(): number {
        return this.x
    }
    
    public getY(): number {
        return this.y
    }

    public getOrigin(): Vector2Like {
        return { x: this.x, y: this.y };
    }
    public getPosition() {
        return this.getOrigin();
    }

    public distanceTo(otherVector: Vector2Like | Vector2) {
        return Vector2.distanceBetween(this, otherVector);
    }

    public add(otherVector: Vector2Like | Vector2) {
        this.copy(Vector2.add(this, otherVector));
    }

    public copy(otherVector: Vector2Like | Vector2) {
        this.x = otherVector instanceof Vector2 ? otherVector.getX() : otherVector.x;
        this.y = otherVector instanceof Vector2 ? otherVector.getY() : otherVector.y;
    }
}