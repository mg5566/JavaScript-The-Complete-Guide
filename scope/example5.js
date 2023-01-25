var x = 1;

function foo() {
  var x = 3;
  bar();
}

function bar() {
  console.log('x', x);
}

foo();  // ?
bar();  // ?