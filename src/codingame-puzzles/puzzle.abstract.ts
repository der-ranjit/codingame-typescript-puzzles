export interface GameInput {
    readonly [key: string]: any;
}

export abstract class Puzzle<T extends GameInput> {
    protected abstract initializeGameInput(): T;
    protected gameInput = this.initializeGameInput();
    /** Handles continuos input by codingame. Should always log some kind of string, formatted to the puzzle's requirements. */
    protected abstract handleCGInputAndOutputSolution(): void;

    public start() {
        // codingame "gameloop"
        while (true) {
            this.handleCGInputAndOutputSolution()
        }
    }
}