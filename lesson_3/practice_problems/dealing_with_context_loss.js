// Dealing with Context Loss

// 1

// undefined undefined is a undefined.

// The `getDescription` method lost its conext when we passed it to `logReturnVal` as an argument.

// 2

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

// 3

let getTurkDescription = turk.getDescription.bind(turk);

// 4

// The code will not produce the desired ouptut at `this` within the function passed to `forEach` as an arugment lose the surrouding context and will reference the global object.

// 5

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// 6

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();

// 7

let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
};

TESgames.listGames();

// 8

// `a` will stil be 0.

// 9

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

foo.a // 3

// 10

/*

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
    increment.apply(this);
    increment.apply(this);
  }
};

*/

// To this:

let foo = {
  a: 0,
  incrementA() {
    let increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
}

foo.incrementA();

foo.a