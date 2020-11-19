//credit to mindovermiles262
Array.prototype.allSameValues = function () {
    if (this[0] === "") { return false; }
    for (let i = 1; i < this.length; i++) {
        if (this[i] !== this[0]) { return false; }
    }
    return true;
}

const playerFactory = (name, mark) => {
    return { name, mark }
};

const gameboard = (() => {
    let _fieldsArray = ['', '', '', '', '', '', '', '', ''];

    function saveMarkInArray(mark, index) {
        _fieldsArray[index] = mark;
    }

    function checkIfWin() {
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
        const markersArray = this.getMarks;

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

    function checkIfFull() {
        return this.getMarks.every((field) => field);
    }

    function resetArray() {
        _fieldsArray = ['', '', '', '', '', '', '', '', ''];
    }

    return { 
        get getMarks (){
            return _fieldsArray;
        },
        saveMarkInArray, checkIfWin, checkIfFull, resetArray 
    }
})();

const doDomStuff = ((board) => {

    //store DOM elements
    let body = document.querySelector('body');
    let fieldsOfGame = body.querySelectorAll('.item');
    fieldsOfGame = _convertToArray(fieldsOfGame);
    let freeSpotHint = body.querySelector('#hint');
    let winnerMessage = body.querySelector('#winner');
    let drawMessage = body.querySelector('#draw');
    let resetButton = body.querySelector('#reset');
    let namesForm = body.querySelector('#namesForm');
    let startButton = body.querySelector('#start');
    let _namePlayer1 = body.querySelector('#player1');
    let _namePlayer2 = body.querySelector('#player2');
    let yourTurn = body.querySelector('#yourTurn');
    let errorText = body.querySelector('#error');

    //bind and remove Listeners
    const _addStartListener = () => startButton.addEventListener('click', _validateNamesInput)
    const _addResetListener = () => resetButton.addEventListener('click', gameLogic.resetGame);
    const _addOneFieldListener = (oneField) => oneField.addEventListener('click', _validateField);
    const _addFieldsListener = () => fieldsOfGame.map(_addOneFieldListener)
    const _removeOneFieldListener = (oneField) => oneField.removeEventListener('click', _validateField);
    const _removeFieldsListener = () => fieldsOfGame.map(_removeOneFieldListener);

    function activateButtons() {
        _addStartListener();
        _addResetListener();
    }

    function startGame(callPlayer) {
        _addFieldsListener();
        _hideElement(namesForm);
        _displayYourTurn(callPlayer);
        _addFieldsListener();
    }

    function updateBoardDisplay() {
        let fieldArray = board.getMarks;
        fieldArray.forEach(_updateOneField);
    }

    function enableNextMove(callPlayer) {
        _addFieldsListener();
        _displayYourTurn(callPlayer);
    }

    function putGameOver() {
        _removeFieldsListener();
        _emptyYourTurn();
        _showElement(resetButton);
    }

    function resetDisplay() {
        updateBoardDisplay();
        _hideElement(winnerMessage);
        _hideElement(drawMessage);
        _hideElement(resetButton);
        _showElement(namesForm);
    }

    function displayWinner(name) {
        winnerMessage.style.display = 'block';
        winnerMessage.innerHTML = `3 in a row! ${name} has won!`;
    }

    function displayDraw() {
        drawMessage.style.display = 'block';
        drawMessage.innerHTML = 'It is a draw...';
    }

    function _validateNamesInput () {
        if (_namePlayer1.value && _namePlayer2.value) {
            _hideElement(errorText);
            gameLogic.startGame();
        } else {
            _showElement(errorText);
        }
    }

    function _updateOneField(currentField, index) {
        fieldsOfGame[index].innerHTML = currentField;
    }

    function _validateField(event) {
        if (event.target.innerHTML === '') {
            _hideElement(freeSpotHint);
            _placeMarkerPreparation(event);
        } else {
            _showElement(freeSpotHint);
        }
    }

    function _placeMarkerPreparation(e) {
        let indexClickedField = e.target.className[10];
        gameLogic.placeMarker(indexClickedField);
    }

    function _displayYourTurn(playerWhosTurn) {
        yourTurn.textContent = `${playerWhosTurn}: your turn!`;
    }

    function _emptyYourTurn() {
        yourTurn.textContent = '';
    }

    function _showElement(element) {
        element.style.display = 'block';
    }

    function _hideElement(element) {
        element.style.display = 'none';
    }

    function _convertToArray(listToConvert) {
        return Array.from(listToConvert);
    }

    return {
        get getNamePlayer1() {
            return _namePlayer1.value;
        },
        get getNamePlayer2() {
            return _namePlayer2.value;
        }, activateButtons, startGame, updateBoardDisplay,
        enableNextMove, displayWinner, displayDraw,
        putGameOver, resetDisplay
    }
})(gameboard);

const gameLogic = ((userInterface, board) => {

    const player1 = playerFactory('Player1', 'O');
    const player2 = playerFactory('Player2', 'X');
    let activePlayer = [player1, player2];

    function startGame() {
        player1.name = userInterface.getNamePlayer1;
        player2.name = userInterface.getNamePlayer2;
        userInterface.startGame(activePlayer[0].name);
    }

    function placeMarker(indexOfField) {
        board.saveMarkInArray(activePlayer[0].mark, indexOfField);
        userInterface.updateBoardDisplay();
        _decideNextGameAction();
    }

    function resetGame() {
        board.resetArray();
        userInterface.resetDisplay();
    }

    function _decideNextGameAction() {
        if (board.checkIfWin()) {
            userInterface.putGameOver();
            userInterface.displayWinner(activePlayer[0].name);
        } else if (board.checkIfFull()) {
            userInterface.putGameOver();
            userInterface.displayDraw();
        } else {
            _changeActivePlayer();
        }
    }

    function _changeActivePlayer() {
        activePlayer.reverse();
        userInterface.enableNextMove(activePlayer[0].name);
    }
    return {startGame, resetGame, placeMarker}
})(doDomStuff, gameboard);

doDomStuff.activateButtons();