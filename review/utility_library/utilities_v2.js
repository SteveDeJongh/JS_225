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