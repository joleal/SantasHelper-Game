//CONST
const MAXOBJECTS = 10;
const MAXHAZARDS = 4;
const [STARTSPEEDX, STARTSPEEDY] = [5,2]
const STARTLIVES = 1;
const [SPRITEX, SPRITEY, SPRITEW, SPRITEH, LEFTADJUST] = [170,28,384,574, 115];
const DEADSPEED = 5;
const IDLESPEED = 2;
const MOVESPEED = 1;

//CANVAS
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "4px solid white";

//DOM PAGES
let startPage = document.querySelector("#start-page");
let gamePage = document.querySelector("#game");
let gameOverPage = document.querySelector("#gameover-page");

//DOM START AND RESTART BUTTONS
let startBtn = document.querySelector("#start-btn");
let restartBtn = document.querySelector("#restart");
let finalScore = document.querySelector("#final-score");

//ASSETS OBJECT
let images = {};

//GAME STATE
let gameOver, score, lives, level, santaX, santaY, santaSprite, santaDir, left, right, santaImage, incX, incY;
let intervalId, animationCount, showLevelUp;
let randomObjects = [];

function start(){
  loadImages();

  //set start variables
  gameOverPage.style.display = "none";
  gameOver = false;
  showLevelUp = false;
  animationCount = 0;
  
  //score
  score = 0;
  lives = STARTLIVES;
  level = 1;
  
  //santa
  santaX = 400; 
  santaY = 400;
  santaSprite = 0;
  santaDir =  1;
  left = right = false;
  santaImage = images.santa[0];
  
  //Speed
  [incX, incY] = [STARTSPEEDX, STARTSPEEDY];
  intervalId = 0;

  //Create objects
  randomObjects = [];
  for(let o = 0, hazards = 0 ; o < MAXOBJECTS; o++){
    let randomObject = 
    {
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * 6) * -100 //so they don't start at the same height
    }
    if(hazards < MAXHAZARDS){
      randomObject.img = images.hazards[Math.floor(Math.random() * images.hazards.length)];
      randomObject.present = false;
      hazards++;
    } else {
      randomObject.img = images.presents[Math.floor(Math.random() * images.presents.length)];
      randomObject.present = true;
    }

    randomObjects.push(randomObject);
  }

  startBtn.style.display = "none";
  startPage.style.display = "none";
  restartBtn.style.display = "none";
  gameOverPage.style.display = "none";
  gamePage.style.display = "block";
  images.music.play();

  //start game
  handleStart();
}

function loadImages(){
  //load background
  if(!images.background){
    let background = new Image();
    background.src = "./images/bg.jpg";
    images.background = background;

    let levelUp = new Image();
    levelUp.src = "./images/levelUp.png";
    images.levelUp = levelUp;

    //AUDIO
    let music = new Audio();
    music.src = "./audio/SantasToyFactory.mp3";
    music.volume = 0.1;
    images.music = music;

    let auch = new Audio();
    auch.src = "./audio/auch.mp3";
    auch.volume = 0.1;
    images.auch = auch;
  }

  //load santa
  if(!images.santa){
    images.santa = [];
    [
      './images/Walk (1).png',
      './images/Walk (2).png',
      './images/Walk (3).png',
      './images/Walk (4).png',
      './images/Walk (5).png',
      './images/Walk (6).png',
      './images/Walk (7).png',
      './images/Walk (8).png',
      './images/Walk (9).png',
      './images/Walk (10).png',
      './images/Walk (11).png',
      './images/Walk (12).png',
      './images/Walk (13).png'
    ].forEach(i => {
      let santa = new Image();
      santa.src = i;
      images.santa.push(santa);
    });
  }

  //load idle santa
  if(!images.idleSanta){
    images.idleSanta = [];
    [
      './images/Idle (1).png',
      './images/Idle (2).png',
      './images/Idle (3).png',
      './images/Idle (4).png',
      './images/Idle (5).png',
      './images/Idle (6).png',
      './images/Idle (7).png',
      './images/Idle (8).png',
      './images/Idle (9).png',
      './images/Idle (10).png',
      './images/Idle (11).png',
      './images/Idle (12).png',
      './images/Idle (14).png',
      './images/Idle (15).png',
      './images/Idle (16).png'
    ].forEach(i => {
      let santa = new Image();
      santa.src = i;
      images.idleSanta.push(santa);
    });
  }

  //load dead santa
  if(!images.deadSanta){
    images.deadSanta = [];
    [
      './images/Dead (1).png',
      './images/Dead (2).png',
      './images/Dead (3).png',
      './images/Dead (4).png',
      './images/Dead (5).png',
      './images/Dead (6).png',
      './images/Dead (7).png',
      './images/Dead (8).png',
      './images/Dead (9).png',
      './images/Dead (10).png',
      './images/Dead (11).png',
      './images/Dead (12).png',
      './images/Dead (14).png',
      './images/Dead (15).png',
      './images/Dead (16).png',
      './images/Dead (17).png'
    ].forEach(i => {
      let santa = new Image();
      santa.src = i;
      images.deadSanta.push(santa);
    });
  }

  //load presents
  if(!images.presents){
    
    images.presents = [];
    [
      './images/p1.png',
      './images/p2.png',
      './images/p3.png',
      './images/p4.png',
      './images/p5.png',
      './images/p6.png',
      './images/p7.png',
      './images/p8.png',
      './images/p9.png',
      './images/p10.png',
      './images/p11.png'
    ].forEach(i => {
      let present = new Image();
      present.src = i;
      images.presents.push(present);
    });
  }

  //load hazards
  if(!images.hazards){
    
    images.hazards = [];
    [
      './images/rock-50x50.png',
      './images/log1.png',
      './images/pinha.png'
    ].forEach(i => {
      let hazard = new Image();
      hazard.src = i;
      images.hazards.push(hazard);
    });
  }
}

