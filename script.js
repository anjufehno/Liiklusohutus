const roadContainer = document.querySelector(".road")
let str = "";
let gap = 0
for (let i = 0; i < 250; i++) {
    if (i % 5 === 0 && i !== 0) {
        gap += 10;
        str += `<div><span>${gap}</span></div>`;
    } else{
        str += `<div></div>`;
    }
  
}
roadContainer.innerHTML = str