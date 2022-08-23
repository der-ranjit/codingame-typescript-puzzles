import { sleep } from "../utilities.ts/async";
import { PuzzleSimulationArgs, PuzzleSimulationConstructor } from "./PuzzleSimulation";
import { PuzzleSolverConstructor } from "./PuzzleSolver";

// checks if the correct environment variable has been set; see package.json script "simulation"
export function isSimulationEnvironment(): boolean {
    return typeof process.env.PUZZLESIMULATION !== "undefined"
}

export class PuzzleManager {
    public static log(value: any) {
        // only log in node environment or else it will break codingame puzzle
        if (!isSimulationEnvironment()) {
            return;
        }
        console.log("[SIMULATION LOG]: " + value);
    }

    public static async start<T>(
        puzzleSolverType: PuzzleSolverConstructor<T>,
        simulationType?: PuzzleSimulationConstructor,
        simulationArgs?: PuzzleSimulationArgs
    ) {
        if (simulationType && isSimulationEnvironment()) {
            PuzzleManager.simulatePuzzleInNodeEnvironment(puzzleSolverType, simulationType, simulationArgs);
        } else {
            PuzzleManager.solvePuzzleInCodingameIDE(puzzleSolverType);
        }
    }

    private static solvePuzzleInCodingameIDE<T>(puzzleSolverType: PuzzleSolverConstructor<T>): void {
        const puzzleSolver = new puzzleSolverType();
        if (puzzleSolver.isStepwisePuzzle()) {
            while (true) {
                // codingame expects a console.log as output for a solution 
                console.log(puzzleSolver.getNextSolution());
            }
        } else {
            console.log(puzzleSolver.getNextSolution())
        }
    }

    private static async simulatePuzzleInNodeEnvironment<T>(
        puzzleSolverType: PuzzleSolverConstructor<T>,
        simulationType: PuzzleSimulationConstructor,
        simulationArgs?: PuzzleSimulationArgs
    ): Promise<void> {
        const simulation = new simulationType(simulationArgs);
        // relay readline to simulator
        global.readline = () => simulation.getNextOutput();

        // create puzzleSolver only after readline has been relayed, since constructing a solver will also parse initial game input
        const puzzleSolver = new puzzleSolverType();

        if (puzzleSolver.isStepwisePuzzle()) {
            while (true) {
                const solution = puzzleSolver.getNextSolution();
                simulation.setSolution(solution);
                console.log(solution);
                if (simulation.getIsStopped()) {
                    console.log("Simulation stopped with message:");
                    console.log(simulation.getStopMessage());
                    break;
                }
                await sleep(simulation.getSimulationSpeed());
            }
        } else {
            const solution = puzzleSolver.getNextSolution();
            simulation.setSolution(solution);
            console.log(solution);
            if (simulation.getIsStopped()) {
                console.log("Simulation stopped with message:");
                console.log(simulation.getStopMessage());
            }
        }
    }
}