function convertSpeedToPixelsPerSecond(speedInKmh) {
    const screenWidth = window.innerWidth;
    const metersToPixels = 0.05 * screenWidth;
    const speedInMs = speedInKmh * (1000 / 3600);
    const speedInPixelsPerSecond = speedInMs * metersToPixels;
    return speedInPixelsPerSecond;
}

function smoothScrollSequence(container, speedKmh, actions) {
    let currentActionIndex = 0;
    let startTime = null;
    let startScrollLeft = 0;
    const speed = convertSpeedToPixelsPerSecond(speedKmh) 

    function executeAction(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const currentAction = actions[currentActionIndex];
        const isLastAction = currentActionIndex === actions.length - 1;

        if (currentAction.type === 'scroll') {
            const distance = speed* (elapsed / 1000);

            if (isLastAction) {
                // const pixelsPerMeter = window.innerWidth * 0.05;

                // const distanceInPixels = currentAction.distance * pixelsPerMeter;
                // const totalTime = (distanceInPixels / (speed * pixelsPerMeter)) * 1000;
                // const progress = Math.min(elapsed / totalTime, 1);
                // const easeOut = 1 - Math.pow(1 - progress, 3);
                // container.scrollLeft = startScrollLeft + distanceInPixels * easeOut;
                const pixelsPerMeter = window.innerWidth * 0.05;
                const distanceInPixels = currentAction.distance * pixelsPerMeter;
                const totalTime = (distanceInPixels / speed) * 1000;
                const progress = Math.min(elapsed / totalTime, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                container.scrollLeft = startScrollLeft + distanceInPixels * easeOut;

                if (elapsed >= totalTime) {
                    currentActionIndex++;
                    startTime = null;
                    startScrollLeft = container.scrollLeft;
                }
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
