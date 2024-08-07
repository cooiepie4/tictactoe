let gameBoardContainer = document.querySelector(".gameBoardContainer")
let winnerStatement = document.querySelector("#winner")
let startButton = document.querySelector("#start")


let board = [
    ' ', ' ', ' ',' ', ' ', ' ',' ', ' ', ' ',
] 
let currentPlayer = 'X';

function populateBoard() {
    startButton.addEventListener('click', () => {
        gameBoardContainer.style.display = "block";
        startButton.style.display = "none";
    });
};

populateBoard(); 

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.innerHTML === '') { // Now 'cell' is accessible here
                cell.innerHTML = currentPlayer;
                const cellIndex = parseInt(cell.dataset.index);
                board[cellIndex] = currentPlayer; 
                currentPlayer = currentPlayer === 'X'? 'O':'X';
                const winner = checkWinner();
                if (winner) {
                    winnerStatement.innerHTML = `${winner} wins!`;

                } else if(checkDraw())
                    {winnerStatement.innerHTML = "It's a draw!"
            }
            }
        });
    });
});

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  
]

function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== ' ' && board[a] === board[b] && board[a] === board[c] // Then check for same symbol
        ) {
           return board[a];
        }
    }
    return null;
}

function checkDraw(){
    // Check if all board positions are filled
    for (let i = 0; i < board.length; i++) {
        if (board[i] === ' ') {
            return false; // Not a draw, there's an empty space
        }
    }
    // If no empty spaces, it's a draw
    return true;
}