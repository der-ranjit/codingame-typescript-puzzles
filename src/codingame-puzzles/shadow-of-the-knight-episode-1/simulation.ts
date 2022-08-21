import { CGDirection } from "../../utilities.ts/CGDirection";
import { CodingameInput, IOSimulatorArgs } from "../../utilities.ts/IOSimulator";
import { Vector2 } from "../../utilities.ts/Vector2";

const widthAndHeight = new Vector2(4, 8);
let availableJumps = 40;
let playerPosition = new Vector2(2, 3);
const bombPosition = new Vector2(1, 5);

export const shadowOfKnightEp1SimulationArgs: IOSimulatorArgs = {
    initialOutputs: [
        widthAndHeight.toString(),
        availableJumps,
        playerPosition.toString()
    ],
    outputComputer: createNextDirection,
    simulationsPerSecond: 2
};

/** Output the direction of the bomb relative to the player position */
function createNextDirection(targetWindow: CodingameInput | null): CGDirection {
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

function movePlayerToTargetWindow(targetWindow: CodingameInput) {
    playerPosition = Vector2.fromCGInput(targetWindow);
    availableJumps--;
    if (availableJumps <= 0) {
        throw new Error("NO MORE JUMPS AVAILABLE LOOSER")
    }
}

function getBombDirectionRelativeToPlayer(): CGDirection {
    const directionToBomb = Vector2.directional(playerPosition, bombPosition);
    return vectorToCGDirection(directionToBomb);
}

function vectorToCGDirection(vector: Vector2): CGDirection {
    const position = vector.getPosition();
    if (position.x === 0 && position.y < 0) return CGDirection.Up;
    if (position.x > 0 && position.y < 0) return CGDirection.UpRight;
    if (position.x > 0 && position.y === 0) return CGDirection.Right;
    if (position.x > 0 && position.y > 0) return CGDirection.DownRight;
    if (position.x === 0 && position.y > 0) return CGDirection.Down;
    if (position.x < 0 && position.y > 0) return CGDirection.DownLeft;
    if (position.x < 0 && position.y === 0) return CGDirection.Left;
    if (position.x < 0 && position.y < 0) return CGDirection.UpLeft;
    return CGDirection.Right; 
}