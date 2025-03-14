import { smoothScrollSequence } from "./animation.js"
import { brakeDistance } from "./brakedistance.js"

const roadContainer = document.querySelector(".roadContainer")
const speedContainer = document.querySelector(".speedContainer")
const surfaceContainer = document.querySelector(".surfaceContainer")
start.disabled=true

let speed=0
let surface=0

const arrSurface=[0.8, 0.5, 0.25, 0.1]
const buttonsSurface=[]
arrSurface.forEach(su => {
    const btn = document.createElement("button")
    buttonsSurface.push(btn)
    btn.textContent=su
    surfaceContainer.append(btn)
    btn.onclick= function(){
        surface=su
        if(speed) start.disabled=false
        const active=surfaceContainer.querySelector(".active")
        active?.classList.remove("active")
        btn.classList.add("active")
    }
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
        str += `<div><span>${gap}</span></div>`;
    } else {
        str += `<div></div>`;
    }
  
}
roadContainer.innerHTML = str

start.disabled = true
start.onclick= function(){
    buttonsSpeed.forEach(b => b.disabled=true)
    buttonsSurface.forEach(b => b.disabled=true)
    smoothScrollSequence(roadContainer, speed, [
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 1000 },
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 500 },
        { type: 'scroll', distance: brakeDistance(speed,surface) },
    ]);
}
