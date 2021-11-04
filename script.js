//CANVAS
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '4px solid white';

//DOM PAGES
let startPage = document.querySelector('#start-page');
let gamePage = document.querySelector('#game');
let gameOverPage = document.querySelector('#gameover-page')

//DOM START AND RESTART BUTTONS
let startBtn = document.querySelector('#start-btn');
let restartBtn = document.querySelector('#restart');

let finalScore = document.querySelector('#final-score');

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

let rock = new Image();
rock.src = './images/rock-50x50.png';
let log = new Image();
log.src = './images/log1.png';
let pinha = new Image();
pinha.src = './images/pinha.png'

let levelUp = new Image();
levelUp.src = './images/levelUp.png'

//AUDIO
let music = new Audio();
music.src = './audio/SantasToyFactory.mp3';
music.volume = 0.1;
let auch = new Audio();
auch.src = './audio/auch.mp3'
auch.volume = 0.1;

//VARIABLES
let noPresents = [rock, log, pinha]
let allPresents = [present1, present2, present3, present4, present5, present6, present7, present8, present9, present10, present11];
let randomObject = [
    {
        x: Math.floor(Math.random()*canvas.width),
        y: 0,
        img: noPresents[Math.floor(Math.random()*noPresents.length)],
        present: false
    },
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -100,
        img: allPresents[Math.floor(Math.random()*allPresents.length)],
        present: true
    },
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -200,
        img: noPresents[Math.floor(Math.random()*noPresents.length)],
        present: false
    },
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -290,
        img: allPresents[Math.floor(Math.random()*allPresents.length)],
        present: true
    },
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -650,
        img: allPresents[Math.floor(Math.random()*allPresents.length)],
        present: true
    }, 
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -505,
        img: noPresents[Math.floor(Math.random()*noPresents.length)],
        present: false
    }, 
     {
        x: Math.floor(Math.random()*canvas.width),
        y: -410,
        img: allPresents[Math.floor(Math.random()*noPresents.length)],
        present: true
    },  
    {
        x: Math.floor(Math.random()*canvas.width),
        y: -780,
        img: allPresents[Math.floor(Math.random()*noPresents.length)],
        present: true
    }
];

let intervalId = 0;
let gameOver = false;
let isLeft = false, isRight = false;
let santaX = 400, santaY = 360, incX = 5;
let incY = 2;
let score = 0;
let lives = 3;
let level = 1;

let animationCount = 0;
let showLevelUp = false;

//GAME PAGE
function handleStart() {
    startBtn.style.display = 'none';
    startPage.style.display = 'none';
    restartBtn.style.display = 'none';
    gameOverPage.style.display = 'none';
    gamePage.style.display = 'block';
    music.play()
    draw();
    animateSanta();
    increaseSpeed();
    
    ctx.fillStyle = 'black'
    ctx.font = '30px verdana'
    ctx.fillText(`Score: ${score}`, 10, 30)
    ctx.fillText(`Lives: ${lives}`, 830, 30)
    animationCount++

    //SHOW LEVEL UP 2SECONDS
    if (score == 5 || score == 15) {
        if (animationCount < 120 && showLevelUp) {
            ctx.drawImage (levelUp, 320, 0)
        }
        else {
            animationCount = 0
            showLevelUp = false
        } 
    }

    for (let i = 0; i < randomObject.length; i++) {

        ctx.drawImage(randomObject[i].img, randomObject[i].x, randomObject[i].y)
        randomObject[i].y = randomObject[i].y + incY;

        if(randomObject[i].y > canvas.height) {
            randomObject[i].y = -300
            randomObject[i].x = [Math.floor(Math.random()*canvas.width)]
        }
        //COLLISION WITH PRESENT TO INCREASE SCORE
        if(randomObject[i].present == true) {
           if(randomObject[i].y >= santaY && randomObject[i].y <= santaY+200 && (randomObject[i].x >= santaX) && (randomObject[i].x <= santaX + 100)) {
               score ++;
               if (score == 5 || score == 15) {
                   showLevelUp = true
                   animationCount = 0;
               }
               randomObject[i].y = canvas.height + 100
           }
           }        
        
       
        //COLLISION WITH NO PRESENT TO GAME OVER
        if(randomObject[i].present == false) {
            if(randomObject[i].y >= santaY && randomObject[i].y <= santaY+200 && (randomObject[i].x >= santaX) && (randomObject[i].x <= santaX + 100)) {
                auch.play() 
                lives -- 
                randomObject[i].y = canvas.height + 100
                if (lives == 0) {
                    gameOver = true;
                }
            }
        }
    }

if (level == 3) {
    level = '3, the hardest!'
}

     //GAMEOVER
    if (gameOver) {   
        cancelAnimationFrame(intervalId);
        music.pause();
        startPage.style.display = 'none';
        gamePage.style.display = 'none';
        gameOverPage.style.display = 'block';
        restartBtn.style.display = 'block';
        finalScore.textContent = `You caught ${score} presents and reached level ${level}`;  
        gameOver = false;
       }
       else {
        intervalId = requestAnimationFrame(handleStart)
       }
}

function draw() {
    ctx.drawImage (background, 0, 0);    
}

//INCREASE SPEED
function increaseSpeed(){
    if (score >= 5) {
        incY = 3
        incX = 7
        level = 2
    }
    if (score >= 15) {
        incY = 5
        incX = 7
        level = 3
    }
}

//ANIMATE SANTA
function animateSanta() {
    if (isLeft && santaX  >= 0) {
        ctx.drawImage(santaEmptyL, santaX, santaY)
        santaX = santaX - incX;
        if(score >= 2){
            ctx.drawImage(santaL, santaX, santaY)
        }
    }
    else if (isLeft && santaX <= 0) {
       
        if (score < 2) {
        ctx.drawImage(santaEmptyL, santaX, santaY)
        }
        else if (score >= 2) {
        ctx.drawImage(santaL, santaX, santaY)   
        }
    }
    if (isRight && santaX <= canvas.width-santaEmptyR.width) {
        ctx.drawImage(santaEmptyR, santaX, santaY)
        santaX = santaX + incX;
        if(score >= 2){
        ctx.drawImage(santaR, santaX, santaY)
       }
    }
    else if (isRight && santaX >= canvas.width-santaEmptyR.width) {
     
        if (score < 2) {
        ctx.drawImage(santaEmptyR, santaX, santaY)
        }
        else if (score >= 2) {
        ctx.drawImage(santaR, santaX, santaY)   
        }
    }
    if (!isLeft && !isRight){
        if (score >= 2) {
            ctx.drawImage(santaR, santaX, santaY)
        }
        else {
            ctx.drawImage (santaEmptyR, santaX, santaY);
        }
    }  
}

//RESTART
function restart(){
    gameOverPage.style.display = 'none'
    gameOver = false
    score = 0
    lives = 3
    level = 1
    santaX = 400, santaY = 360, incX = 5
    incY = 2
    handleStart()
}

window.addEventListener('load', () => {
    gamePage.style.display = 'none'; 
    restartBtn.style.display = 'none';
    gameOverPage.style.display = 'none'
    startPage.style.display = 'block';   

    startBtn.addEventListener('click', () => {
        handleStart()
    })

    restartBtn.addEventListener('click', () => {
        restart()
    })

    //KEYS
    document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        isLeft = true;
        isRight = false;
    }
    if (event.key == 'ArrowRight') {
        isRight = true;
        isLeft = false;
    }
    })
    document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowRight') {
        isRight = false;
    }
   else if (event.key == 'ArrowLeft') {
       isLeft = false
   }
   })
});
