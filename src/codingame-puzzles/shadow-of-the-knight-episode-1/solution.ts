import { CGDirection, isCGDirection } from "../../utilities.ts/CGDirection";
import { Vector2 } from "../../utilities.ts/Vector2";
import { GameInput, Puzzle } from "../puzzle.abstract";

interface ShadowKnightEp1GameInput extends GameInput {
    readonly buildingWidth: number;
    readonly buildingHeight: number,
    readonly availableJumps: number;
    readonly initialPositionX: number; 
    readonly initialPositionY: number; 
}

export class ShadowKnightEp1 extends Puzzle<ShadowKnightEp1GameInput> {
    private batmanPosition = new Vector2(this.gameInput.initialPositionX, this.gameInput.initialPositionY);
    private availableJumps = this.gameInput.availableJumps;

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
    
    protected handleCGInputAndOutputSolution(): string {
        // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
        const bombDirection = readline();
        this.simulator?.log(bombDirection)
        if (!isCGDirection(bombDirection)) {
            throw new Error("erronous bomb direction provided")
        }
        const resultWindowPosition = this.determineBestWindowPosition(bombDirection);
        this.availableJumps--;
        return resultWindowPosition.toString();
    }
    
    private determineBestWindowPosition(bombDirection: CGDirection): Vector2 {
        const targetWindowPosition = new Vector2(0, 0);
        return targetWindowPosition;
    }
}