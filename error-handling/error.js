const foo = () => {
  throw Error('foo 에서 발생한 에러');  // 4
}

const bar = () => {
  foo();  // 3
}

const baz = () => {
  bar();  // 2
}

try {
  baz()  // 1
} catch (err) {
  console.error(err);
}