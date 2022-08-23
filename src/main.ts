/** Import the puzzle class you want to use and comment-out all other puzzles */
import { PuzzleManager } from "./codingame-puzzles/PuzzleManager";

// import { PuzzleExample as Puzzle } from "./codingame-puzzles/_example/PuzzleExample";
// https://www.codingame.com/ide/puzzle/shadows-of-the-knight-episode-1
import { ShadowOfKnight1Solver } from "./codingame-puzzles/shadow-of-the-knight-episode-1/ShadowOfKnight1Solver";
import { ShadowOfKnight1Simulation1 } from "./codingame-puzzles/shadow-of-the-knight-episode-1/ShadowOfKnight1Simulation1";

// https://www.codingame.com/ide/puzzle/mars-lander-episode-1
import { MarsLander1Solver } from "./codingame-puzzles/mars-lander-episode-1/MarsLander1Solver";

// https://www.codingame.com/ide/puzzle/temperatures
import { TemperaturesSolver } from "./codingame-puzzles/temperatures/TemperatursSolver";

// PuzzleManager.start(ShadowOfKnight1Solver, ShadowOfKnight1Simulation1, { simulationsPerSecond: 2 })
PuzzleManager.start(MarsLander1Solver)
// PuzzleManager.start(TemperaturesSolver)