/** Import the puzzle class you want to use and comment-out all other puzzles */
import { PuzzleManager } from "./codingame-puzzles/PuzzleManager";

// import { PuzzleExample as Puzzle } from "./codingame-puzzles/_example/PuzzleExample";
import { ShadowOfKnight1Solver as PuzzleSolver } from "./codingame-puzzles/shadow-of-the-knight-episode-1/ShadowOfKnight1Solver";
import { shadowOfKnight1SimulationArgs as simulationArgs } from "./codingame-puzzles/shadow-of-the-knight-episode-1/ShadowOfKnight1Simulation1";

PuzzleManager.start(PuzzleSolver, simulationArgs)
