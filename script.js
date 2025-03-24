import { smoothScrollSequence } from "./animation.js"
import { brakeDistance } from "./brakedistance.js"

const roadContainer = document.querySelector(".roadContainer")
const speedContainer = document.querySelector(".speedContainer")

start.disabled=true

let speed=0
let surface = 0;
const surfaceLabel = document.querySelector('label[for="surfaceContainer"]');

const arrSurface = [
    { value: 0.8, text: "Kuiv tee" },
    { value: 0.5, text: "Märg tee" },
    { value: 0.25, text: "Lumine tee" },
    { value: 0.1, text: "Jäätee" }
];

const buttonsSurface = [];
const surfaceContainer = document.querySelector(".surfaceContainer");

arrSurface.forEach(su => {
    const btn = document.createElement("button");
    btn.dataset.coeff = su.value;
    buttonsSurface.push(btn);
    surfaceContainer.append(btn);

    btn.onclick = function () {
        surface = su.value;
        surfaceLabel.textContent = `Valige teekate: ${su.text}`; // Обновляем текст label
        if (speed) start.disabled = false;
        const active = surfaceContainer.querySelector(".active");
        active?.classList.remove("active");
        btn.classList.add("active");
    };
});


const arrSpeed=[30,40,50,60,80,100,120]
const buttonsSpeed=[]
arrSpeed.forEach(s => {
    const btn = document.createElement("button")
    buttonsSpeed.push(btn)
    btn.textContent=s
    speedContainer.append(btn)
    btn.onclick= function(){
        speed=s
        if(surface) start.disabled=false
        const active=speedContainer.querySelector(".active")
        active?.classList.remove("active")
        btn.classList.add("active")
    }
});

let str = "";
let gap = 0
for (let i = 0; i < 250; i++) {
    if (i % 5 === 0 && i !== 0) {
        gap += 10;
        str += `<div><span>${gap} m</span></div>`;
    } else {
        str += `<div></div>`;
    }
  
}
roadContainer.innerHTML = str

start.disabled = true
start.onclick= function(){
    buttonsSpeed.forEach(b => b.disabled=true)
    buttonsSurface.forEach(b => b.disabled=true)
    const distance=brakeDistance(speed,surface)
    smoothScrollSequence(roadContainer, speed, [
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 1000, message:`Umbes sekund pärast takistuse märkamist alustab autojuht pidurdamist. Selle aja jooksul liigub auto ${Math.round(5*speed/18)} meetrit, kui kiirus on ${speed} km/h.` },
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 500, message: `Auto peatub 1 sekundi pärast pidurdamise algust. Pidurdusteekond on ${Math.round(distance)} meetrit.`  },
        { type: 'scroll', distance: distance},
    ]);
}
