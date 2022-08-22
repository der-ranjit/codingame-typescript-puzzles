import { CGDirection, isCGDirection } from "../../utilities.ts/CGDirection";
import { Vector2, Vector2Like } from "../../utilities.ts/Vector2";
import { PuzzleManager } from "../PuzzleManager";
import { GameInput, PuzzleSolver } from "../PuzzleSolver";

interface ShadowKnightEp1GameInput extends GameInput {
    readonly buildingWidth: number;
    readonly buildingHeight: number,
    readonly availableJumps: number;
    readonly initialPositionX: number;
    readonly initialPositionY: number;
}

export class ShadowKnightEp1Solution extends PuzzleSolver<ShadowKnightEp1GameInput> {
    private currentPosition = new Vector2(this.gameInput.initialPositionX, this.gameInput.initialPositionY);

    private minX = 0;
    private maxX = this.gameInput.buildingWidth - 1;
    private minY = 0;
    private maxY = this.gameInput.buildingHeight - 1;

    protected initializeGameInput(): ShadowKnightEp1GameInput {
        const [buildingWidth, buildingHeight] = [...readline().split(' ').map(value => +value)];
        const availableJumps = parseInt(readline());
        const [initialPositionX, initialPositionY] = [...readline().split(' ').map(value => +value)];
        return {
            buildingWidth,
            buildingHeight,
            availableJumps,
            initialPositionX,
            initialPositionY
        }
    }

    public handleNextInputAndReturnSolution(): string {
        const bombCGDirection = readline();
        if (!isCGDirection(bombCGDirection)) {
            throw new Error("malformed input")
        }

        this.jump(bombCGDirection);
        return this.currentPosition.toString();
    }

    // jump to a window based on bombDirection
    private jump(bombCGDirection: CGDirection): void {
        const bombDirection = Vector2.from(bombCGDirection);
        this.currentPosition = this.getNextTarget(bombDirection.getPosition());
    }

    private getNextTarget(bombPosition: Vector2Like): Vector2 {
        this.updateMinMaxValues(bombPosition);
        return this.findTargetNearCenter();
    }

    private updateMinMaxValues(bombDirection: Vector2Like): void {
        const currentPosition = this.currentPosition.getPosition();
        if (bombDirection.x < 0) {
            this.maxX = currentPosition.x - 1;
        } else if (bombDirection.x > 0) {
            this.minX = currentPosition.x + 1;
        } else {
            this.minX = this.maxX = currentPosition.x;
        }
        if (bombDirection.y < 0) {
            this.maxY = currentPosition.y - 1;
        } else if (bombDirection.y > 0) {
            this.minY = currentPosition.y + 1
        } else {
            this.minY = this.maxY = currentPosition.y;
        }
    }

    private findTargetNearCenter(): Vector2 {
        const xDiff = this.maxX - this.minX;
        const yDiff = this.maxY - this.minY;
        const x = Math.ceil(this.minX + xDiff / 2);
        const y = Math.ceil(this.minY + yDiff / 2);
        return new Vector2(x, y);
    }
}
