import { CGDirection, vectorLikeToCGDirection } from "../../utilities.ts/CGDirection";
import { CGInputOutput } from "../../utilities.ts/CGInputOutput";
import { PuzzleSimulation } from "../PuzzleSimulation";
import { Vector2 } from "../../utilities.ts/Vector2";

export class ShadowOfKnight1Simulation1 extends PuzzleSimulation {
    private widthAndHeight = new Vector2(4, 8);
    private availableJumps = 40;
    private playerPosition = new Vector2(2, 3);
    private bombPosition = new Vector2(1, 5);

    protected initialOutputs = [
        this.widthAndHeight.toString(),
        this.availableJumps.toString(),
        this.playerPosition.toString()
    ];

    protected computeNextOutput(lastSolution: string | null): string {
        if (lastSolution === this.bombPosition.toString()) {
            this.stop("You win!!!!");
        } else if (lastSolution != null) {
            this.movePlayerToTargetWindow(lastSolution);
        }
        return this.getBombDirectionRelativeToPlayer();
    }
    
    private movePlayerToTargetWindow(targetWindow: CGInputOutput): void {
        this.playerPosition = Vector2.from(targetWindow);
        this.availableJumps--;
        if (this.availableJumps <= 0) {
            this.stop("You lost. No more jumps available!");
        }
    }

    private getBombDirectionRelativeToPlayer(): CGDirection {
        const directionToBomb = Vector2.directional(this.playerPosition, this.bombPosition);
        return vectorLikeToCGDirection(directionToBomb.getPosition());
    }
}
