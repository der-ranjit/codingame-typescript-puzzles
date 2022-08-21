type CodingameInput = number | string | boolean;
type CodingameOutput = string;
type SequentialOutputs = CodingameInput[];
type OutputComputer = (input: CodingameInput | null) => CodingameOutput;

export interface IOSimulatorArgs {
    /** An array of values that will initially be provided by the simulation on calls of readline */
    initialOutputs: SequentialOutputs,
    /**
     * A method that will be called when all initialOutputs have been used. 
     * Based on a provided input, it should compute the next available Output 
     */
    outputComputer: OutputComputer,
    /** Optional simulation speed in steps per second */
    simulationsPerSecond?: number;
}

export class IOSimulator {
    private initialOutputs: SequentialOutputs;
    private outputComputer: OutputComputer;
    private sequentialOutputs: SequentialOutputs;
    
    private lastInput: CodingameInput | null = null;
    private outputGenerator: Generator<CodingameOutput> = this.generator();
    private simulationSpeed: number;

    public static create(simulatorArgs?: IOSimulatorArgs): IOSimulator | null {
        // only allow simulation in node environment
        if (!simulatorArgs || typeof process.env.PUZZLESIMULATION === "undefined") {
            return null;
        }
        const simulator = new IOSimulator(simulatorArgs);
        // relay readline to simulator
        global.readline = () => simulator.getNextOutput();
        return simulator;
    }

    private constructor(simulatorArgs: IOSimulatorArgs) {
        this.initialOutputs = simulatorArgs.initialOutputs;
        this.outputComputer = simulatorArgs.outputComputer;
        this.sequentialOutputs = this.initialOutputs.slice();
        const simulationsPerSecond = simulatorArgs.simulationsPerSecond ?? 1;
        this.simulationSpeed = 1000/simulationsPerSecond;
    }

    public getSimulationSpeed(): number {
        return this.simulationSpeed;
    }

    public getNextOutput(): CodingameOutput {
        return this.outputGenerator.next().value;
    }

    private *generator(): Generator<CodingameOutput> {
        while (true) {
            let nextOutput = this.sequentialOutputs.shift();
            if (nextOutput === undefined) {
                nextOutput = this.outputComputer(this.lastInput);
            }
            yield nextOutput.toString();
        }
    }

    /**
     * Sets the last solution / input for simulation, which will be provided to the outputComputer method.
     */
    public setSolution(input: CodingameInput) {
        this.lastInput = input;
    }

    public log(value: any) {
        console.log("[SIMULATION LOG]: " + value);
    }
}