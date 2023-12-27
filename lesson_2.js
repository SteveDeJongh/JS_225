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

people.add = function(person) {
  this.collection.push(person);
};

let grandFather = {
  firstName: 'Grand',
  lastName: 'Father',
};

people.add(grandFather);

people.rollCall();