// Symbol 함수를 호출하여 유일무이한 symbol 값을 생성한다.
const mySymbol = Symbol();
console.log(typeof mySymbol);  // symbol

// symbol 값은 노출되지 않아 확인할 수 없다.
console.log(mySymbol);

// new Symbol();  // TypeError: Symbol is not a constructor

// symbol 값에 대한 설명이 같더라도 유일무이한 symbol 값이 생성된다.
const mySymbol1 = Symbol('mySymbol');
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 === mySymbol2);  // false

console.log(mySymbol1.description);  // mySymbol
console.log(mySymbol1.toString());  // Symbol(mySymbol)

// 다른 타입으로 불가능, boolean 만 가능
// console.log(mySymbol1 + '');  // TypeError: Cannot convert a Symbol value to a string
// console.log(+mySymbol1);  // TypeError: Cannot convert a Symbol value to a number
console.log(!!mySymbol1);  // true
if (mySymbol1) console.log('mySymbol1 is not empty');


// 전역 심벌 레지스트리에 mySymbol3 이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for('mySymbol3');
// 전역 심벌 레지스트리에 mySymbol3 이라는 키로 저장된 심벌 값이 존재한다면 해당 심벌 값을 반환
const s2 = Symbol.for('mySymbol3');

console.log(s1 === s2);  // true

// 전역 심벌 레지스트리에 mySymbol4 이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s3 = Symbol.for('mySymbol4');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s3);  // -> mySymbol4

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
const s4 = Symbol('foo');
// 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
Symbol.keyFor(s4);  // -> undefined
