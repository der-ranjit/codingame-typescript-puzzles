import { CGDirection, cgDirectionToVectorLike } from "./CGDirection";
import { CGInputOutput } from "./CGInputOutput";
import { isEnumValue } from "./enums";

export interface Vector2Like {
    x: number;
    y: number;
}

function isVector2Like(value: any): value is Vector2Like {
    return typeof value?.x === "number" && typeof value?.y === "number";
}

function isVectorLikeCompatibleInput(value: any): value is string {
    return typeof value === "string"
        && value.length === 3
        && !isNaN(parseInt(value[0]))
        && !isNaN(parseInt(value[2]))
}

export class Vector2 {
    public static from(vectorLike: Vector2Like): Vector2
    public static from(input: CGInputOutput): Vector2
    public static from(direction: CGDirection): Vector2
    public static from(value: Vector2Like | CGInputOutput | CGDirection): Vector2 {
        if (isVector2Like(value)) {
            return new Vector2(value);
        } else if (isEnumValue(value, CGDirection)) {
            return Vector2.from(cgDirectionToVectorLike(value));
        } else if (isVectorLikeCompatibleInput(value)) {
            return new Vector2(parseInt(value[0]), parseInt(value[2]));
        } else return new Vector2(0, 0);
    }

    public static directional(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): Vector2 {
        if (vectorA instanceof Vector2) {
            vectorA = vectorA.getPosition();
        }
        if (vectorB instanceof Vector2) {
            vectorB = vectorB.getPosition()
        }
        return new Vector2(vectorB.x - vectorA.x, vectorB.y - vectorA.y);
    }

    public static distanceBetween(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): number {
        if (vectorA instanceof Vector2) {
            vectorA = vectorA.getPosition();
        }
        if (vectorB instanceof Vector2) {
            vectorB = vectorB.getPosition()
        }
        return Math.sqrt(((vectorA.x - vectorB.x) ** 2) + ((vectorA.y - vectorB.y) ** 2));
    }

    public static add(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): Vector2 {
        if (vectorA instanceof Vector2) {
            vectorA = vectorA.getPosition();
        }
        if (vectorB instanceof Vector2) {
            vectorB = vectorB.getPosition()
        }
        return new Vector2(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    public static sub(vectorA: Vector2 | Vector2Like, vectorB: Vector2 | Vector2Like): Vector2 {
        if (vectorA instanceof Vector2) {
            vectorA = vectorA.getPosition();
        }
        if (vectorB instanceof Vector2) {
            vectorB = vectorB.getPosition()
        }
        return new Vector2(vectorA.x - vectorB.x, vectorA.y - vectorB.y);
    }

    public static scale(vectorA: Vector2 | Vector2Like, scalar: number): Vector2 {
        if (vectorA instanceof Vector2) {
            vectorA = vectorA.getPosition();
        }
        return new Vector2(vectorA.x * scalar, vectorA.y * scalar);
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
        this.from(Vector2.add(this, otherVector));
    }

    public sub(otherVector: Vector2Like | Vector2) {
        this.from(Vector2.sub(this, otherVector));
    }

    public scale(scalar: number) {
        this.from(Vector2.scale(this, scalar));
    }

    public toString(): string {
        return `${this.x} ${this.y}`;
    }

    private from(otherVector: Vector2Like | Vector2) {
        this.x = otherVector instanceof Vector2 ? otherVector.getX() : otherVector.x;
        this.y = otherVector instanceof Vector2 ? otherVector.getY() : otherVector.y;
    }
}