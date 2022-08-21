import { CGDirection } from "../../utilities.ts/CGDirection";
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
    
    protected handleCGInputAndOutputSolution(): void {
        // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
        const targetWindowPosition = new Vector2(0, 0);
        const bombDirection = readline() as CGDirection;
        const bombVector = Vector2.fromCGDirection(bombDirection);
        
        console.log(targetWindowPosition);
    }
}