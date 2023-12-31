// The Franchise

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    });
  },
};

// The reason this code does not return the desired result is because `this` loses it's context within the anonymous function passed to `map`. We can instead use closure to maintain reference to the `name` string, or the original `this` object reference by assigning it to a local variable within `allMovies`.

console.log(franchise.allMovies());

const franchise1 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let name = this.name;
    return [1, 2, 3].map(function(number) {
      return `${name} ${number}`;
    });
  },
};

console.log(franchise1.allMovies());

const franchise2 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

console.log(franchise2.allMovies());

// Alternatively, we can use arrow functions to avoid creating their own `this` binding.

const franchise3 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number =>`${this.name} ${number}`);
  },
};

console.log(franchise3.allMovies());