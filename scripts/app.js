const startGame = document.querySelector('#start-game');
const gameGrid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.display-score');
const loseMessage = document.querySelector('.message');

const gridSize = 20;
let segments = [];
let mySnake = [];
let direction = null;
let foodPosition = null;
let interval = null;
let currentSpeed = 500;
let speedIncrease = 0.9;
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
    const emptySquares = segments.map((element, index) => index).filter(index => !mySnake.includes(index));
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
        currentSpeed = Math.max(100, currentSpeed * speedIncrease);
        interval = setInterval(moveSnake, currentSpeed);
        return true;
    }
    else {
        return false;
    }
}

const collisionCheck = (head) => {
    const leftHit = (mySnake[0] % gridSize === 0 && direction === -1);
    const rightHit = (mySnake[0] % gridSize === gridSize - 1 && direction === 1);
    const topHit = (mySnake[0] < gridSize && direction === -gridSize);
    const bottomHit = (mySnake[0] >= (gridSize * (gridSize - 1)) && direction === gridSize);
    const snakeHit = mySnake.includes(head);

    return leftHit || rightHit || topHit || bottomHit || snakeHit;
}

function moveSnake() {
    segments.forEach(segment => segment.classList.remove('snake'));
    const head = mySnake[0] + direction;

    if (collisionCheck(head)) {
        clearInterval(interval);
        loseMessage.textContent = `You Lose 🫤 Game Over! Final Score: ${score}`;
        startGame.textContent = 'Play Again'
        return;
    }

    mySnake.unshift(head);

    const foodEaten = eatFood(head);
    if (!foodEaten) {
        mySnake.pop();
    }
    showSnake();
}

const initGame = () => {
    clearInterval(interval);
    mySnake = [26, 25, 24];
    direction = 1;
    currentSpeed = 500;
    score = 0;
    scoreDisplay.textContent = `Your Score: ${score}`;
    startGame.textContent = 'Start Game';
    loseMessage.textContent = '';
    drawGrid(gridSize);
    showSnake();
    placeFood();
    interval = setInterval(moveSnake, currentSpeed);
}

startGame.addEventListener('click', initGame);

const controlDirection = (press) => {
    if (press.key === 'ArrowLeft' && direction !== 1) {
        direction = -1;
    }
    else if (press.key === 'ArrowRight' && direction !== -1) {
        direction = 1;
    }
    else if (press.key === 'ArrowUp' && direction !== gridSize) {
        direction = -gridSize;
    }
    else if (press.key === 'ArrowDown' && direction !== -gridSize) {
        direction = gridSize;
    }
}

document.addEventListener('keydown', controlDirection);