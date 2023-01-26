const map = new Map();
console.log(map);  // Map(0) {}

const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
console.log(map1);  // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

// const map2 = new Map([1, 2]);  // TypeError: Iterator value 1 is not an entry object
const map2 = new Map([['key1', 'value1'], ['key1', '1 value'], ['key2', 'value2'], ['key3', 'value 3']]);
console.log(map2);  // Map(3) { 'key1' => '1 value', 'key2' => 'value2', 'key3' => 'value 3' }

const { size } = map2;
console.log(size);  // 3

map.set('key2', 'value2').set('key3', 'value3').set('key2', '2 value');
console.log(map);  // Map(2) { 'key2' => '2 value', 'key3' => 'value3' }

const kang = { name: 'Kang', age: 29 };
const lee = { name: 'Lee', age: 26 };

map.set(kang, 'not a good developer').set(lee, 'developer');
console.log(map);
/*
Map(4) {
  'key2' => '2 value',
  'key3' => 'value3',
  { name: 'Kang', age: 29 } => 'not a good developer',
  { name: 'Lee', age: 26 } => 'developer'
}
 */

console.log(map.get(kang));  // not a good developer
console.log(map.has(lee));  // true
console.log(map.delete('key2'));  // true
console.log(map.delete('key6'));  // false

map2.clear();
console.log(map2);  // Map(0) {}

map.forEach((v, k, map) => console.log('value: ', v, ', key: ', k, 'this map: ', map));
/*
value:  value3 , key:  key3 this map:  Map(3) {
  'key3' => 'value3',
  { name: 'Kang', age: 29 } => 'not a good developer',
  { name: 'Lee', age: 26 } => 'developer'
}
value:  not a good developer , key:  { name: 'Kang', age: 29 } this map:  Map(3) {
  'key3' => 'value3',
  { name: 'Kang', age: 29 } => 'not a good developer',
  { name: 'Lee', age: 26 } => 'developer'
}
value:  developer , key:  { name: 'Lee', age: 26 } this map:  Map(3) {
  'key3' => 'value3',
  { name: 'Kang', age: 29 } => 'not a good developer',
  { name: 'Lee', age: 26 } => 'developer'
}
 */

for (const entry of map) {
  console.log(entry);
}
/*
[ 'key3', 'value3' ]
[ { name: 'Kang', age: 29 }, 'not a good developer' ]
[ { name: 'Lee', age: 26 }, 'developer' ]
 */
const [a, b] = map;
console.log('a', a);  // a [ 'key3', 'value3' ]
console.log('b', b);  // b [ { name: 'Kang', age: 29 }, 'not a good developer' ]

for (const key of map.keys()) {
  console.log(key)
}
/*
key3
{ name: 'Kang', age: 29 }
{ name: 'Lee', age: 26 }
 */

for (const value of map.values()) {
  console.log(value);
}
/*
value3
not a good developer
developer
 */

for (const entry of map.entries()) {
  console.log(entry);
}
/*
[ 'key3', 'value3' ]
[ { name: 'Kang', age: 29 }, 'not a good developer' ]
[ { name: 'Lee', age: 26 }, 'developer' ]
 */