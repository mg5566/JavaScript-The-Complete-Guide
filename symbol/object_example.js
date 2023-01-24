const mySymbol = Symbol('mySymbol');

const obj = {
  [Symbol.for('mySymbol')]: 1,
}

console.log(obj[Symbol.for('mySymbol')]);

for (const key in obj) {
  console.log(key);
}

console.log('Object key', Object.keys(obj));  // []
console.log('Object get own property names', Object.getOwnPropertyNames(obj));  // []
console.log('Object get own property symbols', Object.getOwnPropertySymbols(obj));  // [Symbol(mySymbol)]

const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey1]);  // 1

// builtin objects
Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur, 0)
};

console.log([1, 2].sum());  // 3

Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
};

console.log([3, 2][Symbol.for('sum')]());  // 3

// iterator protocol
const iterable = {
  // [Symbol.iterator]() { return generator; },
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      }
    };
  }
};

for (const num of iterable) {
  console.log(num);  // 1, 2, 3, 4, 5
}