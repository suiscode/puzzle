const container = document.getElementById("container");
var element = document.querySelector(".winner")

var rows = 3;
var col = 3;

var currBox;
var otherBox;

var turns = 0;
var win = false;

// GENERATE RANDOM PUZZLE //

const imgOrder = [];
const randomArrayGen = () => {
  while (imgOrder.length < 9) {
    const random = Math.floor(Math.random() * 9 + 1);
    if (!imgOrder.includes(random)) {
      imgOrder.push(random);
    }
  }
};
randomArrayGen();

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < rows; c++) {
      let box = document.createElement("img");
      box.id = `${r}-${c}`;
      box.src = "./" + imgOrder.shift() + ".png";
      box.className = "img";

      box.addEventListener("dragstart", dragStart);
      box.addEventListener("dragover", dragOver);
      box.addEventListener("dragenter", dragEnter);
      box.addEventListener("dragleave", dragLeave);
      box.addEventListener("drop", drop);
      box.addEventListener("dragend", dragEnd);

      container.append(box);
    }
  }

  checkwin();
};

// DRAG FUNCTIONS //

function dragStart() {
  currBox = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
}

function drop() {
  otherBox = this;
}

function dragEnd() {
    console.log(otherBox.src);
    if(!otherBox.src.includes(`http://127.0.0.1:5500/puzzle/3.png`)){
        return;
    }


  let currCoords = currBox.id.split("-");
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherBox.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let left = r == r2 && c2 == c - 1;
  let right = r == r2 && c2 == c + 1;

  let up = c == c2 && r2 == r - 1;
  let down = c == c2 && r2 == r + 1;

  let isAdj = left || right || up || down;

  if (isAdj) {
    let currImg = currBox.src;
    let otherImg = otherBox.src;

    currBox.src = otherImg;
    otherBox.src = currImg;
    turns++;
    document.getElementById("turn").innerHTML = turns;

    checkwin();
  }
}

// CHECK WIN //
function checkwin() {
  let rightArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let checkerArray = [];
  var container = document.getElementById("container");

  var imgElements = container.querySelectorAll(".img");

  for (let i = 0; i < imgElements.length; i++) {
    if (
      imgElements[i].src === `http://127.0.0.1:5500/puzzle/${i + 1}.png` ||
      imgElements[i].src === `./${i + 1}.png`
    ) {
      checkerArray.push(i + 1);
    } else {
      checkerArray.push(0);
    }
  }

  if (JSON.stringify(rightArray) == JSON.stringify(checkerArray)) {
    win = true;
    container.classList.add("disable");
    element.classList.add("show")
  }
}
