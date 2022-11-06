const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const DEFAULT_USER_CHOICE = ROCK;

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(`${ROCK} ${SCISSORS} or ${PAPER}`).toUpperCase();

  if (selection !== ROCK && selection !== SCISSORS && selection !== PAPER) {
    alert(`invalid choice! We chose ${DEFAULT_USER_CHOICE} for you`);
    return DEFAULT_USER_CHOICE;
  }
  return DEFAULT_USER_CHOICE
}

const startGame = () => {
  if (gameIsRunning) {
    return ;
  }
  console.log('game is starting');
  gameIsRunning = true;
  getPlayerChoice();
}

startGameBtn.addEventListener('click', startGame);
