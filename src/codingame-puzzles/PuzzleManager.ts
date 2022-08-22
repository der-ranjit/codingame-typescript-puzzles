import { sleep } from "../utilities.ts/async";
import { PuzzleSimulation, PuzzleSimulationArgs } from "./PuzzleSimulation";
import { PuzzleSolverConstructor } from "./PuzzleSolver";

// checks if the correct environment variable has been set; see package.json script "simulation"
export function isNodeEnvironment(): boolean {
    return typeof process.env.PUZZLESIMULATION !== "undefined"
}

export class PuzzleManager {
    public static log(value: any) {
        // only log in node environment or else it will break codingame puzzle
        if (!isNodeEnvironment()) {
            return;
        }
        console.log("[SIMULATION LOG]: " + value);
    }

    public static async start<T>(
        puzzleSolverType: PuzzleSolverConstructor<T>,
        simulationArgs?: PuzzleSimulationArgs
    ) {
        if (simulationArgs && isNodeEnvironment()) {
            PuzzleManager.simulatePuzzleInNodeEnvironment(puzzleSolverType, simulationArgs);
        } else {
            PuzzleManager.solvePuzzleInCodingameIDE(puzzleSolverType);
        }
    }

    private static solvePuzzleInCodingameIDE<T>(puzzleSolverType: PuzzleSolverConstructor<T>): void {
        const puzzleSolver = new puzzleSolverType();
        while (true) {
            // codingame expects a console.log as output for a solution 
            console.log(puzzleSolver.getNextSolution());
        }
    }

    private static async simulatePuzzleInNodeEnvironment<T>(
        puzzleSolverType: PuzzleSolverConstructor<T>,
        simulationArgs: PuzzleSimulationArgs
    ): Promise<void> {
        const simulation = new PuzzleSimulation(simulationArgs);
        if (simulation == null) {
            return;
        }

        // relay readline to simulator
        global.readline = () => simulation.getNextOutput();
        // create puzzleSolver only after readline has been relayed, since constructing a solver will also parse initial game input
        const puzzleSolver = new puzzleSolverType();
        while (true) {
            const solution = puzzleSolver.getNextSolution();
            simulation.setSolution(solution);
            console.log(solution);
            await sleep(simulation.getSimulationSpeed());
        }
    }
}