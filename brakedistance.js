const arrSurface = [
    { value: 0.8, text: "Kuiv tee" },
    { value: 0.5, text: "Märg tee" },
    { value: 0.25, text: "Lumine tee" },
    { value: 0.1, text: "Jäätee" }
];

function brakeDistance(speedKmH, mu) {
    const g = 9.81;
    const speedMs = speedKmH / 3.6;
    const distance = (speedMs * speedMs) / (2 * mu * g);
    return distance;
}
export {brakeDistance, arrSurface}