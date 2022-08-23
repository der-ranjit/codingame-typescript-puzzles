import { InitialGameInput, PuzzleSolver, StepwiseGameInput } from "../PuzzleSolver";

interface MarsLander1InitialInput extends InitialGameInput {

}

interface MarsLander1StepwiseInput extends StepwiseGameInput {

}

export class MarsLander1Solver extends PuzzleSolver<MarsLander1InitialInput, MarsLander1StepwiseInput> {
    protected stepwisePuzzle = true;
    
    protected parseInitialGameInput(): MarsLander1InitialInput {
        return {};
    }

    protected parseStepwiseGameInput(stepwiseCGInput: string): MarsLander1StepwiseInput {
        return {};
    }

    protected getSolutionForNextStep(stepwiseInput: MarsLander1StepwiseInput): string {
        return "solution";
    }
}