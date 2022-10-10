/**
 * 공격력 ATTACK VALUE
 *
 * constance(상수)로 사용합니다.
 *
 * @type {number}
 */
const PLAYER_STRONG_ATTACK_VALUE = 15;
const PLAYER_NORMAL_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 12;

/**
 * 힐 HEAL VALUE
 *
 * constance 상수를 사용합니다.
 * @type {number}
 */
const HEAL_VALUE = 20;

/**
 * 보너스 생명
 *
 * @description Player's Bonus life
 * 일단 보너스 생명은 무조건 1개만 있다고 가정되기때문에, boolean 을 사용합니다.
 *
 * @type {boolean}
 */
let bonusLife = true;

/**
 * monster 와 player 의 최대체력 설정하기
 *
 * @description
 * 게임이 시작되면 최대체력 설정을 prompt 를 통해서 입력받습니다.
 * @description
 * 만약 number 가 아닌 다른 type 의 value 를 입력받는 경우, 100 으로 자동 세팅됩니다.
 */
const PROMPT_MESSAGE = `enter the maximum health for player and monster
if you enter Not a Number or negative or zero, maximun health is set 100`;
let enteredValue = prompt(PROMPT_MESSAGE, '100');
let chosenMaxLife = parseInt(enteredValue);
// check entered value
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

adjustHealthBars(chosenMaxLife);

/**
 * LOG VALUES
 *
 * @description
 * log 작성에 필요한 log value 들을 정의합니다.
 *
 * TODO: 해당 constance value 들을 enum type 으로 정의합니다. 그리고 write log 와 battlelog 의 type 에서 사용해야합니다.
 */
const LOG_GAME_START = 'GAME START';
const LOG_PLAYER_NORMAL_ATTACK = 'PLAYER NORMAL ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_CONSUME_BONUS_LIFE = 'PLAYER CONSUME BONUS LIFE';
const LOG_GAME_OVER = 'GAME OVER';
// who win?!
const LOG_PLAYER_WIN = 'PLAYER WIN';
const LOG_MONSTER_WIN = 'MONSTER WIN';
const LOG_DRAW = 'DRAW';

/**
 * WRITE LOG
 *
 * @description
 * log 작성합니다.
 *
 * @type [{ event: string, value: number }]
 */
const battleLog = [];
/**
 * LOG 작성
 *
 * @description
 * event 와 value 를 사용하여 log entry 를 생성하고, battle log 에 추가합니다.
 *
 * @param event {LOG_GAME_START | LOG_PLAYER_NORMAL_ATTACK | LOG_PLAYER_STRONG_ATTACK | LOG_MONSTER_ATTACK | LOG_PLAYER_HEAL | LOG_CONSUME_BONUS_LIFE | LOG_GAME_OVER}
 * @param value {number}
 */
const writeLog = (event, value) => {
  const logEntry = { event, value }
  battleLog.unshift(logEntry);
}
writeLog(LOG_GAME_START, chosenMaxLife);

/**
 * GAME OVER
 *
 * @description
 * player 의 생명력이 0보다 작아지면 bonus life 를 소비하여 생명력을 회복합니다.
 *
 * @description
 * bonus life 가 없는 경우, 해당 조건을 만족하면 game 을 종료시킵니다.
 * 0. monster health bar value 가 0 보다 낮고, player health bar value 가 0 보다 큰 경우,
 *  player 의 승리
 * 1. player health bar value 가 0 보다 낮고, monster health bar value 가 0 보다 큰 경우,
 *  monster 의 승리
 * 2. player 와 monster 의 health bar value 가 0 보다 낮은 경우,
 *  무승부, 둘 다 졌음.
 *
 * 위 조건에 의해서 게임이 종료되면 게임을 reset 시킵니다.
 *
 * TODO:
 * progressbar value 가 먼저 줄어들고, alert 이 발생했으면 하는데,
 * alert 이 먼저 나오고, ok 버튼을 클릭하여 alert 이 닫히면 그때, progress bar value 가 줄어듭니다.
 * 어떻게 해결할 수 있는지 모르겠음.
 */
const gameOver = () => {
  // consume bonus life
  if (playerHealthBar.value <= 0 && bonusLife) {
    alert("consume player's bonus life");
    // consume bonus life
    consumeBonusLife();
  }
  // game over condition
  if (monsterHealthBar.value <= 0 && playerHealthBar.value > 0) {
    writeLog(LOG_PLAYER_WIN);
    alert('player win');
  } else if (playerHealthBar.value <= 0 && monsterHealthBar.value > 0) {
    writeLog(LOG_MONSTER_WIN);
    alert('Monster win');
  } else if (playerHealthBar.value <= 0 && monsterHealthBar.value <= 0) {
    writeLog(LOG_DRAW);
    alert('draw');
  }

  // game reset
  if (monsterHealthBar.value <= 0 || playerHealthBar.value <= 0) {
    writeLog(LOG_GAME_OVER);
    addBonusLifeEl();
    bonusLife = true;
    resetGame(chosenMaxLife);
  }
};

/**
 * ATTACK logic
 *
 * @description
 * 공격 logic 입니다. mode 에 따라서 일반 공격, 강한 공격을 합니다.
 * 공격 이후, game over 조건을 확인합니다.
 *
 * @param { 'normal' | 'strong' } mode
 */
const attack = (mode) => {
  // conditional attack
  if (mode === 'normal') {
    writeLog(LOG_PLAYER_NORMAL_ATTACK, PLAYER_NORMAL_ATTACK_VALUE);
    dealMonsterDamage(PLAYER_NORMAL_ATTACK_VALUE);
    dealPlayerDamage(MONSTER_ATTACK_VALUE);
  } else if (mode === 'strong') {
    writeLog(LOG_PLAYER_STRONG_ATTACK, PLAYER_STRONG_ATTACK_VALUE);
    dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
    dealPlayerDamage(MONSTER_ATTACK_VALUE);
  }
  // game over
  gameOver();
};

/**
 * HEAL logic
 *
 * @description
 * player 의 체력을 회복합니다.
 * monster 도 공격합니다.
 * 이후 game over 조건을 확인합니다, 아마 안죽을 거임.
 */
const heal = () => {
  // write log
  writeLog(LOG_PLAYER_HEAL, HEAL_VALUE);
  // heal player
  increasePlayerHealth(HEAL_VALUE);
  // attack monster to player
  dealPlayerDamage(MONSTER_ATTACK_VALUE);
  // game over
  gameOver();
}

/**
 * BONUS LIFE logic
 *
 * @description
 * player 의 보너스 생명을 소비하고, player health 를 최대로 회복시킵니다.
 */
const consumeBonusLife = () => {
  // write log
  writeLog(LOG_CONSUME_BONUS_LIFE, chosenMaxLife);
  // remove bonus life element
  removeBonusLife();
  // set bonus life value to false
  bonusLife = false;
  // heal player health
  setPlayerHealth(chosenMaxLife);
}

/**
 * 공격 EVENT HANDLER
 */
const attackHandler = () => {
  // normal attack
  attack('normal');
};

const strongAttackHandler = () => {
  // strong attack
  attack('strong');
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);

/**
 * 체력 채우기 HEAL HANDLER
 */
const healHandler = () => {
  // heal
  heal();
};

healBtn.addEventListener('click', healHandler);


/**
 * LOG 출력하기
 */
const printLogHandler = () => {
  console.log(battleLog);
}
logBtn.addEventListener('click', printLogHandler);