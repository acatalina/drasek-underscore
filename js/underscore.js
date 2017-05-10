var _ = {};

_.getIteratee = function getIteratee (method) {
  switch (typeof method) {
    case 'function':
      return method;
    case 'string':
      return function (elem) {
        return elem[method];
      };
    default:
      return function (elem) {
        return elem;
      };
  }
};

_.identity = function () {
  return arguments[0];
};

_.first = function (arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;

  return !n ? arr[0] : arr.slice(0, n);
};

_.last = function (arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;

  return !n ? arr[arr.length - 1] : arr.slice(-n);
};

_.each = function (list, iteratee, context) {
  let func = _.getIteratee(iteratee).bind(context);
  let i = 0;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      func(list[i], i, list);
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      func(list[keys[i]], keys[i], list);
    }
  }

  return list;
};

_.filter = function (list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (iteratee(list[i], i, list)) {
        res.push(list[i]);
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (iteratee(list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.reject = function (list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!iteratee(list[i], i, list)) {
        res.push(list[i]);
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!iteratee(list[keys[i]], keys[i], list)) {
        res.push(list[keys[i]]);
      }
    }
  }

  return res;
};

_.uniq = function (arr, isSorted, iteratee) {
  if (iteratee === undefined && typeof isSorted === 'function') {
    iteratee = isSorted;
    isSorted = false;
  }

  let res = [];
  let seen = isSorted ? undefined : [];
  let hasBeenSeen = isSorted ? hasBeenSeenSorted : hasBeenSeenUnsorted;

  function hasBeenSeenSorted (val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen === val) {
      return true;
    }

    seen = val;
    return false;
  }

  function hasBeenSeenUnsorted (val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen.indexOf(val) > -1) {
      return true;
    }

    seen.push(val);
    return false;
  }

  function getComparable (val, i, arr) {
    return iteratee ? iteratee(val, i, arr) : val;
  }

  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (!hasBeenSeen(arr[i], i, arr)) {
        res.push(arr[i]);
      }
    }
  }

  return res;
};

_.map = function (list, iteratee, context) {
  let func = _.getIteratee(iteratee).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      let transformed = func(list[i], i, list);
      res.push(transformed);
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      let transformed = func(list[keys[i]], keys[i], list);
      res.push(transformed);
    }
  }

  return res;
};

_.pluck = function (list, prop) {
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      res.push(list[i][prop]);
    }
  }

  return res;
};

_.reduce = function (list, iteratee, memo, context) {
  let func = _.getIteratee(iteratee).bind(context);
  let i = 0;

  if (Array.isArray(list)) {
    if (memo === undefined) {
      memo = list[i];
    }

    for (i; i < list.length; i++) {
      memo = func(memo, list[i], i, list);
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    if (memo === undefined) {
      memo = list[keys[i]];
    }

    for (i; i < keys.length; i++) {
      memo = func(memo, list[keys[i]], i, list);
    }
  }

  return memo;
};

_.contains = function (list, value, fromIndex) {
  let i = 0;

  if (Array.isArray(list)) {
    i = fromIndex || i;

    for (i; i < list.length; i++) {
      if (list[i] === value) {
        return true;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (list[keys[i]] === value) {
        return true;
      }
    }
  }

  return false;
};

_.every = function (list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = true;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!iteratee(list[i], i, list)) {
        res = false;
        break;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (!iteratee(list[keys[i]], keys[i], list)) {
        res = false;
        break;
      }
    }
  }

  return res;
};

_.some = function (list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = false;

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (iteratee(list[i], i, list)) {
        res = true;
        break;
      }
    }
  } else if (typeof list === 'object') {
    let keys = Object.keys(list);

    for (i; i < keys.length; i++) {
      if (iteratee(list[keys[i]], keys[i], list)) {
        res = true;
        break;
      }
    }
  }

  return res;
};

_.extend = function (destination, source) {
  let keys;

  for (let i = 1; i < arguments.length; i++) {
    source = arguments[i];
    keys = Object.keys(source);

    for (let j = 0; j < keys.length; j++) {
      destination[keys[j]] = source[keys[j]];
    }
  }

  return destination;
};

_.defaults = function (object, defaults) {
  for (let i = 1; i < arguments.length; i++) {
    defaults = arguments[i];
    let keys = Object.keys(defaults);

    for (let j = 0; j < keys.length; j++) {
      if (!object[keys[j]]) {
        object[keys] = defaults[keys];
      }
    }
  }

  return object;
};

