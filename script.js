/*You’re going to store the gameboard as an array inside of a Gameboard object, 
so start there! Your players are also going to be stored in objects… 
and you’re probably going to want an object to control the flow of the game itself.

Your main goal here is to have as little global code as possible. 
Try tucking everything away inside of a module or factory. 
Rule of thumb: if you only ever need ONE of something 
(gameBoard, displayController), use a module. If you need multiples of something 
(players!), create them with factories.*/

//1. Understand the problem: There should be a gameboard created.
//2 Players should be created. The 2 players should be able to set
//their marks one after the other on to the gameboard. When there is 
//a mark set on a place it should be impossible to set another mark on it. 
//If there are 3 in a row the game should stop and the winner should
//be displayed. It should be possible to restart the game.

//2. Make a Plan
            //Create a module named gameboard
            //Create inside gameboard an array named fieldsArray
            //Initialize fieldsArray with 9 times null
            //Create a method setMark with parameters mark and index
            //Let setMark put mark at the specified index
            //Create a factory function playerFactory
            //Create inside playerFactory a name and a mark property
            //Create the objects player1 and player2 with the help of playerFactory
            //(Later on player1 and player2 should be created during runtime, where real
            //Players can choose the names of their players)
            //Create a module displayController

            //Create inside displayController the function cacheDom
//Fill the function above with logic
            //Create inside displayController the function bindEvents
//Fill the function above with logic
            //Create inside displayController the function startGame
//Fill the function above with logic
            //Create inside displayController the function createPlayers
//Fill the function above with logic
            //Create inside displayController the function checkIfWin
//Fill the function above with logic
            //Create inside displayController the function endGame
//Fill the function above with logic
            //Create inside displayController the function resetGame
//Fill the function above with logic
            

//3. Divide the plan further and code

const gameboard = (function (){
    let fieldsArray = [null, null, null, null, null, null, null, null, null];
    function setMark (mark, index) {
        fieldsArray[index] = mark;
    }
    return {setMark};
})();

const playerFactory = (name, mark) => {
    return {name, mark}
};

const player1 = playerFactory('David', 'circle');
const player2 = playerFactory('Frey', 'cross');

const displayController = (function(){
    function cacheDom () {
        
    }

    function bindEvents () {

    }

    function startGame () {
        
    }

    function createPlayers () {
        
    }
   
    function checkIfWin () {

    }

    function endGame () {
        
    }

    function resetGame () {
        
    }

})();

