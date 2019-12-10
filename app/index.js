let scores, roundScore, activePlayer, previousPlayer;

let diceDOM1 = document.querySelector('.dice-1');
let diceDOM2 = document.querySelector('.dice-2');
let pigIcons = document.querySelectorAll('.pig');

let buttonRoll = document.querySelector('.btn-loop');
let buttonHold = document.querySelector('.btn-hand');
let buttonNewGame = document.querySelector('.btn-add-outline');

init();

buttonNewGame.addEventListener('click', init); 

// Roll the dice
buttonRoll.addEventListener('click', ()=> {
    let dice1 = createDiceDOM();
    let dice2 = createDiceDOM();
       
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
        scores[activePlayer - 1] = 0;
        
        // Update UI - Active player gets the GLOBAL score to 0
        document.getElementById(`player-score-${activePlayer}`).textContent = scores[activePlayer - 1];
        document.getElementById(`player-score-${activePlayer}`).classList.add('color-switch');

        // Update UI - Removes previous player color-switch style
        if (document.getElementById(`player-score-${previousPlayer}`).classList.contains('color-switch')) {
            document.getElementById(`player-score-${previousPlayer}`).classList.remove('color-switch');
        }

        nextPlayer();    
    }
});

// Hold the dice
buttonHold.addEventListener('click', ()=> {    

    //Update UI - Removes previous player color-switch style
    if (document.getElementById(`player-score-${previousPlayer}`).classList.contains('color-switch')) {
        document.getElementById(`player-score-${previousPlayer}`).classList.remove('color-switch');
    }

    // Add Current score to Global score
    scores[activePlayer - 1] += roundScore;

    // Update active player global score.
    document.getElementById(`player-score-${activePlayer}`).textContent = scores[activePlayer - 1];  

    // Check if the player won the game
    if (scores[activePlayer - 1] >= 20) {

        let winner = document.querySelector(`.player-name-${activePlayer}`).children;
        winner[0].textContent = 'Winner';
        winner[1].classList.toggle('d-none');
                
        diceDOM1.classList.add('d-none');
    } else {
        nextPlayer();
    }

});

function nextPlayer() {    
    let playerFontBold = 1;   
    
    roundScore = 0;

    if (activePlayer === 1) {
        activePlayer = 2;
        previousPlayer = 1;

    } else {
        activePlayer = 1;
        previousPlayer = 2;
    }

    // Update UI - Change the background color
    document.querySelector(`.panel__player-${activePlayer}`).style.backgroundColor = '#dfdfdf';    
    document.querySelector(`.panel__player-${previousPlayer}`).style.backgroundColor = '#fff';    
        
    // Add pig icon and set the font bold for the active player
    for (let i = 0; i < pigIcons.length; i++) {
        pigIcons[i].classList.toggle('d-none');
        document.querySelector(`.player-name-${playerFontBold}`).classList.toggle('font-weight-300');
        playerFontBold++ ;
    }

    // Reset both present player scores
    document.getElementById('present-score-1').textContent = 0;
    document.getElementById('present-score-2').textContent = 0;

    // Remove initial slide to top animation
    document.getElementById('player-score-1').classList.remove('move-to-top');
    document.getElementById('player-score-2').classList.remove('move-to-top');

    // Hide the dice
    diceDOM1.classList.add('d-none');
}

function createDiceDOM() {
    return Math.floor(Math.random() * 6) + 1;
}

function init() {
    let playerName1;
    let playerName2;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 1;
    previousPlayer = activePlayer;
    
    document.getElementById('player-score-1').textContent = 0;
    document.getElementById('player-score-2').textContent = 0;

    playerName1 = document.getElementById('player-1').getElementsByTagName('span');
    playerName2 = document.getElementById('player-2').getElementsByTagName('span');
    playerName1[0].textContent = 'Player 1';
    playerName2[0].textContent = 'Player 2';

    document.getElementById('player-score-1').classList.add('move-to-top');
    document.getElementById('player-score-2').classList.add('move-to-top');
    
    document.getElementById('present-score-1').textContent = 0;
    document.getElementById('present-score-2').textContent = 0;

    document.querySelector(`.panel__player-1`).style.backgroundColor = '#dfdfdf';    
    document.querySelector(`.panel__player-2`).style.backgroundColor = '#fff';

    diceDOM1.classList.add('d-none');

    pigIcons[0].classList.remove('d-none');
    pigIcons[1].classList.add('d-none');
    
    document.getElementById(`player-score-1`).classList.remove('color-switch');
    document.getElementById(`player-score-2`).classList.remove('color-switch');

    document.querySelector(`.player-name-1`).classList.add('font-weight-300');
    document.querySelector(`.player-name-2`).classList.remove('font-weight-300');
}