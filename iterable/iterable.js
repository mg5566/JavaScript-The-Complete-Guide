const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]);  // true
isIterable('');  // true
isIterable(new Map());  // true
isIterable(new Set());  // true
isIterable({});  // false

const array = [1, 2, 3];

console.log(Symbol.iterator in array);

for (const item of array) {
  console.log(item);
}

console.log([...array]);  // [1, 2, 3]
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]

// {} 는 iterable 이 아니라서 할 수 없습니다.
/*
const obj = { a: 1, b: 2 };

console.log(Symbol.iterator in obj);  // false

for (const item of obj) {  // TypeError: obj is not iterable
  console.log(item);
}

const [a, b] = obj;  // TypeError: obj is not iterable
 */

const arr = [1, 2, 3, 4, 5];

const iterator = arr[Symbol.iterator]();
console.log('next' in iterator);  // Symbol.iterator 메서드가 반환한 iterator 는 next 메서드를 갖는다.

console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: 2, done: false }
console.log(iterator.next());  // { value: 3, done: false }
console.log(iterator.next());  // { value: 4, done: false }
console.log(iterator.next());  // { value: 5, done: false }
console.log(iterator.next());  // { value: undefined, done: true }

const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 3
};

for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]);  // 1 2 3 4
}

/*
for (const item of arrayLike) {
  console.log('item');
}  // TypeError: arrayLike is not iterable
 */

const realArr = Array.from(arrayLike);

for (const item of realArr) {
  console.log('item', item);
}