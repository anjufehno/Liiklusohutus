function smoothScrollSequence(container, actions) {
    let currentActionIndex = 0;
    let startTime = null;
    let startScrollLeft = 0;

    function executeAction(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const currentAction = actions[currentActionIndex];
        const isLastAction = currentActionIndex === actions.length - 1;

        if (currentAction.type === 'scroll') {
            // Calculate the scroll distance
            const distance = currentAction.speed * (elapsed / 1000); // Distance = speed * time

            if (isLastAction) {
                // Smooth deceleration for the last action
                const progress = Math.min(elapsed / currentAction.duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3); // Ease-out curve
                container.scrollLeft = startScrollLeft + distance * easeOut;
            } else {
                // Normal scroll with constant speed
                container.scrollLeft = startScrollLeft + distance;
            }

            // Check if the current action is complete
            if (elapsed >= currentAction.duration) {
                currentActionIndex++; // Move to the next action
                startTime = null;
                startScrollLeft = container.scrollLeft;
            }
        } else if (currentAction.type === 'pause') {
            // Check if the pause is complete
            if (elapsed >= currentAction.duration) {
                currentActionIndex++; // Move to the next action
                startTime = null;
                startScrollLeft = container.scrollLeft;
            }
        }

        // Continue the animation if there are more actions
        if (currentActionIndex < actions.length) {
            requestAnimationFrame(executeAction);
        }
    }

    // Start the animation
    requestAnimationFrame(executeAction);
}

export { smoothScrollSequence };
