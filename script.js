import { smoothScrollSequence } from "./animation.js"
import { brakeDistance, arrSurface } from "./brakedistance.js"

const roadContainer = document.querySelector(".roadContainer")
const speedContainer = document.querySelector(".speedContainer")
const modal = document.getElementById("modal");
const textModal = document.getElementById("textModal");
const closeModal = document.getElementById("closeModal");

closeModal.onclick = ()=> modal.close();

start.disabled=true

let speed=0
let surface = 0;
const surfaceLabel = document.querySelector('label[for="surfaceContainer"]');


const buttonsSurface = [];
const surfaceContainer = document.querySelector(".surfaceContainer");

arrSurface.forEach(su => {
    const btn = document.createElement("button");
    btn.dataset.coeff = su.value;
    buttonsSurface.push(btn);
    surfaceContainer.append(btn);

    btn.onclick = function () {
        surface = su.value;
        surfaceLabel.textContent = `Valige teekate: ${su.text}`;
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
let complited = false
start.onclick= function(){
    if (complited) location.reload()
    start.disabled = true
    buttonsSpeed.forEach(b => b.disabled=true)
    buttonsSurface.forEach(b => b.disabled=true)
    const distance=brakeDistance(speed,surface)
    const reaction = Math.round(5*speed/18)
    const braking = Math.round(distance)
    smoothScrollSequence(roadContainer, speed, [
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 1000, message:`Umbes sekund pärast takistuse märkamist alustab autojuht pidurdamist. Selle aja jooksul liigub auto ${reaction} meetrit, kui kiirus on ${speed} km/h.` },
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 500, message: `Auto peatub 1 sekundi pärast pidurdamise algust. Pidurdusteekond on ${braking} meetrit.`  },
        { type: 'scroll', distance: distance},
    ], ()=> {
        complited = true
        start.disabled = false
        start.textContent = 'Alusta uuesti'
        modal.showModal();
        textModal.innerHTML = `
        <div><b>Reaktsiooniteekond:</b> ${reaction} m </div>
        <div><b>Pidurdusteekond:</b> ${braking} m </div>
        <div><b>Peatumisteekond:</b> ${braking+reaction} m </div>
        `
    });
}
