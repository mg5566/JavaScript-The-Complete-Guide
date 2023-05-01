var arr1 = [];
arr1.length = 3;
console.log('arr1', arr1); // [ <3 empty items> ]

var arr2 = new Array(3);
console.log('arr2', arr2); // [ <3 empty items> ]

var arr3 = [undefined, undefined, undefined];
console.log('arr3', arr3); // arr3 [ undefined, undefined, undefined ]


/**
 * result
 *
 * arr1 [ <3 empty items> ]
 * arr2 [ <3 empty items> ]
 * arr3 [ undefined, undefined, undefined ]
 */
