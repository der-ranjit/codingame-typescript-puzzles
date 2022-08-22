import { assert } from "../../utilities.ts/asserts";
import { CGDirection, isCGDirection } from "../../utilities.ts/CGDirection";
import { Vector2, Vector2Like } from "../../utilities.ts/Vector2";
import { PuzzleManager } from "../PuzzleManager";
import { InitialGameInput, PuzzleSolver, StepwiseGameInput } from "../PuzzleSolver";

interface ShadowKnightEp1InitiaInput extends InitialGameInput {
    readonly buildingWidth: number;
    readonly buildingHeight: number,
    readonly availableJumps: number;
    readonly initialPositionX: number;
    readonly initialPositionY: number;
}

interface ShadowKnightEp1StepwiseInput extends StepwiseGameInput {
    bombDirection: CGDirection;
}

export class ShadowOfKnight1Solver extends PuzzleSolver<ShadowKnightEp1InitiaInput, ShadowKnightEp1StepwiseInput> {
    protected parseInitialGameInput(): ShadowKnightEp1InitiaInput {
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

    protected parseStepwiseGameInput(stepwiseCGInput: string): ShadowKnightEp1StepwiseInput {
        assert(isCGDirection(stepwiseCGInput), "input cannot be converted to CGDirection");
        return { bombDirection: stepwiseCGInput }
    }

    private currentPosition = new Vector2(this.initialInput.initialPositionX, this.initialInput.initialPositionY);
    private minX = 0;
    private maxX = this.initialInput.buildingWidth - 1;
    private minY = 0;
    private maxY = this.initialInput.buildingHeight - 1;

    protected getSolutionForNextStep(stepwiseInput: ShadowKnightEp1StepwiseInput): string {
        PuzzleManager.log("bombDirection: " + stepwiseInput.bombDirection);
        this.jump(stepwiseInput.bombDirection);
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
