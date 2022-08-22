import { CGDirection, vectorLikeToCGDirection } from "../../utilities.ts/CGDirection";
import { CGInputOutput } from "../../utilities.ts/CGInputOutput";
import { PuzzleSimulationArgs } from "../PuzzleSimulation";
import { Vector2 } from "../../utilities.ts/Vector2";

// initial inputs provided to puzzle for simulation
const widthAndHeight = new Vector2(4, 8);
let availableJumps = 40;
let playerPosition = new Vector2(2, 3);
const bombPosition = new Vector2(1, 5);

export const shadowOfKnight1SimulationArgs: PuzzleSimulationArgs = {
    simulationsPerSecond: 2,
    outputCalculator: createNextOutput,
    initialOutputs: [
        widthAndHeight.toString(),
        availableJumps.toString(),
        playerPosition.toString()
    ],
};

/** Output the direction of the bomb relative to the player position */
function createNextOutput(targetWindow: CGInputOutput | null): CGDirection {
    if (targetWindow === bombPosition.toString()) {
        winGame();
    } else if (targetWindow != null) {
        movePlayerToTargetWindow(targetWindow);
    }
    return getBombDirectionRelativeToPlayer();
}

function winGame() {
    // stop gameloop by throwing error
    throw new Error("YOU WON");
}

function movePlayerToTargetWindow(targetWindow: CGInputOutput) {
    playerPosition = Vector2.from(targetWindow);
    availableJumps--;
    if (availableJumps <= 0) {
        throw new Error("NO MORE JUMPS AVAILABLE LOOSER")
    }
}

function getBombDirectionRelativeToPlayer(): CGDirection {
    const directionToBomb = Vector2.directional(playerPosition, bombPosition);
    return vectorLikeToCGDirection(directionToBomb.getPosition());
}
