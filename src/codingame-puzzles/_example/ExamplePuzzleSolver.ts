import { CGInputOutput } from "../../utilities.ts/CGInputOutput";
import { Vector2 } from "../../utilities.ts/Vector2";
import { InitialGameInput, PuzzleSolver, StepwiseGameInput } from "../PuzzleSolver";

interface ExampleInitialInput extends InitialGameInput {
    readonly startValue: string;
}
interface ExampleStepwiseInput extends StepwiseGameInput {
    readonly vector: Vector2;
}

export class ExamplePuzzleSolver extends PuzzleSolver<ExampleInitialInput, ExampleStepwiseInput> {
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