import { CGInputOutput } from "../../utilities.ts/CGInputOutput";
import { Vector2 } from "../../utilities.ts/Vector2";
import { InitialPuzzleInput, PuzzleSolver, StepwisePuzzleInput } from "../PuzzleSolver";

interface ExampleInitialInput extends InitialPuzzleInput {
    readonly startValue: string;
}
interface ExampleStepwiseInput extends StepwisePuzzleInput {
    readonly vector: Vector2;
}

export class ExamplePuzzleSolver extends PuzzleSolver<ExampleInitialInput, ExampleStepwiseInput> {
    protected stepwisePuzzle = true;
    
    protected parseInitialGameInput(): ExampleInitialInput {
        const startValue = readline();
        return { startValue };
    }

    protected parseStepwiseGameInput(stepwiseCGInput: CGInputOutput): ExampleStepwiseInput {
        return { vector: Vector2.from(stepwiseCGInput) };
    }

    public getSolutionForNextStep(stepwiseInput: ExampleStepwiseInput): string {
        // some input and heavy computation
        const solution = stepwiseInput.vector.getX()
        return solution.toString();
    }
}