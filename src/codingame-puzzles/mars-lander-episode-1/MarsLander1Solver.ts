import { Vector2 } from "../../utilities.ts/Vector2";
import { InitialPuzzleInput, PuzzleSolver, StepwisePuzzleInput } from "../PuzzleSolver";

interface MarsLander1InitialInput extends InitialPuzzleInput {
    surfacePoints: Vector2[];
}

interface MarsLander1StepwiseInput extends StepwisePuzzleInput {
    vehiclePosition: Vector2;
    velocity: Vector2;
    // 0 <= remainingFuel <= 2000
    remainingFuel: number;
    // -90 <= rotationAngle <= 90
    rotationAngle: number;
    // 0 <= thrustPower <= 4
    thrustPower: number;
}

export class MarsLander1Solver extends PuzzleSolver<MarsLander1InitialInput, MarsLander1StepwiseInput> {
    protected stepwisePuzzle = true;
    
    protected parseInitialGameInput(): MarsLander1InitialInput {
        const surfacePoints: Vector2[] = [];
        let numberOfSurfacePoints = parseInt(readline());
        for (let i = 0; i < numberOfSurfacePoints; i++) {
            surfacePoints.push(Vector2.from(readline()));
        }
        return { surfacePoints };
    }

    protected parseStepwiseGameInput(stepwiseCGInput: string): MarsLander1StepwiseInput {
        const inputArray = stepwiseCGInput.split(" ").map(value => parseInt(value));
        return {
            vehiclePosition: Vector2.from({ x: inputArray[0], y: inputArray[1] }),
            velocity: Vector2.from({ x: inputArray[2], y: inputArray[3] }),
            remainingFuel: inputArray[4],
            rotationAngle: inputArray[5],
            thrustPower: inputArray[6]
        };
    }

    protected getSolutionForNextStep(stepwiseInput: MarsLander1StepwiseInput): string {
        console.log(JSON.stringify(stepwiseInput));
        return "solution";
    }
}