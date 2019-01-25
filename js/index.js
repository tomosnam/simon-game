let order = []; // El orden de colorres que se debe seguir en todo el juego.
let playerOrder = []; // El orden de colores que el judador juega.
let flash; // El orden que de colores que juega la computadora y siempre es correcto.
let turn; // Etapa del juego.
let good; // Si el jugador acepta.
let compTurn; // Si es el turno de la computadora.
let intervalId; // id de de la función setInterval() para limpiar el intervalo.
let strict = false; // Jugar en modo estricto, si el jugador se equivoca se empieza desde cero.
//let noise = true; // Si el jugador comete un error, entonces no se produce sonido.
let on = false; // Si el jugador puede jugar.
let win; // Si el jugador ganó.

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

onButton.addEventListener("click", turnOn);
startButton.addEventListener("click", startGame);
topLeft.addEventListener("click", handleTopLeft);
topRight.addEventListener("click", handleTopRight);
bottomLeft.addEventListener("click", handleBottomLeft);
bottomRight.addEventListener("click", handleBottomRight);

// Juggar en modo stricto o no.
strictButton.addEventListener("click", event => {
  if (strictButton.checked == true) strict = true;
  else strict = false;
});

// Encender el juego.
function turnOn(event) {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
}

function startGame(event) {
  if (on || win) {
    play();
  }
}

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }

  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false; // El jugador no puede jugar mientras la computadora juega.

  // Si turno de la computadora terminó?
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true; //El jugador puede jugar.
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function handleTopLeft(event) {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

function handleTopRight(event) {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

function handleBottomLeft(event) {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

function handleBottomRight(event) {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;
  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) play();
      else goCumputer();
    }, 800);

    //noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    turnCounter.innerHTML = turn;
    goCumputer();
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

function goCumputer() {
  compTurn = true;
  flash = 0;
  playerOrder = [];
  good = true;
  intervalId = setInterval(gameTurn, 800);
}

function one() {
  /*if (noise)
        let audio = document.getElementById('clip1');
        audio.play();
    }*/
  noise = true;
  topLeft.style.backgroundColor = "#795548";
}

function two() {
  /*if (noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }*/
  noise = true;
  topRight.style.backgroundColor = "#795548";
}
function three() {
  /*if (noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }*/
  noise = true;
  bottomLeft.style.backgroundColor = "#795548";
}

function four() {
  /*if (noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }*/
  noise = true;
  bottomRight.style.backgroundColor = "#795548";
}

function clearColor() {
  topLeft.style.backgroundColor = "#00897b";
  topRight.style.backgroundColor = "#ff5252";
  bottomLeft.style.backgroundColor = "#fdd835";
  bottomRight.style.backgroundColor = "#1976d2";
}

function flashColor() {
  topLeft.style.backgroundColor = "#795548";
  topRight.style.backgroundColor = "#795548";
  bottomLeft.style.backgroundColor = "#795548";
  bottomRight.style.backgroundColor = "#795548";
}
