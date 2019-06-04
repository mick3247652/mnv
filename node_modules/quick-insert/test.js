var test = require('tape')
var quickInsert = require('./')

test('numbers', function(t) {
  var array = [1,2,3,4,5,6,7,8,9];
  var element = 3.5;

  t.deepEqual(quickInsert(element, array), [1,2,3,3.5,4,5,6,7,8,9]);
  t.end();
})

test('objects', function(t) {
  var objects = [
    { n: 1 },
    { n: 3 }
  ];
  var element = { n: 2 };
  var comparator = function(a, b) {
    if (a.n === b.n) return 0;
    return a.n < b.n ? -1 : 1;
  };

  t.deepEqual(quickInsert(element, objects, comparator), [
    { n: 1 },
    { n: 2 },
    { n: 3 }
  ]);
  t.end();
})
