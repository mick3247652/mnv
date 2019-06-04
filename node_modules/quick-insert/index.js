// from
// http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers


module.exports = function insert(element, array, comparer) {
  comparer = comparer || strCompare;
  array.splice(locationOf(element, array, comparer) + 1, 0, element);
  return array;
}

function strCompare(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1;
}

function locationOf(element, array, comparer, start, end) {
    if (array.length === 0)
        return -1;

    start = start || 0;
    end = end || array.length;
    var pivot = (start + end) >> 1;

    var c = comparer(element, array[pivot]);
    if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

    switch (c) {
        case -1: return locationOf(element, array, comparer, start, pivot);
        case 0: return pivot;
        case 1: return locationOf(element, array, comparer, pivot, end);
    };
};
