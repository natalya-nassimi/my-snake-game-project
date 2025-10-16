// Submit an initial data structure of your game state along with your pseudocode.

// Pseudocode

/*-------------------------------- HTML --------------------------------*/

// Title
// Grid for the section in which the game is played
// Start button
// Restart button
// Score display
// Score / Lose statment display
// Highscore board?

/*-------------------------------- Variables --------------------------------*/

// Snake Position - will be represented by an array of coordinates to determine where it shows on the screen - index for each cell
// Snake length - number of parts of the segments currently
// The Food - coordinate of where the next piece of food shows up
// Players Score - will carry the number of food items eaten
// Speed - will determine how fast the snake moves (set using an interval time)
// Play state - boolean to determine win \ lose (whether the game is still going)
// Direction - will carry upwards, downwards, left or right, controlled by the keyboard arrows

/*------------------------ Cached Element References ------------------------*/

// Start button
// Restart button
// Score Display
// Grid section of the game
// Display section for You Scored: or You Lose!

/*-------------------------------- Functions --------------------------------*/

// Initialise game
//  1 Score at 0
//  2 Snake position on left of the screen
//  3 Snake direction moving towards the right of the screen
//  4 Random placement of the first piece of food
//  5 Game play state = true
//  6 Snake length starts at three segments
//  7 Initial speed of the snake measured by time interval of the loop

// Moving the snake
//  1 Move the first segment of the snake according to the direction pressed on the keyboard
//  2 Use event listeners from keyboard presses
//  3 Snake head repositions and the tail is removed
//  4 Check if food has been eaten

// Check collisions
//  1 Check for a collision with itself
//  2 Check for a collision with the walls
//  3 If collision end the game

// Placing the food
//  1 Random select of a position for the next piece of food

// Eat food
//  1 Food disappears
//  2 Snake length increases by 1 segments
//  3 Snake speed increases (reduce interval)
//  4 Score increases by 1

// Main game loop
//  1 Call Move snake
//  2 Call Place food

// Game over
//  1 Game play state = false
//  2 Clear grid
//  3 Display You lose! and Score

// Replay
//  1 When the restart button is clicked clear the grid
//  2 Call Initialise game function to start again

/*----------------------------- Event Listeners -----------------------------*/

// 4 Listeners 1 for each key: Up Down Left Right
// Start button click
// Restart button click


// Start Code Here

// Create Grid

const startGame = document.querySelector('#start-game')
const gameGrid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.display-score')
const gridSize = 20;
let segments = [];
let mySnake = [];
let direction = null;
let foodPosition = null;
let interval = null;
let currentSpeed = 500;
let speedIncrease = 0.95;
let score = 0;

const drawGrid = (size) => {
    gameGrid.innerHTML = '';
    segments = [];
    for (let i = 0; i < size * size; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        gameGrid.appendChild(segment);
        segments.push(segment);
    }
}

const showSnake = () => {
    mySnake.forEach(element => {
        segments[element].classList.add('snake');
    })
}

const placeFood = () => {
    const emptySquares = segments.map((unused, index) => index).filter(index => !mySnake.includes(index));
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    foodPosition = emptySquares[randomIndex];
    segments[foodPosition].classList.add('food');
}

const eatFood = (head) => {
    if (head === foodPosition) {
        segments[foodPosition].classList.remove('food')
        score++;
        scoreDisplay.textContent = `Your Score: ${score}`;
        placeFood();

        clearInterval(interval);
        currentSpeed = Math.max(100, currentSpeed*speedIncrease);
        interval = setInterval(moveSnake, currentSpeed);
        return true;
    }
    else {
        return false;
    }
}

const collisionCheck = (head) => {
    const leftHit = (mySnake[0] % gridSize === 0 && direction === -1);
    const rightHit = (mySnake[0] % gridSize === gridSize -1 && direction === 1);
    const topHit = (mySnake[0] < gridSize && direction === -gridSize);
    const bottomHit = (mySnake[0] >= (gridSize*(gridSize-1)) && direction === gridSize);
    const snakeHit = mySnake.includes(head);

    return leftHit || rightHit || topHit || bottomHit || snakeHit;
}

function moveSnake() {
    segments.forEach(segment => segment.classList.remove('snake'));
    const head = mySnake[0] + direction;

    if (collisionCheck(head)) {
        clearInterval(interval);
        alert (`You Lose 🫤 Game Over! Final Score: ${score}`) // change to HTML
        startGame.textContent = 'Play Again !'
        return;
    }

    mySnake.unshift(head);

    const foodEaten = eatFood(head);
    if (!foodEaten) {
        mySnake.pop();
    }
    showSnake();
}

// event listener for keyboard

const initGame = () => {
    clearInterval(interval);
    mySnake = [26, 25, 24];
    direction = 1;
    score = 0;
    scoreDisplay.textContent = `Your Score: ${score}`;
    startGame.textContent = 'Start Game';
    drawGrid(gridSize);
    showSnake();
    placeFood();
    interval = setInterval(moveSnake, currentSpeed);
}

startGame.addEventListener('click', initGame);