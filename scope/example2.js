var x = 'global';

function foo() {
  var x = 'local';
  console.log('x', x);  // ?
};

foo();

console.log('x', x);  // ?