import { smoothScrollSequence } from "./animation.js"

const roadContainer = document.querySelector(".roadContainer")
const speedContainer = document.querySelector(".speedContainer")
const surfaceContainer = document.querySelector(".surfaceContainer")
start.disabled=true

let speed=0
let surface=0

const arrSurface=[0.1, 0.25, 0.5, 0.8]
const buttonsSurface=[]
arrSurface.forEach(su => {
    const btn = document.createElement("button")
    buttonsSurface.push(btn)
    btn.textContent=su
    surfaceContainer.append(btn)
    btn.onclick= function(){
        surface=su
        start.disabled=false
        buttonsSurface.forEach(b =>{
            if(btn!== b) b.disabled=true
        })
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
        start.disabled=false
        buttonsSpeed.forEach(b =>{
            if(btn!== b) b.disabled=true
        })
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

start.onclick= function(){
    smoothScrollSequence(roadContainer, speed,[
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 1000 },
        { type: 'scroll', duration: 2000 },
        { type: 'pause', duration: 500 },
        { type: 'scroll', duration: 5000 },
    ]);
}
