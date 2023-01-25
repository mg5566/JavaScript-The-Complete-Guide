function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}

setTimeout(foo, 3 * 1000);
bar();

/**
 * result
 *
 * bar
 * (3초 대기)foo
 */
