const playerFactory = (name, mark) => {
    return {name, mark}
};

Array.prototype.allSameValues = function () {
    if (this[0] === "") { return false; }
    for (let i = 1; i < this.length; i++) {
      if (this[i] !== this[0]) { return false; }
    } 
    return true;
}


const gameboard = (function (){

    let fieldsArray = ['', '', '', '', '', '', '', '', ''];

    function saveMarkInArray (mark, index) {
        fieldsArray[index] = mark;
    }
    
    function getMarks (){
        return fieldsArray;
    }

    function checkIfWin () {
        
        let win = false;

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const markersArray = gameboard.getMarks();

        winningCombos.forEach(arr => {
            const a = markersArray[arr[0]];
            const b = markersArray[arr[1]];
            const c = markersArray[arr[2]];
            if ([a, b, c].allSameValues()) {
                win = true;
                return;
            } 
          });

          return win;
    }

    function resetArray () {
        fieldsArray = ['', '', '', '', '', '', '', '', ''];
    }

    return {saveMarkInArray, getMarks, checkIfWin, resetArray};
})();


const displayController = (function(){

    const player1 = playerFactory('Player1', 'O');
    const player2 = playerFactory('Player2', 'X');
    let activePlayer = [player1, player2];

    //cacheDom
    let body = document.querySelector('body');
    let fieldsOfGame = body.querySelectorAll('.item');
    let freeSpotHint = body.querySelector('#hint');
    let winnerMessage = body.querySelector('#winner');
    let resetButton = body.querySelector('#reset');
    let namesForm = body.querySelector('#namesForm');
    let startButton = body.querySelector('#start');
    let namePlayer1 = body.querySelector('#player1');
    let namePlayer2 = body.querySelector('#player2');
    let yourTurn = body.querySelector('#yourTurn');
    let errorText = body.querySelector('#error');
    
    const bindListeners = (function () {
        const start = () => startButton.addEventListener('click', validateNames);

        const fields = () => fieldsOfGame.forEach (function(field) {
        field.addEventListener('click', validateField);
        });

        const reset = () => resetButton.addEventListener('click', resetGame);

        return{start, fields, reset}
    })();

    bindListeners.start();
    bindListeners.reset();

    function removeFieldListeners () {
        fieldsOfGame.forEach (function(field) {
            field.removeEventListener('click', validateField);
            });
    }

    function render () {
        let fieldArray = gameboard.getMarks();
        for(let i=0; i<=8; i++){      
            fieldsOfGame[i].innerHTML = fieldArray[i];        
        }
    }

    function startGame () {
        player1.name = namePlayer1.value;
        player2.name = namePlayer2.value;
        bindListeners.fields();
        namesForm.style.display = 'none';
        yourTurn.textContent = `${activePlayer[0].name}: your turn!`
    }

    function placeMarker (event) {
        let index = event.target.className[10];
        gameboard.saveMarkInArray(activePlayer[0].mark, index);
        render();
        if(gameboard.checkIfWin()){
            displayWinner(activePlayer[0].name);
            removeFieldListeners();
        } else {
            bindListeners.fields();
            changeActivePlayer();
        }
    }

    function changeActivePlayer () {
        activePlayer.reverse();
        yourTurn.textContent = `${activePlayer[0].name}: your turn!`
    }

    function displayWinner (name) {
        yourTurn.textContent = '';
        winnerMessage.innerHTML = `3 in a row! ${name} has won!`;
        resetButton.style.display = 'block';
    }

    function resetGame () {
        toogleError('none');
        winnerMessage.innerHTML = ``;
        resetButton.style.display = 'none';
        namesForm.style.display = 'block';
        gameboard.resetArray();
        render();
    }

    function validateNames () {
        (namePlayer1.value && namePlayer2.value) ? startGame() : toogleError('block');
    }

    function validateField (event) {
        if (event.target.innerHTML === '') {
            freeSpotHint.style.display = 'none';
            placeMarker(event)
        } else {
            freeSpotHint.style.display = 'block';
        }
    }

    function toogleError (displayValue) {
        errorText.style.display = displayValue;
    }
})();

