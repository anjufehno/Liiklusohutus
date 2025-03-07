import { smoothScrollSequence } from "./animation.js"
console.log(smoothScrollSequence);
const roadContainer = document.querySelector(".road")
let str = "";
let gap = 0
for (let i = 0; i < 250; i++) {
    if (i % 5 === 0 && i !== 0) {
        gap += 10;
        str += `<div><span>${gap}</span></div>`;
    } else {
        str += `<div></div>`;
    }
  
}
roadContainer.innerHTML = str


smoothScrollSequence(roadContainer, [
    { type: 'scroll', speed: 2778, duration: 2000 }, // Scroll at 100px/sec for 1 second
    { type: 'pause', duration: 1000 },              // Pause for 1 second
    { type: 'scroll', speed: 200, duration: 2000 }, // Scroll at 100px/sec for 2 seconds
    { type: 'pause', duration: 500 },               // Pause for 0.5 second
    { type: 'scroll', speed: 200, duration: 5000 }, // Scroll at 100px/sec with gradual slowing down
]);

function kmhToPxMs(speedKmh, screenWidth) {
    // 1 km/h = 1000 m / 3600 s = 1000 / 3600000 m/ms = 1 / 3.6 m/ms
    let speedMps = speedKmh / 3.6; // Speed in m/s
    let speedMms = speedMps / 1; // Speed in m/ms
    
    // 1 meter = 100 pixels
    let metersToPixels = 100;
    
    // Convert speed to pixels/ms
    let speedPxMs = speedMms * metersToPixels;
    
    return speedPxMs;
}

// Example usage:
let screenWidth = window.innerWidth; // Screen width in pixels
let speedKmh = 100; // Speed in km/h
let speedPxMs = kmhToPxMs(speedKmh, screenWidth);

console.log(`Speed ${speedKmh} km/h = ${speedPxMs.toFixed(2)} px/ms`);
