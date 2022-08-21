import { sleep } from "../utilities.ts/async";
import { IOSimulator, IOSimulatorArgs } from "../utilities.ts/IOSimulator";

export interface GameInput {
    readonly [key: string]: any;
}

export abstract class Puzzle<T extends GameInput> {
    /** Used to setup initial game input by codingame puzzle (or simulation) */
    protected abstract initializeGameInput(): T;
    /** Handles continuos input by codingame. Should always log some kind of string, formatted to the puzzle's requirements. */
    protected abstract handleCGInputAndOutputSolution(): string;
    
    /** initial gameInput; available when constructing the class has finished */
    protected gameInput: T;

    /** simulator created by provided simulatorArgs. will only be set in a node environment */
    protected simulator: IOSimulator | null;

    constructor(simulatorArgs?: IOSimulatorArgs) {
        this.simulator = IOSimulator.create(simulatorArgs);
        this.gameInput = this.initializeGameInput();
    }

    public async start() {
        while (true) {
            const solution = this.handleCGInputAndOutputSolution();
            // codingame expects a console.log as output for a solution 
            console.log(solution);

            if (this.simulator != null) {
                this.simulator.setSolution(solution);
                await sleep(this.simulator.getSimulationSpeed());
            }
        }
    }
}