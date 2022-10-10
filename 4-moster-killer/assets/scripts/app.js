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

let chosenMaxLife = 100;
// let currentMonsterHealth = chosenMaxLife;
// let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

/**
 * ATTACK logic
 *
 * 공격 logic 입니다. mode 에 따라서 일반 공격, 강한 공격을 합니다.
 *
 * @param { 'normal' | 'strong' } mode
 */
const attack = (mode) => {
    if (mode === 'normal') {
        dealMonsterDamage(PLAYER_NORMAL_ATTACK_VALUE);
        dealPlayerDamage(MONSTER_ATTACK_VALUE);
    } else if (mode === 'strong') {
        dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
        dealPlayerDamage(MONSTER_ATTACK_VALUE);
    }
};

/**
 * GAME OVER
 *
 * 해당 조건을 만족하면 game 을 종료시킵니다.
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
    if (monsterHealthBar.value <= 0 && playerHealthBar.value > 0) {
        alert('player win');
        resetGame(chosenMaxLife);
    } else if (playerHealthBar.value <= 0 && monsterHealthBar.value > 0) {
        alert('Monster win');
        resetGame(chosenMaxLife);
    } else if (playerHealthBar.value <= 0 && monsterHealthBar.value <= 0) {
        alert('draw');
        resetGame(chosenMaxLife);
    }
};

/**
 * 공격 EVENT HANDLER
 *
 * attack button 을 클릭하면 공격 event 가 발생하고, 해당 handler 가 동작합니다.
 * 공격력만큼 체력을 감소시킵니다.
 */
const attackHandler = () => {
    // normal attack
    attack('normal');
    // gameover
    gameOver();
};

attackBtn.addEventListener('click', attackHandler);

/**
 * 강한 공격 event handler
 */
const strongAttackHandler = () => {
    // strong attack
    attack('strong');
    // game over
    gameOver();
};

strongAttackBtn.addEventListener('click', strongAttackHandler);