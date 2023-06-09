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
let stop = true;
var timer;
let bot_mode = false;
var player_audio = new Audio('tapo.mp3');
var r_audio = new Audio('tapx.mp3');
var win_audio = new Audio('win.wav');
var play_sound = true;
setTimeout(()=>{pop(".pop-up")},500);
//Prepare each box to receive moves
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (available[index] == 0 && !stop){
            
            if (currentPlayer === player.X) {
                button.innerHTML = 'X';
                player_audio.play();
                available[index] = currentPlayer;
                checkWinner(currentPlayer);
                currentPlayer = player.O;
                display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
                
                
                
            }
            else {
                if (!bot_mode){
                    button.innerHTML = 'O';
                    player_audio.play();
                    available[index] = currentPlayer;
                    checkWinner(currentPlayer);           
                    currentPlayer = player.X;
                    
                }
            }
            
            
            display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`)
            let over = checkWinner(currentPlayer);

            if (check_available(available)) {
                stop = true;
                const timer =setTimeout(()=>{display('.text-display', '')}, 1000)
                if (!over){
                pop_display(".winner", 'Its a tie!');
                r_audio.play();
                }
            }

            if (currentPlayer === player.O && bot_mode) {
                let move = computer_move(available);
                stop = true
                setTimeout(()=> {insert_move(move)},500);
                available[move] = player.computer;
                checkWinner(currentPlayer)                
                currentPlayer = player.X;
                
                
                
                
            }


            
        }
        
    })
})

function insert_move(move){
    document.querySelector(`.box-space-${move}`).innerHTML = player.computer.toUpperCase();
    stop = false;
    display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
    play_sound? player_audio.play(): null


}
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
    if(!stop) {
        bot_mode == false ? bot_mode = true : bot_mode = false;
        let element = document.getElementById("bot-btn")
        element.classList.toggle("bot-button");
        if (bot_mode){
            element.innerHTML = 'Human';
        document.getElementById("second-player").innerHTML = "Human";
        }else {
            element.innerHTML = 'Bot';
            document.getElementById("second-player").innerHTML = "Randombot";
        }
    
        refresh();
    }
}


//function to check for winner
function checkWinner(player) {
    wins.forEach(win => {
        if (available[win[0]] == player && available[win[1]] == player && available[win[2]] == player) {
            stop = true
            setTimeout(()=>{display('.text-display', '')}, 1000)
            pop_display(".winner", `${currentPlayer.toUpperCase()} Wins!`);
            win_audio.play();
            play_sound = false;
            currentPlayer == 'x' ? score.X += 1 : score.O +=1
            return true;
            
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
    play_sound = true;

}

//Delete scores
function replay() {
    if (!stop){
        score.O = 0;
        score.X = 0;
        refresh();
    }
}
display('.display', `<p>Scores:</p><p>X = ${score.X}</p><p>O = ${score.O}</p>`);

function pop(class_name) {
    document.querySelector(class_name).style.display = "block"; 
}
function pop_display(class_name, content) {
    const element = document.querySelector(class_name);
    var action = content === 'Its a tie!' ? "done_winner();change_player(currentPlayer);" : "done_winner();"
    element.style.display = "flex";
    element.innerHTML = `<p>${content}</p><button class="ok-btn" onclick=${action}>Ok</button>`;
    stop = true;
    timer = setTimeout(() =>{if (stop===true){done_winner()}}, 5000);
}
function done() {
    let screen = document.documentElement;
    document.querySelector(".pop-up").style.display = "none";
    refresh();
    stop = false;
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

    stop = false;
}


function change_player(currentPlayer) {
    currentPlayer = currentPlayer === "x" ? "o" : "x"
}
display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
