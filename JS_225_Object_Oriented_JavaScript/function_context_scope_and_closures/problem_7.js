// Garbade Collection

function makeArrays() {
  let array = [];

  return () => {
    array.push('');
    return array;
  };
}

const pushIt = makeArrays();
pushIt();
// more code

// No. Since `pushIt` can be called multiple times, it needs to retain a reference to the `array` variable in the closure. Since `array` is never reassigned, every call to `pushIt` return a pointer to the same array. The array gets mutated by each invocation, but it's the same array, so it is not eligble for garbage collection.