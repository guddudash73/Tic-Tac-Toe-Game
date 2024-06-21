let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector(".new");
let resetbtn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".winner");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableboxes();
  msgContainer.classList.add("hide");
};

const disableboxes = () => {
  for (button of boxes) {
    button.disabled = true;
  }
};

const enableboxes = () => {
  for (button of boxes) {
    button.disabled = false;
    button.innerText = "";
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      draw();
    }
  });
});

const draw = () => {
  msg.innerText = "Its a Draw!";
  msgContainer.classList.remove("hide");
  disableboxes();
};

const showWinner = (win) => {
  msg.innerText = `Congratulations! Winner is ${win}`;
  msgContainer.classList.remove("hide");
  disableboxes();
};

const checkWinner = () => {
  for (pattern of winPatterns) {
    pos1val = boxes[pattern[0]].innerText;
    pos2val = boxes[pattern[1]].innerText;
    pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
};

resetbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);
