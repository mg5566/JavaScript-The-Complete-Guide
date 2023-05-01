function print_array(arr, msg = '') {
  console.log('---' + msg + '---------------');
  arr.forEach(function (item, index) {
    console.log(item, index);
  });
  console.log('------------------');
};

var arr1 = [undefined, 1];
var arr2 = [];
arr2[1] = 1;

/*
arr1.forEach(function (item, index) {
  console.log(item, index);
});  // undefined 0 / 1 1
arr2.forEach(function (item, index) {
  console.log(item, index);
});  // 1 1
*/
print_array(arr1);  // undefined 0 / 1 1
print_array(arr2);  // 1 1

/*
arr1.map(function (item, index) {
  return item + index;
});  // [NaN, 2]
arr2.map(function (item, index) {
  return item + index;
});  // [empty, 2]
*/
print_array(arr1.map(function (item, index) {
  return item + index;
}), 'arr1 map');  // [NaN, 2]
print_array(arr2.map(function (item, index) {
  return item + index;
}), 'arr2 map');  // [empty, 2]

print_array(arr1.filter(function (item) {
  return !item;
}), 'arr1 filter');  // [undefined 0]
print_array(arr2.filter(function (item) {
  return !item;
}), 'arr2 filter');  // []

arr1.reduce(function (prev, cur, index) {
  return prev + cur + index;
}, '');
arr2.reduce(function (prev, cur, index) {
  return prev + cur + index;
}, '');
print_array(arr1, 'arr1 reduce');  // undefined 0 / 1 1
print_array(arr2, 'arr2 reduce');  // 1 1

/**
 * result
------------------
undefined 0
1 1
------------------
------------------
1 1
------------------
---arr1 map---------------
NaN 0
2 1
------------------
---arr2 map---------------
2 1
------------------
---arr1 filter---------------
undefined 0
------------------
---arr2 filter---------------
------------------
---arr1 reduce---------------
undefined 0
1 1
------------------
---arr2 reduce---------------
1 1
------------------
 */
