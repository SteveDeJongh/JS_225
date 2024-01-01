// Make a Stack

function makeAStack() {
  let stack = [];

  return {
    pop() {
      return stack.pop();      
    },

    push(val) {
      stack.push(val);
    },

    printStack() {
      stack.forEach(val => console.log(val));
    },
  }
}

let stack = makeAStack();

stack.push('hello');
stack.push('World');
stack.printStack();
stack.pop();
stack.printStack();