# Santa's Helper
[Santa's Helper - The Game](https://cruzines.github.io/SantasHelper-Game/)
## Description
Santa's helper is a Game where the player has to help Santa fill his Santa with presents. To do so, the player has to catch christmas presents that are falling from the top of the screen. The Game ends when the player catches an object that no child wants to receive.

## MVP
- Game has one Santa with his bag
- Objects fall randomly from the top of the screen
- Santa moves to the left and to the right, at the bottom
- The number of caught presents appear on the screen


## Backlog
- Add music
- Difficulty increases after catch 10 presents
- Level up, where Santa delivers the presents

## Data structure

### index.html
<section id = "start-page">
<section id = "game">
<section id = "gameover-page">

### script.js
- Canvas
- DOM pages
- DOM buttons
- Images
- Variables
- handleStart () {}
- draw () {}
- animateSanta () {}
- restart () {}
- Event Listeners () {}

### style.css
- Start page
- Game page
- Game over page

## States and States Trasitions
Definition of the different states and their transition (transition functions)

- StartScreen
- GameScreen
- GameOverScreen

## Task

- Main - buildDom
- Main - buildStartScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - buildGameOverScreen
- Game - startLoop
- Game - buildCanvas
- Game - updateCanvas
- Game - drawCanvas
- Santa - draw
- Santa - move
- Objects - draw
- Objects - move
- Game - addobjects
- Game - checkCollision
- Game - GameOver
- Game - addEventListener

## Additional Links
### Trello
### Git
### Slides
