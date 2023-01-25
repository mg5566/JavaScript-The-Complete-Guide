const fibonacciFunc = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    }
  }
}

let iter = fibonacciFunc(10);

for (const num of iter) {
  console.log('num', num);  // 1 2 3 5 8
}

iter = fibonacciFunc(10);

console.log(iter.next());  // { value: 1, done: false }
console.log(iter.next());  // { value: 2, done: false }
console.log(iter.next());  // { value: 3, done: false }
console.log(iter.next());  // { value: 5, done: false }
console.log(iter.next());  // { value: 8, done: false }
console.log(iter.next());  // { value: 13, done: true }

const infiFibonacciFunc = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur };
    }
  }
}

for (const num of infiFibonacciFunc()) {
  if (num > 1000) break;
  console.log('num', num);  // 1 2 3 5 8
}

const [f1, f2, f3] = infiFibonacciFunc();
console.log(f1, f2, f3);