//ANIMATE SANTA
function animateSanta() {
  //get next sprite
  if(gameOver){
    santaSprite = santaSprite + 1;
    santaImage = images.deadSanta[Math.min(Math.floor(santaSprite/DEADSPEED), images.deadSanta.length - 1)];

    if(santaDir == -1){
      ctx.scale(-1, 1);
      ctx.drawImage(santaImage, SPRITEX, SPRITEY, santaImage.width - SPRITEX, santaImage.height - SPRITEY, -santaX - LEFTADJUST, santaY, santaImage.width * 0.3, santaImage.height*0.25);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    else 
      ctx.drawImage(santaImage, SPRITEX, SPRITEY, santaImage.width - SPRITEX, santaImage.height - SPRITEY, santaX, santaY, santaImage.width * 0.3, santaImage.height*0.25);
  } 
  else 
  {
    if(left || right){
      santaSprite = (santaSprite + 1) % (images.santa.length * MOVESPEED);
      santaImage = images.santa[Math.floor(santaSprite/MOVESPEED)];
      
      //calculate X position
      if(santaDir == 1){
        santaX = Math.min(santaX + incX, canvas.width-100);
      } else {
        santaX = Math.max(santaX - incX, 0);
      }
    }
    else {
      santaSprite = (santaSprite + 1) % (images.idleSanta.length * IDLESPEED);
      santaImage = images.idleSanta[Math.floor(santaSprite/IDLESPEED)];
    }
    
    if(santaDir == -1){
      ctx.scale(-1, 1);
      ctx.drawImage(santaImage, SPRITEX, SPRITEY, SPRITEW, SPRITEH, -santaX - LEFTADJUST, santaY, SPRITEW * 0.30,SPRITEH * 0.25);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    else {
      ctx.drawImage(santaImage, SPRITEX, SPRITEY, SPRITEW, SPRITEH, santaX, santaY, SPRITEW * 0.30,SPRITEH * 0.25);
    }
  }
  
}

function drawRandomObjects(){
  randomObjects.forEach(ro => {
    ro.y = ro.y + incY;

    let resetObject = false;

    //check it hit the floor
    if(ro.y > canvas.height){
      resetObject = true;
    }
    else if ( //check it hit santa 
      ro.y + ro.img.height >= santaY &&
      ro.y + ro.img.height <= santaY + 200 &&
      ro.x + ro.img.width/2 >= santaX &&
      ro.x + ro.img.width/2 <= santaX + 100 &&
      !gameOver) 
    {
      if(ro.present){ //if present increase score
        score++;
        if(score == 5 || score == 15){
          showLevelUp = true;
          animationCount = 0;
        }
      } else { //if hazard reduce lives
        images.auch.play();
        lives--;
        if (lives == 0) {
          gameOver = true;
          santaSprite = 0;
        }
      }
      resetObject = true;
    }

    //finally if reset object 
    if(resetObject){
      ro.x = Math.floor(Math.random() * canvas.width),
      ro.y = Math.floor(Math.random() * MAXOBJECTS * -100) 

      if(ro.present)
        ro.img = images.presents[Math.floor(Math.random() * images.presents.length)];
      else
        ro.img = images.hazards[Math.floor(Math.random() * images.hazards.length)];
    }

    
    ctx.drawImage(ro.img, ro.x, ro.y);
  });
}
  

//GAME PAGE
function handleStart() {
  
  draw();
  animateSanta();
  drawRandomObjects();
  increaseSpeed();

  ctx.fillStyle = "black";
  ctx.font = "30px verdana";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Lives: ${lives}`, 830, 30);
  animationCount++;

  //SHOW LEVEL UP 2SECONDS
  if (score == 5 || score == 15) {
    if (animationCount < 120 && showLevelUp) {
      ctx.drawImage(images.levelUp, 320, 0);
    } else {
      animationCount = 0;
      showLevelUp = false;
    }
  }

  if (level == 3) {
    level = "3, the hardest!";
  }

  //GAMEOVER
  if (gameOver && Math.floor(santaSprite/DEADSPEED) >= images.deadSanta.length) {
    cancelAnimationFrame(intervalId);
    images.music.pause();
    startPage.style.display = "none";
    gamePage.style.display = "none";
    gameOverPage.style.display = "block";
    restartBtn.style.display = "block";
    finalScore.textContent = `You caught ${score} presents and reached level ${level}`;
    gameOver = false;
  } else {
    intervalId = requestAnimationFrame(handleStart);
  }
}

function draw() {
  ctx.drawImage(images.background, 0, 0);
}

//INCREASE SPEED
function increaseSpeed() {
  if (score >= 5) {
    incY = 3;
    incX = 7;
    level = 2;
  }
  if (score >= 15) {
    incY = 5;
    incX = 7;
    level = 3;
  }
}



window.addEventListener("load", () => {
  gamePage.style.display = "none";
  restartBtn.style.display = "none";
  gameOverPage.style.display = "none";
  startPage.style.display = "block";

  startBtn.addEventListener("click", () => {
    start();
  });

  restartBtn.addEventListener("click", () => {
    start();
  });

  //KEYS
  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft" && !gameOver) {
      left = true;
      santaDir = -1;
    }
    if (event.key == "ArrowRight" && !gameOver) {
      santaDir = +1;
      right = true;
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowLeft") {
      left = false;
    }
    if (event.key == "ArrowRight") {
      right = false;
    }

    if(!right && !left && !gameOver){ //movementStopped
      santaSprite = 0;
    }
  });
});
