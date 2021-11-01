//CANVAS
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

//DOM PAGES
let startPage = document.querySelector('#start-page');
let gamePage = document.querySelector('#game');
let gameOverPage = document.querySelector('#gameover-page')

//DOM START AND RESTART BUTTONS
let startBtn = document.querySelector('#start-page');
let restartBtn = document.querySelector('#restart');

//IMAGES
let background = new Image();
background.src = './images/bg.jpg';

let santaEmptyL = new Image();
santaEmptyL.src = './images/santaemptyL-140x200.png';
let santaEmptyR = new Image();
santaEmptyR.src = './images/santaemptyR-140x200.png';
let santaL = new Image();
santaL.src = './images/santa-140x200lft.png';
let santaR = new Image();
santaR.src = './images/santa-140x200right.png';

let present1 = new Image();
present1.src = './images/p1.png';
let present2 = new Image();
present2.src = './images/p2.png';
let present3 = new Image();
present3.src = './images/p3.png';
let present4 = new Image();
present4.src = './images/p4.png';
let present5 = new Image();
present5.src = './images/p5.png';
let present6 = new Image();
present6.src = './images/p6.png';
let present7 = new Image();
present7.src = './images/p7.png';
let present8 = new Image();
present8.src = './images/p8.png';
let present9 = new Image();
present9.src = './images/p9.png';
let present10 = new Image();
present10.src = './images/p10.png';
let present11 = new Image();
present11.src = './images/p11.png';

//VARIABLES
let presents = [present1, present2, present3, present4, present5, present6, present7, present8, present9, present10, present11];
let present = (presents [Math.floor(Math.random()*presents.length)]);


let intervalId = 0;
let isGameOver = false;
let score = 0;
let falling = true;
let isLeft = false, isRight = false;

let santaX = 500, santaY = 350


//AUDIO
//let audio = nem Audio('')

//FALLING OBJECTS
function falling() {
    ctx.drawImage(present, Math.floor(Math.random()*960), 0)
    presents[i].x = 0;
    presents[i].y = presents[i].y + 2;
}

//GAME PAGE
function handleStart() {
    startPage.style.display = 'none';
    gamePage.style.display = 'block';
    draw()
    
}

function draw() {
    ctx.drawImage (background, 0, 0);
    ctx.drawImage (santaEmptyR, santaX, santaY);
}

//KEYS
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        ifLeft = true;
        isRight = false;
    }
    if (event.key == 'ArrowRight') {
        isRight = true;
        isLeft = false;
    }
})
document.addEventListener('keyup', () => {
    isLeft = false;
    isRight = false;
})

//ANIMATION
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()

    //ANIMATE SANTA
    if (isLeft) {
        santaX = santaX - 2;
    }
    if (isRight) {
        santaX = santaX + 2;
    }

    //GAMEOVER
    if (isGameOver) {
        cancelAnimationFrame(intervalId);
        gameOverPage.style.display = 'block';
        startPage.style.display = 'none';
        gamePage.style.display = 'none';
        finalscore.textContent = `You caught ${score} presents`;
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
}

//RESTART
function restart() {
    gameOverPage.style.display = 'none';
    isGameOver = false;
    score = 0
    handleStart()
}



window.addEventListener('load', () => {
    startPage.style.display = 'block';
    gamePage.style.display = 'none';
    gameOverPage.style.display = 'none';

    startBtn.addEventListener('click', () => {
        handleStart()
    })

    restartBtn.addEventListener('click', () => {
        restartBtn()
    })
        
})