const squares = document.querySelectorAll(".square");
const button = document.querySelector("button");
let maxlevel = 30;
let currentLevel = 1;
let numberSquare = squares.length;
let step = 0;
let showing = true;
let playermove = [];
let combo = createCombo();
let comboPos = combo[0];
let speed = 300;
let can_continue = false;
let died = false;
let restart = false;

// square events
squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (showing == false) {
      id = parseInt(square.getAttribute("id").replace("square", ""));
      highlight(id);
      playermove.push(id);
      comparator = combo.slice(0, playermove.length);
      if (compare(comparator, playermove)) {
        if (playermove.length == currentLevel) {
          enableButton();
          can_continue = true;
          showing = true;
        }
      } else {
        dead();
      }
    }
  });
});

// button events
button.addEventListener("click", () => {
  if (can_continue) {
    nextLevel();
  }
});
function start() {
  disableButton();
  message("");
  button.innerHTML = "Continue";
  timeout = setTimeout(showSequence(), speed);
}

function dead() {
  died = true;
  enableButton();
  message("vous avez perdu !");
  button.style.display = "none";
  showing = true; // to disable buttons clicks
}

function nextLevel() {
  currentLevel++;
  speed *= 0.9;
  updateLevel();
  comboPos = combo[0];
  playermove = [];
  comparator = [];
  step = 0;
  start();
}

// create combo
function createCombo() {
  let combo = [];
  for (let i = 0; i < maxlevel; i++) {
    combo.push(Math.floor(Math.random() * numberSquare));
  }
  return combo;
}

// ia demonstration
function showSequence() {
  showing = true;
  if (step >= currentLevel) {
    showing = false;
    return;
  }
  setTimeout(() => {
    highlight(comboPos);
    step++;
    comboPos = combo[step];
    timeout = setTimeout(showSequence, speed * 0.8);
  }, speed * 1.9);
}

// square animation
function highlight(square) {
  squares[square].classList.toggle("active");
  setTimeout(() => {
    squares[square].classList.toggle("active");
  }, speed);
}

// animations effects html modifications
function enableButton() {
  button.setAttribute("can_click", "true");
  button.style.opacity = 1;
}

function disableButton() {
  button.setAttribute("can_click", "false");
  button.style.opacity = 0.5;
}

function message(newmsg) {
  msg.innerHTML = newmsg;
}

function updateLevel() {
  document.querySelector("#level").innerHTML = "Score: " + currentLevel;
}

// useful stuff
// comparing arrays
function compare(a, b) {
  return JSON.stringify(a) == JSON.stringify(b);
}
