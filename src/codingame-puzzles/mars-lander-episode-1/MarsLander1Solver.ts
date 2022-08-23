import { InitialGameInput, PuzzleSolver, StepwiseGameInput } from "../PuzzleSolver";

interface MarsLander1InitialInput extends InitialGameInput {

}

interface MarsLander1StepwiseInput extends StepwiseGameInput {

}

export class MarsLander1Solver extends PuzzleSolver<MarsLander1InitialInput, MarsLander1StepwiseInput> {
    protected parseInitialGameInput(): MarsLander1InitialInput {
        return {};
        // gewa
    }

    protected parseStepwiseGameInput(stepwiseCGInput: string): MarsLander1StepwiseInput {
        return {};
    }

    protected getSolutionForNextStep(stepwiseInput: MarsLander1StepwiseInput): string {
        return "";
    }
}