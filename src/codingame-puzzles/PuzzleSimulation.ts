import { CGInput, CGOutput } from "../utilities.ts/CGInputOutput";
import { isNodeEnvironment } from "./PuzzleManager";

type InitialOutputs = CGInput[];
type OutputCalculator = (lastSolution: CGInput | null) => CGOutput;

export interface PuzzleSimulationArgs {
    /** An array of values that will initially be provided by the simulation on calls of readline */
    initialOutputs: InitialOutputs,
    /**
     * A method that will be called when all initialOutputs have been used. 
     * Based on a provided input, it should compute the next available Output 
     */
    outputCalculator: OutputCalculator,
    /** Optional simulation speed in steps per second */
    simulationsPerSecond?: number;
}

export class PuzzleSimulation {
    private initialOutputs: InitialOutputs;
    private outputComputer: OutputCalculator;
    private simulationSpeed: number;

    private lastInput: CGInput | null = null;
    private outputGenerator: Generator<CGOutput> = this.generator();

    constructor(simulatorArgs: PuzzleSimulationArgs) {
        this.initialOutputs = simulatorArgs.initialOutputs;
        this.outputComputer = simulatorArgs.outputCalculator;
        const simulationsPerSecond = simulatorArgs.simulationsPerSecond ?? 1;
        this.simulationSpeed = 1000 / simulationsPerSecond;
    }

    public getSimulationSpeed(): number {
        return this.simulationSpeed;
    }

    public getNextOutput(): CGOutput {
        return this.outputGenerator.next().value;
    }

    private *generator(): Generator<CGOutput> {
        while (true) {
            let nextOutput = this.initialOutputs.shift();
            if (nextOutput === undefined) {
                nextOutput = this.outputComputer(this.lastInput);
            }
            yield nextOutput.toString();
        }
    }

    /**
     * Sets the last solution / input for simulation, which will be provided to the outputComputer method.
     */
    public setSolution(input: CGInput) {
        this.lastInput = input;
    }
}