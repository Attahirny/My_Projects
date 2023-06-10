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
let possible_moves = [];
let stop = true;
let bot_mode = false;

setTimeout(()=>{notify()},500);
//Prepare each box to receive moves
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        if (available[index] == 0 && !stop){
            // X Players
            if (currentPlayer === player.X) {
                button.innerHTML = 'X';
                available[index] = currentPlayer;
                checkWinner(currentPlayer);
                currentPlayer = player.O;
                display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
                
                
                
            }
            // O Players When Not Bot
            else {              
                if (!bot_mode){
                    button.innerHTML = 'O';
                    available[index] = currentPlayer;
                    checkWinner(currentPlayer);           
                    currentPlayer = player.X;
                    
                }
            }
            
            
            display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`)
            checkWinner(currentPlayer);

            // check tie
            if (!Contains(0, available)) {console.log('pass');
                stop = true;
                const timer =setTimeout(()=>{display('.text-display', '')}, 1000) 
                display('.text-display','Its a tie!')
                display('.text-display-2', '')
                setTimeout(()=>{refresh()}, 1000)
                 
                 
            }
            // Bot plays O 
            if (currentPlayer === player.O && bot_mode) {
                let move_com = computer_move(available);
                console.log(move_com)
                stop = true
                setTimeout(()=> {insert_move(move_com)},500);
                last_move = move_com;
                available[move_com] = player.computer;
                checkWinner(currentPlayer)
                currentPlayer = player.X;                  
                
            }          
        }        
    })
})


function insert_move(num){
    document.querySelector(`.box-space-${num}`).innerHTML = player.computer.toUpperCase();
    stop = false;
    display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);


}

let choose_win;
let choosen = false;
let move;
let last_move;
/*
function computer_move(moves){
    if (!stop){
        update_possible_moves();                
        let losing = get_strategy().losing_place;
        let winning = get_strategy().winning_places;
        if (possible_moves.length === 0 || possible_moves === null){
            console.log(possible_moves)
            return 10
        }
        if(check_losing(losing).state){
            console.log('loosing!')
            return  check_losing(losing).value;
        }
        else if (about_to_win(available)){
            console.log('winning!')
            return move;
        }
        else if (!choosen && winning !== []){
            console.log('Target win')
            let place = arrange(winning)[Math.floor(Math.random() * arrange(winning).length)];
            let common_places = [];
            winning.forEach(val => {
                if (Contains(place, val)){
                    common_places.push(val);         
                }
            })
            choose_win = common_places[Math.floor(Math.random() * common_places.length)]
            choosen = true;
            return place;
        }
        else if (choosen && still_available(choose_win)) { console.log(still_available(choose_win), choose_win);           
                let j = choose_win
                choose_win.forEach(box=>{
                    if (box === last_move) {
                        console.log(last_move)
                        j.pop(last_move);
                    }
                })
                console.log(j)
                return j[Math.floor(Math.random() * j.length)];
            
        }
        else {
            choosen = false;
            console.log('Random')
            return possible_moves[Math.floor(Math.random() * possible_moves.length )];
            
            
        }

    }
    
    return 10
}
*/
function computer_move(){
    let choose_win = null;
    if (!stop){
        update_possible_moves();                
        let losing = get_strategy().losing_place;
        let winning = get_strategy().winning_places;
        if (possible_moves.length === 0 || possible_moves === null){
            return 10
        }
        if(check_losing(losing).state){
            return check_losing(losing).value;
        }
        else if (about_to_win(available)){S
            return move;
        }
        else if (!choosen && winning.length !== 0){
            let place = arrange(winning)[Math.floor(Math.random() * arrange(winning).length)];
            let common_places = [];
            winning.forEach(val => {
                if (Contains(place, val)){
                    common_places.push(val);         
                }
            })
            choose_win = common_places[Math.floor(Math.random() * common_places.length)]
            choosen = true;
            return place;
        }
        else if (choosen && still_available(choose_win)) {
            let j = choose_win
            choose_win.forEach(box=>{
                if (box === last_move) {
                    j.pop(last_move);
                }
            })
            return j[Math.floor(Math.random() * j.length)];
        }
        else {
            choosen = false;
            return possible_moves[Math.floor(Math.random() * possible_moves.length )];
        }
    }
    return 10
}

function still_available(array){
    for (let item=0;item<array.length;item++){    
        if (available[item] === 'x'){
            return false;
        }
    }    
    return true;
}

function arrange(nested_array){
    let container = [];
    nested_array.forEach(array=>{
        array.forEach(value=>{
            container.push(value);
        })
    })
    return container;

}

function check_losing(losing){
    
    for (let i = 0; i < losing.length; i++){
        let a = [];
        let x = [];
        let z = [];
        losing[i].forEach(value => {
            if (available[value] === 'x'){
                x.push(value);
            }else {
                a.push(value);
            }
            if (x.length >= 2){
                z.push(value);
            }
        })

        if (x.length >= 2){
            return {value:a[0], state:true, array:z};
        }

    }
    return {value:null, state:false};
}

function update_possible_moves (){
    possible_moves = [];
    //Fill Array
    available.forEach((box, num) => {       
        if (box === 0){
            possible_moves.push(num);
        }
    })
    
}

function get_strategy(){
    let winning_places = [];
    let losing_place = [];
    //Get filtered moves
    wins.forEach((win)=>{
        if (Contains(win[0], possible_moves) && Contains(win[1], possible_moves) && Contains(win[2], possible_moves)) {
            winning_places.push(win);              
        }
        if (check_losing(wins).state){
            losing_place.push(check_losing(wins).array);
        }
        
    })
    return {winning_places:winning_places, losing_place:losing_place};
}

function about_to_win(available) {
    wins.forEach((win) => {
        if (available[win[0]] == player.X && available[win[1]] == player.X) {
            move =  win[2];
            return true;
          
        }
        if (available[win[1]] == player.X && available[win[2]] == player.X) {
            move = win[0];
            return true;
        }
        if (available[win[0]] == player.X && available[win[2]] == player.X) {
            move = win[1];
            return true;
        }

    })
    return false
}



//Display scores
function display(element, content) {
    document.querySelector(element).innerHTML = content;
}

function Contains(obj, array){
    for (let i = 0; i < array.length; i++){
        if(array[i] == obj){
            return true;
        }
    }
    return false;

}

function change_mode(){
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


function notify(){
    alert('Welcome to My game of Tic Tac Toe!\nLets play!');
    stop = false;


}
display('.text-display-2', `Its ${currentPlayer.toUpperCase()} Turn!`);
