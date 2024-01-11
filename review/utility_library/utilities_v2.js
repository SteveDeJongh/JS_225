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
      }
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

  window._ = _;
})();