const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(`${ROCK} ${SCISSORS} or ${PAPER}`).toUpperCase();

  if (selection !== ROCK && selection !== SCISSORS && selection !== PAPER) {
    alert(`invalid choice! We chose ${DEFAULT_USER_CHOICE} for you`);
    return DEFAULT_USER_CHOICE;
  }
  return DEFAULT_USER_CHOICE
}

const getComputedChoice = () => {
  const randomValue = Math.random();

  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue > 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

const getResult = (pChoice, cChoice) => {
  if (pChoice === cChoice) {
    return RESULT_DRAW;
  } else if (pChoice === ROCK && cChoice === SCISSORS
  || pChoice === SCISSORS && cChoice === PAPER
  || pChoice === PAPER && cChoice === ROCK) {  // win player
    return RESULT_PLAYER_WINS;
  } else {  // win computer
    return RESULT_COMPUTER_WINS;
  }
}

const startGame = () => {
  if (gameIsRunning) {
    return ;
  }
  console.log('game is starting');
  gameIsRunning = true;
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputedChoice();
  const winner = getResult(playerChoice, computerChoice)
  console.log(winner);
}

startGameBtn.addEventListener('click', startGame);
