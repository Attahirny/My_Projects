// set up the game board
const board = Array.from(document.querySelectorAll('.box-space'));
let score = {X:0, O:0};

// define players
const player1 = 'X';
const player2 = 'O';

let currentPlayer = player1;
let bot_mode = false;
var player_audio = new Audio('tapo.mp3');
var r_audio = new Audio('tapx.mp3');
var win_audio = new Audio('win.wav');
var play_sound = true;

//Set up running status, 
let gameStatus = "running";

//Display game scores
render(`<p>Scores:</p><p>X = ${score.X}</p><p>O = ${score.O}</p>`,'.display');

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
  render(`Its ${currentPlayer} Turn!`,'.text-display-2');
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
    play_sound? player_audio.play(): null;

    if (checkGameOver()) {
        const result = checkGameOver();
      if (result === 'tie') {
        pop_display(".winner", 'Its a tie!');
        r_audio.play();
        refresh();
        switchPlayers();
      } else {
        pop_display(".winner", `${currentPlayer} Wins!`);
        win_audio.play();
        play_sound = false;
        result === "X" ? score.X +=1 : score.O += 1;
        refresh();
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
    if (gameStatus){
      e.target.textContent = currentPlayer;
      player_audio.play();
    }
    if (checkGameOver()) {
      const result = checkGameOver();
      if (result === 'tie') {
        pop_display(".winner", 'Its a tie!');
        r_audio.play();
        refresh();
      } else {
        pop_display(".winner", `${currentPlayer} Wins!`);
        win_audio.play();
        play_sound = false;
        result === "X" ? score.X +=1 : score.O += 1;
        refresh();
      }
    } else {
      switchPlayers();
      if (bot_mode) {
        gameStatus = false;
        setTimeout(() => {gameStatus = true; gameStatus ? botMove() : null; }, 500);
      }
    }
  });
});




//Function to insert content to element using selector
function render(content, element) {
  document.querySelector(element).innerHTML = content;
};


//Function to refresh game 
function refresh(newGame=false) {
  //Reset score if new game requested
  if (newGame) {
    score = {X:0, O:0};
  } 

  for (let i = 0; i < board.length; i++) {
    //Make all cells empty
    board[i].textContent = "";
  }
  render(`<p>Scores:</p><p>X = ${score.X}</p><p>O = ${score.O}</p>`,'.display');
  currentPlayer = player1;  
  play_sound = true;
}

//Function to toggle second player
function change_mode(){
  bot_mode == false ? bot_mode = true : bot_mode = false;
  let element = document.getElementById("bot-btn")
  element.classList.toggle("bot-button");
  if (bot_mode){
      element.innerHTML = 'Human';
    document.getElementById("second-player").innerHTML = "Human";
  }else {
      element.innerHTML = 'Bot';
      document.getElementById("second-player").innerHTML = "Smartbot";
  }
  
  refresh(true);

}

function pop(class_name) {
    document.querySelector(class_name).style.display = "block"; 
}


function pop_display(class_name, content) {
    const element = document.querySelector(class_name);
    var action = content === 'Its a tie!' ? "done_winner();/*switchPlayers();*/" : "done_winner();"
    element.style.display = "flex";
    element.innerHTML = `<p>${content}</p><button class="ok-btn" onclick=${action}>Ok</button>`;
    //timer = setTimeout(() =>{done_winner()}, 5000);
}
function done() {
    let screen = document.documentElement;
    document.querySelector(".pop-up").style.display = "none";
    refresh();
    if (screen.requestFullscreen){
        screen.requestFullscreen();
    } else if (screen.webkitRequestFullscreen){
        screen.webkitRequestFullscreen();
    } else if (screen.msRequestFullscreen){
        screen.msRequestFullscreen();
    } 
}

function done_winner() {
    document.querySelector(".winner").style.display = "none";
    refresh()
    //Check for bot moving first
    if (board.every(cell => cell.textContent="") && currentPlayer === "O"){
        botMove();
    }
    
}

setTimeout(()=>{pop(".pop-up");render(`Its ${currentPlayer} Turn!`,'.text-display-2');},500);
