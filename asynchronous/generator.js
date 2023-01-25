// generator function declaration
function* genDecFunc() {
  yield 1;
}


// generator function expression
const genExpFunc = function* () {
  yield 1;
}

// generator method
const obj = {
  * genObjMethod() {
    yield 1;
  }
};

// generator class method
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}

function* generatorFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = generatorFunc();
console.log(generator.next());  // { value: 1, done: false }
console.log(generator.throw('Error!'));  // { value: undefined, done: true }
console.log(generator.return('End!'));  // { value: 'End!', done: true }

function* generatorWithArgs() {
  const x = yield 1;
  const y = yield (x + 10);
  return x + y;
};

const genWithArgsFunc = generatorWithArgs();

let res = genWithArgsFunc.next();
console.log(res);  // { value: 1, done: false }

// 변수 x 에 10 이 할당된다.
res = genWithArgsFunc.next(10);
console.log(res);  // { value: 20, done: false }

res = genWithArgsFunc.next(20);
console.log(res);  // { value: 30, done: true }

/*
const infiniteFibonacci = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() { return this; },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur };
    }
  };
}());

for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num);
}
 */

const infiniteFibonacci = (function* () {
  let [pre, cur] = [0, 1];

  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
}());

// infiniteFibonacci 는 무한 이터러블이다.
for (const num of infiniteFibonacci) {
  if (num > 10000) break;
  console.log(num);
}

const async = generatorFunc => {
  const generator = generatorFunc();

  const onResolved = arg => {
    const result = generator.next(arg);

    return result.done ? result.value : result.value.then(res => onResolved(res));
  };

  return onResolved;
};

(async(function* fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo);
})());