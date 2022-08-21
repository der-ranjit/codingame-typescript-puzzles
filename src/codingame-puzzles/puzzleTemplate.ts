import { GameInput, Puzzle } from "./puzzle.abstract";

interface TemplateGameInput extends GameInput {
    readonly startValue: string;
}

export class PuzzleTemplate extends Puzzle<TemplateGameInput> {
    protected initializeGameInput(): TemplateGameInput {
        const startValue = readline();
        return {
            startValue
        };
    }
    
    protected handleCGInputAndOutputSolution(): void {
        // some input
        const input = readline();

        // output is always needed
        console.log(input);
    }
}