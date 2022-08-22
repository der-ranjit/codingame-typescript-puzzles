import { InitialGameInput, PuzzleSolver } from "../PuzzleSolver";

interface ExampleGameInput extends InitialGameInput {
    readonly startValue: string;
}

export class PuzzleExample extends PuzzleSolver<ExampleGameInput> {
    protected initializeGameInput(): ExampleGameInput {
        const startValue = readline();
        return {
            startValue
        };
    }

    public handleNextInputAndReturnSolution(): string {
        // some input
        const input = readline();

        return "solution";
    }
}