/**
 * ATTACK_VALUE 공격력
 * constance 로 사용합니다.
 *
 * @type {number}
 */
const PLAYER_ATTACK_VALUE = 13;
const MONSTER_ATTACK_VALUE = 10;

let chosenMaxLife = 100;
// let currentMonsterHealth = chosenMaxLife;
// let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

/**
 * 공격 event handler
 *
 * attack button 을 클릭하면 공격 event 가 발생하고, 해당 handler 가 동작합니다.
 * 공격력만큼 체력을 감소시킵니다.
 */
const attackHandler = () => {
    dealMonsterDamage(PLAYER_ATTACK_VALUE);
    dealPlayerDamage(MONSTER_ATTACK_VALUE);
    /**
     * progressbar value 가 먼저 줄어들고, alert 이 발생했으면 하는데,
     * alert 이 먼저 나오고, ok 버튼을 클릭하여 alert 이 닫히면 그때, progress bar value 가 줄어듭니다.
     * 어떻게 해결할 수 있는지 모르겠음.
     */
    if (monsterHealthBar.value <= 0 && playerHealthBar.value > 0) {
        alert('player win');
    } else if (playerHealthBar.value <= 0 && monsterHealthBar.value > 0) {
        alert('Monster win');
    } else if (playerHealthBar.value <= 0 && monsterHealthBar.value <= 0) {
        alert('draw');
    }
};

attackBtn.addEventListener('click', attackHandler);