/** Import the puzzle class you want to use and comment-out all other puzzles */

// import { PuzzleExample as Puzzle } from "./codingame-puzzles/_example/puzzleExample";
import { ShadowKnightEp1 as Puzzle } from "./codingame-puzzles/shadow-of-the-knight-episode-1/solution";
import { shadowOfKnightEp1SimulationArgs as simulationArgs } from "./codingame-puzzles/shadow-of-the-knight-episode-1/simulation";

new Puzzle(simulationArgs).start();
