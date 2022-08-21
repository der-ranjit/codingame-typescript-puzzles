export interface GameInput {
    readonly [key: string]: any;
}

export type PuzzleSolverConstructor<T extends GameInput> = new (...args: any[]) => PuzzleSolver<T>;

export abstract class PuzzleSolver<T extends GameInput> {
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