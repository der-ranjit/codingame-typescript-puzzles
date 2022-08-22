import { CGInputOutput } from "../utilities.ts/CGInputOutput";

type InitialOutputs = CGInputOutput[];

export interface PuzzleSimulationArgs {
    /** Optional simulation speed in steps per second */
    simulationsPerSecond?: number;
}

export type PuzzleSimulationConstructor = new (...args: any[]) => PuzzleSimulation;

export abstract class PuzzleSimulation {
    /** An array of values that will initially be provided by the simulation on calls of readline */
    protected abstract initialOutputs: InitialOutputs;
    /**
     * A method that will be called when all initialOutputs have been used. 
     * Based on a provided input, it should compute the next available Output 
     */
    protected abstract computeNextOutput(lastSolution: CGInputOutput | null): CGInputOutput;

    private simulationSpeed: number;
    private lastSolution: CGInputOutput | null = null;

    private isStopped = false;
    private stopMessage = "";

    constructor(simulatorArgs: PuzzleSimulationArgs = {}) {
        const simulationsPerSecond = simulatorArgs.simulationsPerSecond ?? 1;
        this.simulationSpeed = 1000 / simulationsPerSecond;
    }

    public getNextOutput(): CGInputOutput {
        let nextOutput = this.initialOutputs.shift();
        if (nextOutput === undefined) {
            nextOutput = this.computeNextOutput(this.lastSolution);
        }
        return nextOutput.toString();
    }

    public getSimulationSpeed(): number {
        return this.simulationSpeed;
    }

    public getIsStopped(): boolean {
        return this.isStopped;
    }

    public getStopMessage(): string {
        return this.stopMessage;
    }

    public setSolution(input: CGInputOutput) {
        this.lastSolution = input;
    }

    protected stop(stopMessage: string): void {
        this.isStopped = true;
        this.stopMessage = stopMessage;
    }
}