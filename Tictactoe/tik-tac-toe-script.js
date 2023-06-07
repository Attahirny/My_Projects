//initiate variables
const player = {X:'x', O:'o'};
const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let score = {X:0, O:0};
let currentPlayer = player.X;
let buttons = document.querySelectorAll('.box-space');
let available = [0,0,0,0,0,0,0,0,0];
let moves = 0;


//Prepare each box to receive moves
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (available[index] == 0){
            moves += 1;
            if (currentPlayer === player.X) {
                button.innerHTML = 'X';
                available[index] = currentPlayer;
                checkWinner(currentPlayer);
                currentPlayer = player.O;
            }else {
                button.innerHTML = 'O';
                available[index] = currentPlayer;
                checkWinner(currentPlayer);           
                currentPlayer = player.X;
            }
            display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`)
            checkWinner(currentPlayer);
            if (moves >= 9) {
                const timer =setTimeout(()=>{display('.text-display', '')}, 1000) 
                display('.text-display','Its a tie!')
                display('.text-display-2', '')
                refresh();
            }
        }
        
    })
})

//Display scores
function display(element, content) {
    document.querySelector(element).innerHTML = content;
}


//function to check for winner
function checkWinner(player) {
    wins.forEach(win => {
        if (available[win[0]] == player && available[win[1]] == player && available[win[2]] == player) {
            const timer =setTimeout(()=>{display('.text-display', '')}, 1000) 
            display('.text-display', `${currentPlayer.toUpperCase()} Wins!`)
            currentPlayer == 'x' ? score.X += 1 : score.O +=1
            refresh(); 
            display('.text-display-2', '');
        }
    })
    return false
}

//function to refresh board
function refresh() {
    currentPlayer = player.X;
    available = [0,0,0,0,0,0,0,0,0];
    moves = 0;
    buttons.forEach((button) => {button.innerHTML = ''});
    display('.display', `<p>Scores:</p><p>X = ${score.X}</p><p>O = ${score.O}</p>`);
    display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);

}

//Delete scores
function replay() {
    score.O = 0;
    score.X = 0;
    refresh();
}
display('.display', `<p>Scores:</p><p>X = ${score.X}</p><p>O = ${score.O}</p>`);
display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
setTimeout(()=>{alert('Welcome to My game of Tic Tac Toe!\nLets play!')},1000);
