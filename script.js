document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const message = document.getElementById("message");
  let currentPlayer = "X";
  let boardState = ["", "", "", "", "", "", "", "", ""];

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    if (!boardState.includes("")) {
      return "draw";
    }

    return null;
  }

  function handleClick(index) {
    if (boardState[index] || checkWinner()) return;

    boardState[index] = currentPlayer;
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = currentPlayer;
    board.appendChild(cell);

    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        message.textContent = "It's a draw!";
      } else {
        message.textContent = `${winner} wins!`;
      }
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  }
});
