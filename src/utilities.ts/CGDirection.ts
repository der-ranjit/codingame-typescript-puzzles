import { isEnumValue } from "./enums"

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

export function isCGDirection(value: any): value is CGDirection {
    return isEnumValue(value, CGDirection);
}