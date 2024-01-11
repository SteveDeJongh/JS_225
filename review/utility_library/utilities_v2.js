(function() {
  let findObjs = function(element, matchMe, multiple) {
    let mkey = Object.keys(matchMe);
    let match = multiple ? [] : undefined;

    for (let i = 0; i < element.length; i += 1) {
      let curr = element[i];
      if (mkey.every(k => matchMe[k] === curr[k])) {
        if (multiple) {
          match.push(curr);
        } else {
          match = curr;
          break;
        }
      }
    }

    return match;
  };

  let _ = function(element) {
    let u = {
      first: function() {
        return element[0];
      },

      last() {
        return element[element.length - 1];
      },

      without() {
        let args = [].slice.call(arguments, 0);
        return element.filter(x => {
          return args.indexOf(x) === -1;
        });
      },

      lastIndexOf(el) {
        let idx = -1;
        for (let i = element.length - 1; i >= 0; i -= 1) {
          if (element[i] === el) {
            idx = i;
            break;
          }
        }

        return idx;
      },

      sample(count) {
        let sampleArr = [],
            copy = element.slice(),
            get = function() {
              let idx = Math.floor(Math.random() * copy.length),
                  el = copy[idx];
              
              copy.splice(idx, 1);
              return el;
            };
        
        if (!count) return get();

        while(count) {
          sampleArr.push(get());
          count -= 1;
        }

        return sampleArr;
      },

      // findWhere(matchMe) {
      //   let mkey = Object.keys(matchMe);
      //   let match = undefined;

      //   for (let i = 0; i < element.length; i += 1) {
      //     let curr = element[i];
      //     if (mkey.every(k => matchMe[k] === curr[k])) {
      //       match = curr;
      //       break;
      //     }
      //   }

      //   return match;
      // },

      // where(matchMe) {
      //   let mkey = Object.keys(matchMe);
      //   let matches = [];

      //   for (let i = 0; i < element.length; i += 1) {
      //     let curr = element[i];
      //     if (mkey.every(k => matchMe[k] === curr[k])) {
      //       matches.push(curr);
      //     }
      //   }

      //   return matches;
      // },

      // Alternate implementation of findWhere and Where using a shared `findObjs` function.

      findWhere(matchMe) {
        return findObjs(element, matchMe, false);
      },

      where(matchMe) {
        return findObjs(element, matchMe, true);
      },

      pluck(query) {
        let values = [];

        element.forEach(obj => {
          let keys = Object.keys(obj);
          // if (obj[query] !== undefined) {// Could cause an issue if the query is actually assigned to `undefined`.
          if (keys.includes(query)) {
            values.push(obj[query]);
          }
        })

        return values;
      },

      keys() {
        return Object.keys(element);
      },

      values() {
        return Object.values(element);
      },

      pick() {
        let newObj = {};
        let keys = [].slice.call(arguments, 0);

        keys.forEach(k => {
          if (k in element) { // instead of: 'element[k] !== undefined'
            newObj[k] = element[k];
          }
        })

        return newObj;
      },

      omit() {
        let newObj = {};
        let excludeKeys = [].slice.call(arguments, 0);

        Object.keys(element).forEach(k => {
          if (!excludeKeys.includes(k)) {
            newObj[k] = element[k];
          }
        })

        return newObj;
      },

      has(prop) {
        return {}.hasOwnProperty.call(element, prop) // instead of Object.keys(element).includes(prop);
      },
    };

    (['isElement', 'isArray', 'isObject', 'isFunction', 'isString', 'isNumber', 'isBoolean' ]).forEach(method => {
      u[method] = function() {_[method].call(u, element); };
    })

    return u;
  };

  _.range = function(start, stop) {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    let result = [];
    for (let i = start; i < stop; i += 1) {
      result.push(i);
    }
    return result;
  };

  // _.extend = function() {
  //     let args = [].slice.call(arguments, 0);

  //     for (let i = args.length - 1; i > 0; i -= 1) {
  //       let curr = args[i];

  //       Object.keys(curr).forEach(key => {
  //         args[i - 1][key] = curr[key];
  //       });
  //     }
  //     return args[0];
  //   },;

  // Recursive _.extend()
  _.extend = function() {
    let args = [].slice.call(arguments);
    let old_obj = args.pop();
    let new_obj = args[args.length - 1];

    for (var prop in old_obj) {
      new_obj[prop] = old_obj[prop];
    }

    return args.length === 1 ? new_obj : _.extend.apply(_, args);
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1; // checks if `obj` is defined, and if it's type is a element type.
  };

  _.isArray = Array.isArray || function(arg) {
    return toString.call(arg) === '[object Array]';
  };

  _.isObject = function(arg) {
    return typeof arg === 'object' || typeof arg === 'function' && !!arg;
  };

  _.isFunction = function(arg) {
    return typeof arg === 'function';
  };

  _.isString = function(arg) {
    return typeof arg === 'string' || arg instanceof String;
  };

  _.isNumber = function(arg) {
    return typeof arg === 'number' || arg instanceof Number;
  }
  
  _.isBoolean = function(arg) {
    return typeof arg === 'boolean' || arg instanceof Boolean;
  }

  window._ = _;
})();