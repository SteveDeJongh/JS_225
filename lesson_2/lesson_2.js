// Lesson 2: Walthrough: Object Methods.

let me = {
  firstName: 'Steve',
  lastName: 'De Jongh',
};

/* Alternatively, we can start with an empty object and add the properties in later.

let me = {};
me.firstName = 'Steve';
me.lastNAme = 'De Jongh';

*/

function fullName(person) {
  console.log(person.firstName + " " + person.lastName);
}

fullName(me); // Steve De Jongh

let friend = {
  firstName: 'John',
  lastName: 'Smith',
}

fullName(friend); // John Smith

let mother = {
  firstName: 'Amber',
  lastName: 'Doe',
};

let father = {
  firstName: 'Shane',
  lastName: 'Doe',
};

fullName(mother);
fullName(father);
/*
let people = [];

people.push(me);
people.push(friend);
people.push(mother);
people.push(father);

// function rollCall(collection) {
//   let length;
//   let i;
//   for (i = 0, length = collection.length; i < length; i += 1) {
//     fullName(collection[i]);
//   }
// }

// The above collection loop can be simplified to:

function rollCall(collection) {
  collection.forEach(fullName)
}

rollCall(people);

// Instead, we can also package our collection and functions together.

let people = {
  collection: [me, friend, mother, father],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },
  rollCall: function() {
    people.collection.forEach(people.fullName);
  },
};

people.rollCall();

// However, this relies on our object being called 'people'. Instead we can use 'this'

*/

/* people object

let people = {
  collection: [me, friend, mother, father],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },
  rollCall: function() {
    people.collection.forEach(this.fullName);
  },
};

people.rollCall();

let grandFather = {
  firstName: 'Grand',
  lastName: 'Father',
};

people.getIndex = function(person) {
  let index = -1;
  this.collection.forEach(function(comparator, i) {
    if (comparator.firstName === person.firstName && 
        comparator.lastName === person.lastName) {
          index = i;
        }
    });
  return index;
};

people.isInvalidPerson = function(person) {
  return typeof person.firstName !== 'string' && typeof person.lastName !== 'string';
};

people.add = function(person) {
  if (this.isInvalidPerson(person)) {
    return;
  }
  this.collection.push(person);
};

people.add(grandFather);

people.remove = function(person) {
  let index;
  if (this.isInvalidPerson(person)) {
    return;
  }

  index = this.getIndex(person);
  if (index === -1) {
    return;
  }

  this.collection.splice(index, 1);
};

people.get = function(person) {
  if (this.isInvalidPerson(person)) {
    return;
  }

  return this.collection[this.getIndex(person)];
}

people.update = function(person) {
  if (this.isInvalidPerson(person)) {
    return;
  }

  let existingPersonId = this.getIndex(person);
  if (existingPersonId === -1) {
    this.add(person);
  } else {
    this.collecton[existingPersonId] = person;
  }
};

console.log(people.getIndex(friend)); // 1
people.remove(friend);
console.log(people.getIndex(friend)); // -1

console.log(people)

*/

let people = {
  collection: [me, friend, mother, father],
  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },
  rollCall: function() {
    people.collection.forEach(this.fullName);
  },
  getIndex: function(person) {
    let index = -1;
    this.collection.forEach(function(comparator, i) {
      if (comparator.firstName === person.firstName && 
          comparator.lastName === person.lastName) {
            index = i;
          }
      });
    return index;
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName !== 'string' && typeof person.lastName !== 'string';
  },
  
  add: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }
    this.collection.push(person);
  },
  remove: function(person) {
    let index;
    if (this.isInvalidPerson(person)) {
      return;
    }
  
    index = this.getIndex(person);
    if (index === -1) {
      return;
    }
  
    this.collection.splice(index, 1);
  },
  get: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }
  
    return this.collection[this.getIndex(person)];
  },
  
  update: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }
  
    let existingPersonId = this.getIndex(person);
    if (existingPersonId === -1) {
      this.add(person);
    } else {
      this.collecton[existingPersonId] = person;
    }
  },
};

console.log(people);

// Functions as Object Factories

function makeCar(accRate, brakeRate) {
  return {
    speed: 0,
    accRate,
    brakeRate,
    accelerate() {
      this.speed += this.accRate;
    },
    brake() {
      this.speed -= this.brakeRate;
      if (this.speed < 0) {
        this.speed = 0;
      }
    },
  }
}

let sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed); // 8

sedan.brake();
console.log(sedan.speed); // 2

sedan.brake();
console.log(sedan.speed); // 0

// let hatchback = makeCar(9);

