//initiate variables
const player = {X:'x', O:'o', computer:'o'};

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
let stop = false;
let bot_mode = false;

//Prepare each box to receive moves
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (available[index] == 0 && !stop){
            
            if (currentPlayer === player.X) {
                button.innerHTML = 'X';
                available[index] = currentPlayer;
                checkWinner(currentPlayer);
                currentPlayer = player.O;
                
                
                
            }
            else {
                if (!bot_mode){
                    button.innerHTML = 'O';
                    available[index] = currentPlayer;
                    checkWinner(currentPlayer);           
                    currentPlayer = player.X;
                    console.log('bug')
                }
            }
            
            
            display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`)
            checkWinner(currentPlayer);

            if (check_available(available)) {
                stop = true;
                const timer =setTimeout(()=>{display('.text-display', '')}, 1000) 
                display('.text-display','Its a tie!')
                display('.text-display-2', '')
                setTimeout(()=>{refresh()}, 1000)
                 
                 
            }

            if (currentPlayer === player.O && bot_mode) {
                let move = computer_move(available);
                console.log(move)
                document.querySelector(`.box-space-${move}`).innerHTML = player.computer.toUpperCase();
                available[move] = player.computer;
                checkWinner(currentPlayer)
                currentPlayer = player.X;
                
                
                
            }


            
        }
        
    })
})


function check_available(array) {
    for (let i = 0;i<array.length;i++) {
        if (array[i] === 0){
            return false;
        }
        
    }
    return true;

}

function computer_move(moves){
    if (!stop){
    let possible_moves = [];
    moves.forEach((box, num) => {
        
        console.log(box,num)
        if (box === 0){
            possible_moves.push(num);
        }

    })
    if (possible_moves=== null){
        return 10
    }
    return possible_moves[Math.floor(Math.random() * possible_moves.length )];
    }
    return 10
}

//Display scores
function display(element, content) {
    document.querySelector(element).innerHTML = content;
}

function change_mode(){
    bot_mode == false ? bot_mode = true : bot_mode = false;
    let element = document.getElementById("bot-btn")
    element.classList.toggle("bot-button");
    if (bot_mode){
        element.innerHTML = 'Human' 
    }else {
        element.innerHTML = 'Bot'
    }
    
    refresh();

}


//function to check for winner
function checkWinner(player) {
    wins.forEach(win => {
        if (available[win[0]] == player && available[win[1]] == player && available[win[2]] == player) {
            stop = true
            const timer =setTimeout(()=>{display('.text-display', '')}, 1000) 
            display('.text-display', `${currentPlayer.toUpperCase()} Wins!`)
            currentPlayer == 'x' ? score.X += 1 : score.O +=1
            setTimeout(()=>{refresh()}, 1000)  
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
    stop = false;

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
