var a;
console.log(a);  // undefined. 값을 대입하지 않은 변수에 접근

var obj = { a: 1 };
console.log(obj.a); // 1
console.log(obj.b); // undefined. 객체에 존재하지 않는 프로퍼티에 접근
// console.log(b);     // ReferenceError: b is not defined. 존재하지 않는 변수에 접근

var func = function() {};
var c = func();    // 함수가 반환값을 반환하지 않으면 undefined를 반환
console.log(c);    // undefined


// result
// undefined
// 1
// undefined
// undefined
