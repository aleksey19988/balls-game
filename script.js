const startGameBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timelist = document.querySelector('.time-list');
const timeEl = document.querySelector('#timer');
const board = document.querySelector('#board');

let time = null;
let scores = 0;

startGameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timelist.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});


function startGame() {
    setTime(time);
    setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.remove();
    board.innerHTML = `<h1>Твой счёт: <span class="primary">${scores}</span> &#128588;</h1>`
    const playAgainBtn = document.createElement('btn');
    playAgainBtn.innerHTML = 'Играть снова';
    playAgainBtn.classList.add('play-again-btn');
    board.append(playAgainBtn);
    
}

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = getRandomNumber(20, 100);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const backgroundColor = getRandomColor();

    circle.style.backgroundColor = backgroundColor;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.boxShadow = `0 0 10px 5px ${backgroundColor}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
    let min = 150;
    let max = 255;
    const red = getRandomNumber(min, max);
    const green = getRandomNumber(min, max);
    const blue = getRandomNumber(min, max);
    return `rgb(${red},${green},${blue})`;
}

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        board.innerHTML = ``;
        scores++;
        createRandomCircle();
    };
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('play-again-btn')) {
        location.reload();
    }
});