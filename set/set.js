const set = new Set();
console.log(set);  // Set(0) {}

const set1 = new Set([1, 2, 3, 3]);
console.log(set1);  // Set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2)  // Set(4) { 'h', 'e', 'l', 'o' }

const uniq1 = array => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq1([2, 1, 1, 3, 3, 4, 5, 4]));  // [ 2, 1, 3, 4, 5 ]

const uniq2 = array => [...new Set(array)];
console.log(uniq2([2, 1, 1, 3, 3, 4, 5, 4]));  // [ 2, 1, 3, 4, 5 ]

const {size} = new Set([1, 3, 2, 3]);
console.log('size', size);  // size 3

console.log(set);  // Set(0) {}
set.add(2);
console.log(set);  // Set(1) { 2 }
set.add(NaN).add(NaN)
console.log(set);  // Set(2) { 2, NaN }

set.add(1)
  .add('a')
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {})
console.log(set);
/*
Set(10) {
  2,
    NaN,
    1,
    'a',
    true,
    undefined,
    null,
    {},
    [],
    [Function (anonymous)]
}
 */

console.log(set.has(2))  // true
console.log(set.has(4))  // false

set.delete(2);
console.log(set.has(2))  // false
set.delete(0);
console.log(set);
/*
Set(9) {
  NaN,
  1,
  'a',
  true,
  undefined,
  null,
  {},
  [],
  [Function (anonymous)]
}
 */

/*
set.clear();
console.log(set);  // set(0) {}
*/

set2.forEach((v, v2, set) => console.log(v, v2, set));
/*
h h Set(4) { 'h', 'e', 'l', 'o' }
e e Set(4) { 'h', 'e', 'l', 'o' }
l l Set(4) { 'h', 'e', 'l', 'o' }
o o Set(4) { 'h', 'e', 'l', 'o' }
 */

console.log(Symbol.iterator in set);  // true

for (const value of set2) {
  console.log(value);  // h e l o
}
console.log([...set2])  // [ 'h', 'e', 'l', 'o' ]

const [a, ...rest] = set2;
console.log('a: ', a, ', rest :', rest);  // a:  h, rest : [ 'e', 'l', 'o' ]