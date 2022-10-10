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
 * monst 와 player 의 최대체력 설정하기
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
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
// let currentMonsterHealth = chosenMaxLife;
// let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

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
    alert('player win');
  } else if (playerHealthBar.value <= 0 && monsterHealthBar.value > 0) {
    alert('Monster win');
  } else if (playerHealthBar.value <= 0 && monsterHealthBar.value <= 0) {
    alert('draw');
  }

  // game reset
  if (monsterHealthBar.value <= 0 || playerHealthBar.value <= 0) {
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
    dealMonsterDamage(PLAYER_NORMAL_ATTACK_VALUE);
    dealPlayerDamage(MONSTER_ATTACK_VALUE);
  } else if (mode === 'strong') {
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