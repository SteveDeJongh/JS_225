// Our very own Bind()

function myBind(func, context) {
  return function() {
    return func.apply(context);
  }
}
