var x = 'global x';
var y = 'global y';

function outer() {
  var z = `outer's local z`;

  console.log(x);
  console.log(y);
  console.log(z);

  function inner() {
    var x = `inner's local x`;

    console.log(x);  // inner's local x
    console.log(y);
    console.log(z);
  }

  inner();
}

outer();

console.log(x);  // global x
console.log(z);  // ReferenceError: z is not defined