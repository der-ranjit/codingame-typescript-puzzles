// describes what the initial string inputs actually represents
export interface InitialGameInput {
    readonly [key: string]: any;
}
// describes what the stepwise string input actually represents
export interface StepWiseGameInput {
    readonly [key: string]: any;
}

export type PuzzleSolverConstructor<T extends InitialGameInput> = new (...args: any[]) => PuzzleSolver<T>;

export abstract class PuzzleSolver<T extends InitialGameInput> {
    /** Used to setup initial game input by codingame puzzle (or simulation) */
    protected abstract initializeGameInput(): T;
    /** Handles continuos input by codingame. Should always log some kind of string, formatted to the puzzle's requirements. */
    public abstract handleNextInputAndReturnSolution(): string;

    /** initial gameInput; available when constructing the class has finished */
    protected gameInput: T;

    constructor() {
        this.gameInput = this.initializeGameInput();
    }
}