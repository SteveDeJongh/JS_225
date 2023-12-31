// myBind() Improved

function myBind(func, context, ...partialArgs) {
  return function(...args) {
    let fullArgs = partialArgs.concat(args);
    return func.apply(context, fullArgs);
  };
}

