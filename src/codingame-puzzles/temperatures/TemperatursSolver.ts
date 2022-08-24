import { InitialPuzzleInput, PuzzleSolver, StepwisePuzzleInput } from "../PuzzleSolver";

interface TemperaturesInitialInput extends InitialPuzzleInput {
    numbers: number[];
}

interface TemperaturesStepwiseInput extends StepwisePuzzleInput {

}

export class TemperaturesSolver extends PuzzleSolver<TemperaturesInitialInput, TemperaturesStepwiseInput> {
    protected stepwisePuzzle = false;

    protected parseInitialGameInput(): TemperaturesInitialInput {
        const unneccesaryInput = readline();
        const numbers = readline().split(" ").map(value => +value);
        return { numbers };
    }

    protected parseStepwiseGameInput(stepwiseCGInput: string): TemperaturesStepwiseInput {
        return {};
    }

    protected getSolutionForNextStep(input: TemperaturesStepwiseInput): string {
        const numbers = this.initialInput.numbers;
  
        let closestNumberToZero = numbers[0];
        for (let number of numbers) {
            if (Math.abs(number) < Math.abs(closestNumberToZero)) {
                closestNumberToZero = number;
            } else if (Math.abs(number) === Math.abs(closestNumberToZero)) {
                closestNumberToZero = Math.abs(closestNumberToZero);
            }
        }

        return closestNumberToZero.toString();
    }
}