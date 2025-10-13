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

const gameGrid = document.querySelector('.grid');
const gridSize = 20;
let segments = [];

const drawGrid = (size) => {
    for (let i = 0; i < size * size; i++) {
        const segment = document.createElement('div');
        segment.classList.add('segment');
        gameGrid.appendChild(segment);
        segments.push(segment);
    }
}

drawGrid(gridSize);

let mySnake = [10, 9, 8];
let direction = '';
// if statements later to determine which direction was pressed
// event listener for keyboard

const showSnake = () => {
    mySnake.forEach(element => {
        segments[element].classList.add('snake');
    })
}
showSnake();

function moveSnake() {
    segments.forEach(segment => segment.classList.remove('snake'));
    const head = mySnake[0] + direction;
    mySnake.unshift(head);
    mySnake.pop();
    showSnake();

    // add eat food
}

// setInterval(moveSnake, 1000);

const placeFood = () => {
    const randomSegment = Math.floor(Math.random() * segments.length);
    segments[randomSegment].classList.add('food');

    // condition to make sure the food doesn't land in the snake?
}

placeFood(); // will actually be called in the moveSnake function