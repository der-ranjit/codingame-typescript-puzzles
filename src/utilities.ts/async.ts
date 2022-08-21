export async function sleep(time = 0): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), time));
}