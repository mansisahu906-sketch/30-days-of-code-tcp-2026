const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
    let roundWon = false;

    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            roundWon = true;
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
        }
    });

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    let draw = [...cells].every(cell => cell.textContent !== "");
    if (draw) {
        statusText.textContent = "It's a draw 🤝";
        gameActive = false;
    }
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
}