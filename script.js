const boxes = 9;
const cols = 3;
const rows = 3;
let isFirstMove = true;
let currentRow = 1;
let currentCol = 1;
let currentPlayer = true;
let gameEnded = false;
let currentTheme = true;
let score = [0, 0];
let compliteLine = [0, 0];

function refreshScore() {
  document.getElementById("OScore").textContent = `"O" score: ${score[0]}`;
  document.getElementById("XScore").textContent = `"X" score: ${score[1]}`;
}

function buildBoxes() {
  for (let i = 1; i <= boxes; i++) {
    document.getElementById(`box${i}`).style.gridColumn = currentCol;
    document.getElementById(`box${i}`).style.gridRow = currentRow;
    document
      .getElementById(`box${i}`)
      .setAttribute("onclick", `boxClick(${i})`);
    currentCol++;
    if (currentCol > 3) {
      currentCol = 1;
      currentRow++;
    }
  }
}

function boxClick(boxId) {
  if (!gameEnded) {
    try {
      if (document.getElementById(`box${boxId}`).textContent == "") {
        switch (currentPlayer) {
          case true:
            document.getElementById(`box${boxId}`).textContent = "X";
            break;
          case false:
            document.getElementById(`box${boxId}`).textContent = "O";
            break;
        }

        checkForWin(currentPlayer);
        currentPlayer = !currentPlayer;
        isFirstMove = false;
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    document.getElementById(`whoWon`).textContent = "Game already ended!";
  }
}

function checkForWin(player) {
  for (let i = 1; i <= 7; i += 3) {
    if (
      document.getElementById(`box${i}`).textContent ==
        document.getElementById(`box${i + 1}`).textContent &&
      document.getElementById(`box${i + 1}`).textContent ==
        document.getElementById(`box${i + 2}`).textContent &&
      document.getElementById(`box${i}`).textContent != ""
    ) {
      compliteLine = [2, i];
      setLines(compliteLine);
      whoWins(player);
      return;
    }
  }
  for (let i = 1; i <= 3; i++) {
    if (
      document.getElementById(`box${i}`).textContent ==
        document.getElementById(`box${i + 3}`).textContent &&
      document.getElementById(`box${i + 3}`).textContent ==
        document.getElementById(`box${i + 6}`).textContent &&
      document.getElementById(`box${i}`).textContent != ""
    ) {
      compliteLine = [1, i];
      setLines(compliteLine);
      whoWins(player);
      return;
    }
  }
  if (
    document.getElementById(`box1`).textContent ==
      document.getElementById(`box5`).textContent &&
    document.getElementById(`box5`).textContent ==
      document.getElementById(`box9`).textContent &&
    document.getElementById(`box1`).textContent != ""
  ) {
    compliteLine = [3, 1];
    setLines(compliteLine);
    whoWins(player);
    return;
  }
  if (
    document.getElementById(`box3`).textContent ==
      document.getElementById(`box5`).textContent &&
    document.getElementById(`box5`).textContent ==
      document.getElementById(`box7`).textContent &&
    document.getElementById(`box3`).textContent != ""
  ) {
    compliteLine = [3, 2];
    setLines(compliteLine);
    whoWins(player);
    return;
  }
  if (
    document.getElementById(`box1`).textContent != "" &&
    document.getElementById(`box2`).textContent != "" &&
    document.getElementById(`box3`).textContent != "" &&
    document.getElementById(`box4`).textContent != "" &&
    document.getElementById(`box5`).textContent != "" &&
    document.getElementById(`box6`).textContent != "" &&
    document.getElementById(`box7`).textContent != "" &&
    document.getElementById(`box8`).textContent != "" &&
    document.getElementById(`box9`).textContent != "" &&
    !isFirstMove
  ) {
    document.getElementById(`whoWon`).textContent = "Draw!";
    gameEnded = true;
    score[0] = score[0] + 0.5;
    score[1] = score[1] + 0.5;
    refreshScore();
  }
}

function whoWins(player) {
  gameEnded = true;
  switch (player) {
    case false:
      document.getElementById("whoWon").textContent = '"O" won!';
      score[0] = score[0] + 1;
      break;
    case true:
      document.getElementById("whoWon").textContent = '"X" won!';
      score[1] = score[1] + 1;
      break;
  }
  refreshScore();
}

function changeTheme() {
  switch (currentTheme) {
    case false:
      document.body.setAttribute("data-theme", "dark");
      currentTheme = !currentTheme;
      break;
    case true:
      document.body.setAttribute("data-theme", "light");
      currentTheme = !currentTheme;
      break;
  }
}

function clearBoard() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`box${i}`).textContent = "";
    document.getElementById("colShortLine").setAttribute("data-hidden", "true");
    document.getElementById("rowShortLine").setAttribute("data-hidden", "true");
    document.getElementById("righLongLine").setAttribute("data-hidden", "true");
    document.getElementById("leftLongLine").setAttribute("data-hidden", "true");

    gameEnded = false;
    currentPlayer = true;
    isFirstMove = true;
    document.getElementById(`whoWon`).textContent = "";
  }
}

function setLines(line) {
  switch (line[0]) {
    case 1:
      document
        .getElementById("colShortLine")
        .setAttribute("data-hidden", "false");
      switch (line[1]) {
        case 1:
          document
            .getElementById("colShortLine")
            .setAttribute("data-line", "left");
          break;
        case 2:
          document
            .getElementById("colShortLine")
            .setAttribute("data-line", "middle");
          break;
        case 3:
          document
            .getElementById("colShortLine")
            .setAttribute("data-line", "right");
          break;
      }
      break;
    case 2:
      document
        .getElementById("rowShortLine")
        .setAttribute("data-hidden", "false");
      switch (line[1]) {
        case 1:
          document
            .getElementById("rowShortLine")
            .setAttribute("data-line", "left");
          break;
        case 2:
          document
            .getElementById("rowShortLine")
            .setAttribute("data-line", "middle");
          break;
        case 3:
          document
            .getElementById("rowShortLine")
            .setAttribute("data-line", "right");
          break;
      }
      break;
    case 3:
      switch (line[1]) {
        case 1:
          document
            .getElementById("rightLongLine")
            .setAttribute("data-hidden", "false");
          break;
        case 2:
          document
            .getElementById("leftLongLine")
            .setAttribute("data-hidden", "false");
          break;
      }
      break;
    default:
      console.log(`Wrong parms: ${line}`);
      break;
  }
}

buildBoxes();
refreshScore();
