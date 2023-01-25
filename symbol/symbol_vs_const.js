/* no use Symbol
const DIRECTION = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

const myDirection = DIRECTION.UP;

if (myDirection === DIRECTION.UP) {
  console.log(`You are going ${myDirection}`);
}
*/

const DIRECTION = {
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
}

const myDirection = DIRECTION.UP;

if (myDirection === DIRECTION.UP) {
  console.log('You are going UP');
}