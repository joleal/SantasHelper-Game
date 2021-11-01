# Santa's Helper

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
### Main.js
- StartScreen () {}
- GameScreen () {}
- GameOverScreen () {}

### Game.js

### Santa.js

### Objects.js

## States and States Trasitions
Definition of the different states and their transition (transition functions)

- SplashScreen
- GameScreen
- GameOverScreen

## Task

- Main - buildDom
- Main - buildSplashScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - buildGameOverScreen
- Game - startLoop
- Game - buildCanvas
- Game - updateCanvas
- Game - drawCanvas
- Santa - draw
- Santa - move
- Game - addbag
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
