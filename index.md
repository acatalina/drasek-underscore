# My own implementation of underscore library

Hello! My name is Alvaro and I wanted to share with you various underscore methods (listed below) I implemented while learning javascript. Pretty sure they could do with further tinkering, although not sure how many times I have changed them already!

For those who are less familiar with the underscore library, they are a series of helpful and clever methods that you can find on [underscore](http://underscorejs.org).

Oh, the website has been made using markdown and Jekyll theme Cayman because...why not? I never tried before. Thank you!

### _.getIteratee (helper function):
``` javascript
_.getIteratee = function getIteratee(method) {
  switch (typeof method) {
    case 'function':
      return method;
    case 'string':
      return function(elem) {
        return elem[method];
      };
    default: 
      return function(elem) {
        return elem;
      };
  }
};
```

### _.identity:
``` javascript
_.identity = function () {
  return arguments[0];
};
```

### _.first:
``` javascript
_.first = function (arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;
  
  return !n ? arr[0] : arr.slice(0, n);
};
```
### _.last:
``` javascript
_.last = function (arr, n) {
  if (!Array.isArray(arr)) return;
  if (typeof n === 'boolean') {
    if (n) { n = 0; } else { return []; }
  }
  if (Array.isArray(n)) n = n[0] || 1;

  return !n ? arr[arr.length - 1] : arr.slice(-n);
};
```

### _.each:
``` javascript
_.each = function(list, iteratee, context) {
  let func = _.getIteratee(iteratee).bind(context)
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
```

### _.indexOf:
``` javascript
_.indexOf = function(arr, val, isSorted) {
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
```
### _.filter:
``` javascript
_.filter = function(list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (iteratee(list[i], i , list)) {
        res.push(list[i]);
      };
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
```

### _.reject:
``` javascript
_.reject = function(list, predicate, context) {
  let iteratee = _.getIteratee(predicate).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      if (!iteratee(list[i], i , list)) {
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
```

### _.uniq:
``` javascript
_.uniq = function(arr, isSorted, iteratee) {
  if (iteratee === undefined && typeof isSorted === 'function') {
    iteratee = isSorted;
    isSorted = false;
  }

  let res = [];
  let seen = isSorted ? undefined : [];
  let hasBeenSeen = isSorted ? hasBeenSeenSorted : hasBeenSeenUnsorted;
  
  function hasBeenSeenSorted(val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen === val) {
      return true;
    }

    seen = val;
    return false;
  }

  function hasBeenSeenUnsorted(val, i, arr) {
    val = getComparable(val, i, arr);

    if (seen.indexOf(val) > -1) {
      return true;
    }

    seen.push(val);
    return false;
  }

  function getComparable(val, i, arr) {
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
```

### _.map:
``` javascript
_.map = function(list, iteratee, context) {
  let func = _.getIteratee(iteratee).bind(context);
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      let transformed = func(list[i], i , list);
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
```

### _.pluck:
``` javascript
_.pluck = function(list, prop) {
  let i = 0;
  let res = [];

  if (Array.isArray(list)) {
    for (i; i < list.length; i++) {
      res.push(list[i][prop]);
    }
  }

  return res;
};
```
<span id="reduce"></span>
### _.reduce:
``` javascript:
_.reduce = function(list, iteratee, memo, context) {
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
```

### _.contains:
``` javascript
_.contains = function(list, value, fromIndex) {
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
```

### _.every:
``` javascript
_.every = function(list, predicate, context) {
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
```

### _.some:
``` javascript
_.some = function(list, predicate, context) {
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
```

### _.extend:
``` javascript
_.extend = function(destination, source) {
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
```

### _.defaults:
``` javascript
_.defaults = function(object, defaults) {
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
```
