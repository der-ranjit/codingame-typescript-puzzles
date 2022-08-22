import { isEnumValue } from "./enums"
import type { Vector2Like } from "./Vector2";

export enum CGDirection {
    Up = "U",
    UpRight = "UR",
    Right = "R",
    DownRight = "DR",
    Down = "D",
    DownLeft = "DL",
    Left = "L",
    UpLeft = "UL"
}

export function vectorLikeToCGDirection(vectorLike: Vector2Like): CGDirection {
    if (vectorLike.x === 0 && vectorLike.y < 0) { return CGDirection.Up; }
    if (vectorLike.x > 0 && vectorLike.y < 0) { return CGDirection.UpRight; }
    if (vectorLike.x > 0 && vectorLike.y === 0) { return CGDirection.Right; }
    if (vectorLike.x > 0 && vectorLike.y > 0) { return CGDirection.DownRight; }
    if (vectorLike.x === 0 && vectorLike.y > 0) { return CGDirection.Down; }
    if (vectorLike.x < 0 && vectorLike.y > 0) { return CGDirection.DownLeft; }
    if (vectorLike.x < 0 && vectorLike.y === 0) { return CGDirection.Left; }
    if (vectorLike.x < 0 && vectorLike.y < 0) { return CGDirection.UpLeft; }
    throw new Error("vectorLike could not be converted to CGDirection");
}

export function cgDirectionToVectorLike(direction: CGDirection): Vector2Like {
    let vectorLike: Vector2Like = { x: 0, y: 0 };

    if (direction === CGDirection.Up) return { x: 0, y: -1 }
    if (direction === CGDirection.UpRight) return { x: 1, y: -1 }
    if (direction === CGDirection.Right) return { x: 1, y: 0 }
    if (direction === CGDirection.DownRight) return { x: 1, y: 1 }
    if (direction === CGDirection.Down) return { x: 0, y: 1 }
    if (direction === CGDirection.DownLeft) return { x: - 1, y: 1 }
    if (direction === CGDirection.Left) return { x: - 1, y: 0 }
    if (direction === CGDirection.UpLeft) return { x: - 1, y: -1 }

    return vectorLike;
}

export function isCGDirection(value: any): value is CGDirection {
    return isEnumValue(value, CGDirection);
}