import { CGInputOutput } from "../utilities.ts/CGInputOutput";

// describes what the initial string inputs actually represents
export interface InitialGameInput {
    readonly [key: string]: any;
}
// describes what the stepwise string input actually represents
export interface StepwiseGameInput {
    readonly [key: string]: any;
}

export type PuzzleSolverConstructor<I extends InitialGameInput, S extends StepwiseGameInput = {}> = new (...args: any[]) => PuzzleSolver<I, S>;

export abstract class PuzzleSolver<I extends InitialGameInput, S extends StepwiseGameInput = {}> {
    /** is called once to parse initial game input provided by codingame puzzle (or simulation). will be saved in initialInput */
    protected abstract parseInitialGameInput(): I;
    /** is called once every step to parse step-wise input. will be available as a parameter to getSolutionForNextStep */
    protected abstract parseStepwiseGameInput(stepwiseCGInput: CGInputOutput): S;
    /** Handles continuos input by codingame. Should always log some kind of string, formatted to the puzzle's requirements. */
    protected abstract getSolutionForNextStep(stepwiseInput: S): CGInputOutput;

    protected initialInput: I;
    protected stepwiseInput: S = {} as S;

    constructor() {
        this.initialInput = this.parseInitialGameInput();
    }

    public getNextSolution(): CGInputOutput {
        const inputForNextStep = readline();
        this.stepwiseInput = inputForNextStep != null ? this.parseStepwiseGameInput(inputForNextStep) : {} as S;
        return this.getSolutionForNextStep(this.stepwiseInput);
    } 
}