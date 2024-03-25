/* Initializing the Game State */
const board = document.getElementById('board')
let currentPlayer = 'X' //Player X always starts
let gameBoard = ['','','','','','','','','', ]
let gameActive = true


/* Check for wins,draws, and will handle player's turns */
function playerTurn(clickedSquareindex) {
    gameBoard[clickedSquareindex] = currentPlayer
    checkForWinOrDraw()
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X' 
}

/* Handling square clicks */
function squareClicked(clickedSquareEvent) {
    const clickedSquare = clickedSquareEvent.target
    const clickedSquareindex = parseInt(clickedSquare.id.replace('square-', '')) - 1 
    console.log(clickedSquare.id.replace('square-', ''));
    
    if(gameBoard[clickedSquareindex] !== '' || !gameActive) {
        return
    }

    playerTurn(clickedSquareindex)
    displaySquareValue()
}

/* Managing player interactions with an event listener */ 
const squares = document.querySelectorAll('.square') 
squares.forEach(square => { 
    square.addEventListener('click', squareClicked)
})

/* Displaying the Xs and Os on the board. */
function displaySquareValue() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerText = gameBoard[i]
    }
}

/* It will print on screen when there is a winner*/
function printWinner(player) {
    const messageElement = document.createElement('h2')
    messageElement.textContent = `Player ${player} Wins!`
    board.after(messageElement)

}

/* It will print on screen when there is a draw*/
function printDraw() {
    const messageElement = document.createElement('h2')
    messageElement.textContent =  `Game Draw!`
    board.after(messageElement)
}

/* Winning conditions*/
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
];

/* Checking for a win or draw */
function checkForWinOrDraw() {
    let roundWon = false
  
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i] //Using destructuring assigment
        
        /* Are they three in a row? */
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true
            break
        }
    }
  
    if (roundWon) {
        printWinner(currentPlayer);
        gameActive = false
        return
    }
  
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        printDraw()
        gameActive = false
        return
    }
}

/* Restart Game */

function restartGame() {

}




