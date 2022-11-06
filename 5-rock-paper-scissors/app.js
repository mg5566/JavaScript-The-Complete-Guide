// game start button
const startGameBtn = document.getElementById('start-game-btn');

/**
 * game choice constants
 *
 * @constant
 * @type {string}
 */
const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const DEFAULT_USER_CHOICE = ROCK;

/**
 * game result constants
 *
 * @constant
 * @type {string}
 */
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

/**
 * game running state
 *
 * @type {boolean}
 */
let gameIsRunning = false;

/**
 * player choice
 *
 * @description
 * prompt 를 통해 입력받는다.
 * ROCK SCISSORS PAPER 가 아닌 다른 값을 입력하면 자동으로 DEFAULT_USER_CHOICE 로 세팅됩니다.
 *
 * @returns {string}
 */
const getPlayerChoice = () => {
  const selection = prompt(`${ROCK} ${SCISSORS} or ${PAPER}`).toUpperCase();

  if (selection !== ROCK && selection !== SCISSORS && selection !== PAPER) {
    alert(`invalid choice! We chose ${DEFAULT_USER_CHOICE} for you`);
    return DEFAULT_USER_CHOICE;
  }
  return DEFAULT_USER_CHOICE
}

/**
 * computer choice
 *
 * @summary
 * Math 의 random method 를 사용하여 ROCK SCISSORS PAPER 중 하나가 선택됩니다.
 *
 * @description
 * 1. randomValue 는 0~1 사이의 값을 갖습니다.
 * 2. randomValue 가 0 ~ 0.33 사이의 값인 경우, ROCK 을 선택합니다.
 * 3. randomValue 가 0.67 ~ 1 사이의 값인 경우, SCISSORS 를 선택합니다.
 * 4. randomValue 가 ROCK SCISSORS 의 조건이 아닌 경우, PAPER 를 선택합니다.
 *
 * @returns {string}
 */
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

/**
 * calc game result
 *
 * @description
 * 게임 결과를 계산합니다.
 *
 * @param pChoice
 * @param cChoice
 * @returns {string}
 * @description
 * 1. player 와 computer 가 같은 선택을 했다면 draw
 * 2. player 가 이기면 win
 * 3. computer 가 이기면 lost
 */
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

/**
 * game start logic
 *
 * @description
 * 1. set game running state to true
 * 2. get player and computer choice
 * 3. calc game result
 * 4. print game result
 */
const startGame = () => {
  if (gameIsRunning) {
    return ;
  }
  console.log('game is starting');
  gameIsRunning = true;
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputedChoice();
  const winner = getResult(playerChoice, computerChoice)

  let message = `You picked ${playerChoice}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message += 'had a draw';
  } else if (winner === RESULT_PLAYER_WINS) {
    message += 'won';
  } else if (winner === RESULT_COMPUTER_WINS) {
    message += 'lost';
  }
  alert(message);
  gameIsRunning = false;
}

startGameBtn.addEventListener('click', startGame);
