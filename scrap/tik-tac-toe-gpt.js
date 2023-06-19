// set up the game board
const board = Array.from(document.querySelectorAll('.cell'));

// define players
const player1 = 'X';
const player2 = 'O';

let currentPlayer = player1;

// function to check if game is over
function checkGameOver() {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i].textContent && board[i].textContent === board[i+1].textContent && board[i+1].textContent === board[i+2].textContent) {
      return board[i].textContent;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (board[i].textContent && board[i].textContent === board[i+3].textContent && board[i+3].textContent === board[i+6].textContent) {
      return board[i].textContent;
    }
  }
  // check diagonals
  if (board[0].textContent && board[0].textContent === board[4].textContent && board[4].textContent === board[8].textContent) {
    return board[0].textContent;
  }
  if (board[2].textContent && board[2].textContent === board[4].textContent && board[4].textContent === board[6].textContent) {
    return board[2].textContent;
  }
  // check tie game
  const isTie = board.every(cell => cell.textContent);
  if (isTie) {
    return 'tie';
  }
  return false;
}

// function to switch players
function switchPlayers() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

// Function to calculate the score for each possible move
function minimax(board, depth, maximizingPlayer) {
  // Base cases: check if the game is over or if the maximum depth is reached
  const gameOverResult = checkGameOver();
  if (gameOverResult === 'tie') {
    return 0;
  }
  if (gameOverResult === 'X') {
    return depth - 10;
  }
  if (gameOverResult === 'O') {
    return 10 - depth;
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    // Loop through all empty cells
    for (let i = 0; i < board.length; i++) {
      if (!board[i].textContent) {
        // Make a move for the maximizing player (bot)
        board[i].textContent = player2;
        // Recursively call the minimax function for the opponent
        const eval = minimax(board, depth + 1, false);
        // Undo the move
        board[i].textContent = '';
        // Update the maximum evaluation value
        maxEval = Math.max(maxEval, eval);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    // Loop through all empty cells
    for (let i = 0; i < board.length; i++) {
      if (!board[i].textContent) {
        // Make a move for the minimizing player (human)
        board[i].textContent = player1;
        // Recursively call the minimax function for the opponent
        const eval = minimax(board, depth + 1, true);
        // Undo the move
        board[i].textContent = '';
        // Update the minimum evaluation value
        minEval = Math.min(minEval, eval);
      }
    }
    return minEval;
  }}
  
// Updated botMove function using the minimax algorithm
function botMove() {
    // Loop through all empty cells
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
    if (!board[i].textContent) {
    // Make a move for the maximizing player (bot)
    board[i].textContent = player2;
    // Calculate the score for the current move using the minimax algorithm
    const score = minimax(board, 0, false);
    // Undo the move
    board[i].textContent = '';
    // Update the best score and move
    if (score > bestScore) {
    bestScore = score;
    bestMove = i;
    }
    }
    }
    // Make the best move
    board[bestMove].textContent = player2;
    
    if (checkGameOver()) {
    const result = checkGameOver();
    if (result === 'tie') {
    alert('Tie game!');
    } else {
    alert(${result} wins!);
    }
    } else {
    switchPlayers();
    }
    }
    
    // add event listener for cell clicks
    board.forEach(cell => {
    cell.addEventListener('click', e => {
    if (e.target.textContent) {
    return;
    }
    e.target.textContent = currentPlayer;
    if (checkGameOver()) {
    const result = checkGameOver();
    if (result === 'tie') {
    alert('Tie game!');
    } else {
    alert(${result} wins!);
    }
    } else {
    switchPlayers();
    setTimeout(botMove, 1000);
    }
    });
    });
