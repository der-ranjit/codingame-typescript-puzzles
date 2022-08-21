import { CGDirection, isCGDirection } from "../../utilities.ts/CGDirection";
import { getRandomItemInArray } from "../../utilities.ts/rng";
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

interface Target {
    isValid: boolean;
    position: Vector2Like;
}

export class ShadowKnightEp1Solution extends PuzzleSolver<ShadowKnightEp1GameInput> {
    private currentPosition = new Vector2(this.gameInput.initialPositionX, this.gameInput.initialPositionY);
    private availableJumps = this.gameInput.availableJumps;
    private targets = this.createTargets();

    private createTargets(): Target[] {
        const result: Target[] = [];
        for (let x = 0; x < this.gameInput.buildingWidth; x++) {
            for (let y = 0; y < this.gameInput.buildingHeight; y++) {
                result.push({
                    position: {x, y},
                    isValid: true
                })
            }
        }
        return result;
    }

    protected initializeGameInput(): ShadowKnightEp1GameInput {
        const buildingInput = readline().split(' ');
        const buildingWidth = parseInt(buildingInput[0]);
        const buildingHeight = parseInt(buildingInput[1]);
        const availableJumps = parseInt(readline());
        const initialPositionInput = readline().split(' ');
        const initialPositionX = parseInt(initialPositionInput[0]);
        const initialPositionY = parseInt(initialPositionInput[1]);
        return {
            buildingWidth,
            buildingHeight,
            availableJumps,
            initialPositionX,
            initialPositionY
        }
    }

    public handleNextInputAndReturnSolution(): string {
        // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
        const bombDirection = readline();
        PuzzleManager.log("bomb direction: " + bombDirection);
        if (!isCGDirection(bombDirection)) {
            throw new Error("erronous bomb direction provided")
        }
        const nextTarget = this.determineNextTarget(bombDirection);
        this.availableJumps--;
        this.currentPosition = nextTarget;
        return nextTarget.toString();
    }

    private determineNextTarget(bombDirection: CGDirection): Vector2 {
        const bombPosition = Vector2.from(bombDirection).getPosition();
        this.filterInvalidTargets(bombPosition);
        const targetPosition = this.getRandomValidTarget()?.position ?? {x: 0, y: 0};
        return new Vector2(targetPosition);
    }

    private filterInvalidTargets(bombDirection: Vector2Like): void {
        this.targets = this.targets.filter(target =>{
            const isInvalid = bombDirection.x < 0 && target.position.x >= this.currentPosition.getX()
                || bombDirection.x > 0 && target.position.x <= this.currentPosition.getX()
                || bombDirection.x === 0 && target.position.x != this.currentPosition.getX()
                || bombDirection.y < 0 && target.position.y >= this.currentPosition.getY()
                || bombDirection.y > 0 && target.position.y <= this.currentPosition.getY()
                || bombDirection.y === 0 && target.position.y != this.currentPosition.getY();
            return !isInvalid;
        });
    }

    private getRandomValidTarget(): Target | null {
        return getRandomItemInArray(this.targets);
    }
}