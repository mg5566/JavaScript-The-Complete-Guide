const fibonacciObj = {
  [Symbol.iterator]: () => {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return {value: cur, done: cur >= max};
      }
    }
  }
};

for (const item of fibonacciObj) {
  console.log('item', item);  // 1, 2, 3, 5, 8,
}

const arr = [...fibonacciObj];
console.log('arr', arr);

const [first, second, ...rest] = fibonacciObj;
console.log('first', first);
console.log('second', second);
console.log('rest', rest);

function fibonacciFuc(max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return {value: cur, done: cur >= max};
        }
      }
    }
  }
}

for (const num of fibonacciFuc(10)) {
  console.log('num', num);
}

const iterable = fibonacciFuc(10);
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: 2, done: false }
console.log(iterator.next());  // { value: 3, done: false }
console.log(iterator.next());  // { value: 5, done: false }
console.log(iterator.next());  // { value: 8, done: false }
console.log(iterator.next());  // { value: 13, done: true }
