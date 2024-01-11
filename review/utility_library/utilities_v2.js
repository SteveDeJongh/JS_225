(function() {
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

      findWhere(matchMe) {
        let mkey = Object.keys(matchMe);
        let match = undefined;

        for (let i = 0; i < element.length; i += 1) {
          let curr = element[i];
          if (mkey.every(k => matchMe[k] === curr[k])) {
            match = curr;
            break;
          }
        }

        return match;
      },

      where(matchMe) {
        let mkey = Object.keys(matchMe);
        let matches = [];

        for (let i = 0; i < element.length; i += 1) {
          let curr = element[i];
          if (mkey.every(k => matchMe[k] === curr[k])) {
            matches.push(curr);
          }
        }

        return matches;
      },

      pluck(key) {
        let values = [];

        element.forEach(obj => {
          if (obj[key] !== undefined) {
            values.push(obj[key]);
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
    };

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

    _.extend = function() {
      let args = [].slice.call(arguments, 0);

      for (let i = args.length - 1; i > 0; i -= 1) {
        let curr = args[i];

        Object.keys(curr).forEach(key => {
          args[i - 1][key] = curr[key];
        });
      }
      return args[0];
    },

  window._ = _;
})();