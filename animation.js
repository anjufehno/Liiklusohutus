function convertSpeedToPixelsPerSecond(speedInKmh) {
    const screenWidth = window.innerWidth;
    const metersToPixels = 0.05 * screenWidth;
    const speedInMs = speedInKmh * (1000 / 3600);
    const speedInPixelsPerSecond = speedInMs * metersToPixels;
    return speedInPixelsPerSecond;
}

function smoothScrollSequence(container, speed, actions) {
    let currentActionIndex = 0;
    let startTime = null;
    let startScrollLeft = 0;

    function executeAction(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const currentAction = actions[currentActionIndex];
        const isLastAction = currentActionIndex === actions.length - 1;

        if (currentAction.type === 'scroll') {
            const distance = convertSpeedToPixelsPerSecond(speed) * (elapsed / 1000);

            if (isLastAction) {
                const progress = Math.min(elapsed / currentAction.duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                container.scrollLeft = startScrollLeft + distance * easeOut;
            } else {
                
                container.scrollLeft = startScrollLeft + distance;
            }

            if (elapsed >= currentAction.duration) {
                currentActionIndex++;
                startTime = null;
                startScrollLeft = container.scrollLeft;
            }
        } else if (currentAction.type === 'pause') {
            
            if (elapsed >= currentAction.duration) {
                currentActionIndex++;
                startTime = null;
                startScrollLeft = container.scrollLeft;
            }
        }

        if (currentActionIndex < actions.length) {
            requestAnimationFrame(executeAction);
        }
    }

    requestAnimationFrame(executeAction);
}

export { smoothScrollSequence };
