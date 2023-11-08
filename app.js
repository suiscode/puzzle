const rows = 3;
const col = 3;

let currBox;
let otherBox;

let turns= 0;

const imgOrder = [];
const randomArrayGen=()=>{
    while(imgOrder.length<9){
        const random = Math.floor(Math.random()*9+1)
        if(!imgOrder.includes(random)){
            imgOrder.push(random)
        }
    }
}
randomArrayGen()

window.onload =function(){
    for(let r= 0; r<rows; r++){
        for(let c= 0; c<rows; c++){
            let box = document.createElement("img");
            box.id= `${r}-${c}`
            box.src="./" + imgOrder.shift() + '.png'

            box.addEventListener('dragstart', dragStart)
            box.addEventListener('dragover', dragOver)
            box.addEventListener('dragenter', dragEnter)
            box.addEventListener('dragleave', dragLeave)
            box.addEventListener('drop', drop)
            box.addEventListener('dragend', dragEnd)

            document.getElementById("container").append(box)
        }
    }
    console.log('ran');
    
}

function dragStart(){
    currBox=this
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragLeave(e){
    e.preventDefault()
}

function drop(){
    otherBox=this
}

function dragEnd(){
    let currImg = currBox.src
    let otherImg = otherBox.src

    currBox.src = otherImg
    otherBox.src = currImg
}
