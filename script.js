'use strict'

// ----- VARIABLES ----- //
let secretNumber = 0
let score = 20
let highScore = 0

// ----- FUNCTIONS ----- //
const setGuessToNull = () => document.querySelector('.guess').value = null
const setHighScore = val => document.querySelector('.highscore').textContent = val
const setMessageTextContent = content => document.querySelector('.message').textContent = content
const setNumField = val => document.querySelector('.number').textContent = val
const setScore = num => document.querySelector('.score').textContent = num
const setSecretNum = () => secretNumber = Math.floor(Math.random() * 20) + 1

const initializeApp = () => {
  setGuessToNull()
  setMessageTextContent(`Start guessing...`)
  setNumField('?')
  setScore(score)
  setSecretNum()
}

const setStyling = (bgColor, numWidth) => {
  document.querySelector('body').style.backgroundColor = bgColor
  document.querySelector('.number').style.width = numWidth
} 

// INITIALIZE THE APP 
initializeApp()

// EVENT LISTENER FOR 'Check' BUTTON
document.querySelector('.check').addEventListener('click', () => {
  // SET THE GUESS VAR TO WHAT IS SUBMITTED INTO THE GUESS BOX AND FORMAT AS A NUMBER
  const guess = Number(document.querySelector('.guess').value)
  // CLEAR THE GUESS BOX AFTER 'Check' IS CLICKED
  setGuessToNull()

  // IF EMPTY GUESS
  if (!guess) {
    setMessageTextContent("You didn't guess anything...")
  
  // IF GUESS IS OUT OF BOUNDS
  } else if (guess > 20 || guess < 1) {
    setMessageTextContent(`Your guess is outside the selectable range. Guess again`)

  // IF WRONG GUESS - TOO HIGH OR TOO LOW
  } else if (guess > secretNumber || guess < secretNumber) {

    if (score > 1) {
      setScore(--score)
      setMessageTextContent(`your guess is too ${guess > secretNumber ? 'high' : 'low'}`)
    } else {
      setMessageTextContent(`You have lost the game :(`)
      setScore(0)
    }

  // IF CORRECT GUESS
  } else {
    setNumField(guess)
    setScore(++score)
    setMessageTextContent(`Correct!!! Play again?`)

    // STYLE APP TO SHOW THAT THE PLAYER HAS WON
    setStyling('#60b347', '30rem')

    // SET HIGHSCORE
    if (score > highScore) highScore = score
    setHighScore(highScore)

    // ADD EVENT LISTENER TO 'Again' BUTTON AND RESET APP
    document.querySelector('.again').addEventListener('click', ()=> {
      score = 20
      initializeApp()
      setStyling('#222', '15rem')
    })
  }
})
