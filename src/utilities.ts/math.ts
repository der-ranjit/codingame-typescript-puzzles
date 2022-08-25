export function clamp(value: number, min: number, max: number): number {
    const minimum = Math.min(min, max);
    const maximum = Math.max(min, max);
    if (value < minimum) {
        return minimum
    } else if (value > maximum) {
        return maximum;
    }
    return value;
}