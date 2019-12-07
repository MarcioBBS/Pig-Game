let scores, roundScore, activePlayer;

let diceDOM1 = document.querySelector('.dice-1');
let diceDOM2 = document.querySelector('.dice-2');

let buttonRoll = document.querySelector('.btn-loop');
let buttonHold = document.querySelector('.btn-hand');
let buttonNewGame = document.querySelector('.btn-add-outline');

init();

// Roll the dice
buttonRoll.addEventListener('click', ()=> {
    let dice1 = createDiceDOM();
    let dice2 = createDiceDOM();

    // Get a random number from 1 to 6
    dice1 = Math.floor(Math.random() * 6) + 1;

    // Update dice picture source
    diceDOM1.src = `img/dice-${dice1}.png`;
    // Show dice
    diceDOM1.classList.remove('d-none');

    // Update the roundScore, which is the player present score in case the dice is different than 1
    if (dice1 !== 1) {
        // Add score
        roundScore+= dice1;
        document.querySelector(`#present-score-${activePlayer}`).textContent = roundScore;
    
    } else {
        // Player loses the global score
        roundScore = 0
        // Next player plays
        activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;

        // Change background-color and add/remove pig icon
        if (activePlayer === 1) {
            selectActivePlayer('.panel__player-1', '.panel__player-2') ;

        } else {
            selectActivePlayer('.panel__player-2', '.panel__player-1');
        }

        // Reset both present player scores
        document.getElementById('present-score-1').textContent = 0;
        document.getElementById('present-score-2').textContent = 0;
    }
});

function selectActivePlayer(player1, player2) {
    document.querySelector(player1).style.backgroundColor = '#dfdfdf';
    document.querySelector(player2).style.backgroundColor = '#fff';

    document.querySelector('.pig-1').classList.toggle('d-none');
    document.querySelector('.pig-2').classList.toggle('d-none');
}

function createDiceDOM() {
    return Math.floor(Math.random() * 6) + 1;
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 1;
    
    document.getElementById('player-score-1').textContent = 0;
    document.getElementById('player-score-2').textContent = 0;

    document.getElementById('present-score-1').textContent = 0;
    document.getElementById('present-score-2').textContent = 0;
}