_.indexOf = function (arr, val, isSorted) {
  if (!Array.isArray(arr) || !val) return -1;

  if (isSorted === true) {
    let prevIndex = 0;
    let endIndex = arr.length;
    let midIndex;

    while (prevIndex < endIndex && arr[midIndex] !== val) {
      midIndex = Math.floor((prevIndex + endIndex) / 2);

      if (arr[midIndex] > val) {
        endIndex = midIndex;
      } else {
        prevIndex = midIndex + 1;
      }
    }

    return arr[midIndex] === val ? midIndex : -1;
  } else {
    isSorted = isSorted || 0;

    for (let i = isSorted; i < arr.length; i++) {
      if (arr[i] === val) {
        return i;
      }
    }

    return -1;
  }
};

_.once = function (iteratee) {
  let hasBeenUsed;
  let res;

  return function () {
    if (!hasBeenUsed) {
      hasBeenUsed = true;
      res = iteratee.apply(this, arguments);
    }

    return res;
  };
};

_.memoize = function (iteratee, hashFunction) {
  const memo = {};

  const speedy = function () {
    const args = hashFunction
      ? hashFunction.apply(null, arguments)
      : JSON.stringify(arguments[0]);

    if (!memo[args]) {
      memo[args] = iteratee.apply(null, arguments);
    }

    return memo[args];
  };

  speedy.cache = memo;

  return speedy;
};

_.delay = function (iteratee, wait) {
  const args = Array.from(arguments).slice(2);

  setTimeout(() => {
    iteratee.apply(null, args);
  }, wait);
};

_.shuffle = function (list) {
  if (!Array.isArray(list) && typeof list !== 'object') return [];

  let keys = Object.keys(list);
  let length = keys.length;
  let res = Array(length);

  function getRandomInt (max) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < length; i++) {
    let random = getRandomInt(i);
    if (random !== i) {
      res[i] = res[random];
    }
    res[random] = list[keys[i]];
  }

  return res;
};

_.invoke = function (list, methodName) {
  let args = Array.prototype.slice.call(arguments, 2);

  return _.map(list, function (elem) {
    let func = elem[methodName];
    return func ? func.apply(elem, args) : elem[null];
  });
};

_.sortBy = function (list, sortBy, context) {
  let iteratee = _.getIteratee(sortBy).bind(context);

  return _.map(list, function (elem, i, list) {
    return {
      elem: elem,
      computed: iteratee(elem, i, list)
    };
  }).sort(function (a, b) {
    return a.computed > b.computed;
  }).reduce(function (res, e) {
    res.push(e.elem);
    return res;
  }, []);
};

_.zip = function () {
  let args = Array.prototype.slice.call(arguments, 0);
  let res = [];

  for (let i = 0; i < args.length; i++) {
    if (!Array.isArray(args[i])) break;

    let newArray = [];

    for (let j = 0; j < args.length; j++) {
      newArray.push(args[j][i]);
    }

    newArray.length > 0 ? res.push(newArray) : null;
  }

  return res;
};

_.sortedIndex = function (list, value, iteratee, context) {
  if (!Array.isArray(list)) return 0;

  let prevIndex = 0;
  let endIndex = list.length;
  let func = _.getIteratee(iteratee).bind(context);

  while (prevIndex < endIndex) {
    let midIndex = Math.floor((prevIndex + endIndex) / 2);

    if (func(list[midIndex]) > func(value)) {
      endIndex = midIndex;
    } else {
      prevIndex = midIndex + 1;
    }
  }

  return endIndex;
};

_.flatten = function (arr, shallow) {
  if (!Array.isArray(arr)) return [];

  return _.reduce(arr, function (res, elem) {
    if (Array.isArray(elem) && !shallow) {
      elem = _.flatten(elem);
    }

    return res.concat(elem);
  }, []);
};

_.intersection = function () {
  let length = arguments[0] ? arguments[0].length : 0;
  let res = [];

  for (let i = 0; i < length; i++) {
    let elem = arguments[0][i];

    for (let j = 1; j < arguments.length; j++) {
      let isCommon = _.contains(arguments[j], elem);
      let notSeen = isCommon ? !_.contains(res, elem) : false;

      if (isCommon && notSeen) {
        res.push(elem);
      }
    }
  }

  return res;
};

_.difference = function (arr) {
  let length = arr ? arr.length : 0;
  let res = [];

  for (let i = 0; i < length; i++) {
    let elem = arr[i];

    for (let j = 1; j < arguments.length; j++) {
      let isNotCommon = !_.contains(arguments[j], elem);

      if (isNotCommon) {
        res.push(elem);
      }
    }
  }

  return res;
};

_.throttle = function (iteratee, wait, options) {
  let readyToUse = true;
  let reCalled;
  let res;

  return function () {
    if (readyToUse) {
      readyToUse = false;
      res = iteratee.apply(this, arguments);
      setTimeout(() => {
        readyToUse = true;
        if (reCalled) {
          res = iteratee.apply(this, arguments);
          reCalled = false;
        }
      }, wait);
    } else {
      reCalled = true;
    }

    return res;
  };
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
