function brakeDistance(speedKmH, mu) {
    const g = 9.81;
    const speedMs = speedKmH / 3.6;
    const distance = (speedMs * speedMs) / (2 * mu * g);
    return distance;
}
export {brakeDistance}