import { clamp } from "../../utilities.ts/math";
import { Vector2 } from "../../utilities.ts/Vector2";
import { InitialPuzzleInput, PuzzleSolver, StepwisePuzzleInput } from "../PuzzleSolver";

interface MarsLander1InitialInput extends InitialPuzzleInput {
    surfacePoints: Vector2[];
}

interface MarsLander1StepwiseInput extends StepwisePuzzleInput {
    vehiclePosition: Vector2;
    velocity: Vector2;
    // 0 <= remainingFuel <= 2000
    remainingFuel: number;
    // -90 <= rotationAngle <= 90
    rotationAngle: number;
    // 0 <= thrustPower <= 4 in m/s
    thrustPower: number;
}

// some game rules
const REQUIRED_LANDING_ANGLE = 0;
const MAX_VELOCITY = new Vector2(20, 40);
const MAX_POWER = 4;
const GRAVITY = 3.711;

type Surface = { start: Vector2, end: Vector2 };

export class MarsLander1Solver extends PuzzleSolver<MarsLander1InitialInput, MarsLander1StepwiseInput> {
    protected stepwisePuzzle = true;

    protected parseInitialGameInput(): MarsLander1InitialInput {
        const surfacePoints: Vector2[] = [];
        let numberOfSurfacePoints = parseInt(readline());
        for (let i = 0; i < numberOfSurfacePoints; i++) {
            surfacePoints.push(Vector2.from(readline()));
        }
        return { surfacePoints };
    }

    protected parseStepwiseGameInput(stepwiseCGInput: string): MarsLander1StepwiseInput {
        const inputArray = stepwiseCGInput.split(" ").map(value => parseInt(value));
        return {
            vehiclePosition: Vector2.from({ x: inputArray[0], y: inputArray[1] }),
            velocity: Vector2.from({ x: inputArray[2], y: inputArray[3] }),
            remainingFuel: inputArray[4],
            rotationAngle: inputArray[5],
            thrustPower: inputArray[6]
        };
    }

    private landingSurface = this.findSurface();
    private fullStopActivated = false;

    protected getSolutionForNextStep(stepwiseInput: MarsLander1StepwiseInput): string {
        return "0 " + this.slowdownWhenCriticalStrategy(stepwiseInput);
    }

    private slowdownWhenCriticalStrategy(stepwiseInput: MarsLander1StepwiseInput): number {
        const distanceToSurface = Math.abs(Vector2.sub(stepwiseInput.vehiclePosition, this.landingSurface.start).getY());
        const criticalDistance = this.getCriticialSlowdownHeightDistance(stepwiseInput);
        if (!this.fullStopActivated && distanceToSurface <= criticalDistance) {
            this.fullStopActivated = true;
        }
        return this.fullStopActivated ? MAX_POWER : 0;
    }

    /**
     * Returns the minimum height  distance needed to slow the rover to -MAX_VELOCITY.y (falling),
     * assuming the rover will break with maximum power
     */
    private getCriticialSlowdownHeightDistance(stepwiseInput: MarsLander1StepwiseInput): number {
        const currentVelocity = stepwiseInput.velocity.getY();
        // only consider falling
        if (currentVelocity >= 0) {
            return 0;
        }

        let power = stepwiseInput.thrustPower
        let nextVelocityY = currentVelocity + (power - GRAVITY);
        let distance = Math.abs(nextVelocityY);

        while (Math.abs(nextVelocityY) > MAX_VELOCITY.getY()) {
            // power can only increase by one per game step
            power = clamp(power + 1, 0, MAX_POWER);
            nextVelocityY = nextVelocityY + (power - GRAVITY);
            distance += Math.abs(nextVelocityY);
        }
        return distance;
    }

    private findSurface(): Surface {
        let landingSurface: Surface = {
            start: new Vector2(0, 0),
            end: new Vector2(0, 0)
        };
        const surfacePoints = this.initialInput.surfacePoints;
        
        for (let i = 0; i < surfacePoints.length; i++) {
            const point = surfacePoints[i];
            const nextPoint = surfacePoints[i + 1];
            if (nextPoint && point.getY() === nextPoint.getY()) {
                landingSurface = {
                    start: new Vector2(point.getX(), point.getY()),
                    end: new Vector2(nextPoint.getX(), nextPoint.getY())
                }
                break;
            }
        }
        return landingSurface;
    }
}