import { GameInput, Puzzle } from "../puzzle.abstract";

interface ExampleGameInput extends GameInput {
    readonly startValue: string;
}

export class PuzzleExample extends Puzzle<ExampleGameInput> {
    protected initializeGameInput(): ExampleGameInput {
        const startValue = readline();
        return {
            startValue
        };
    }
    
    protected handleCGInputAndOutputSolution(): string {
        // some input
        const input = readline();

        // output is always needed
        return "output";
    }
}