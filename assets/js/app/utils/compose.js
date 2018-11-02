/**
 * Higher order function for passing an object through a list of functions.
 * @param  {...Function} funcs
 */
function compose(...funcs) {
  // If not in production, throw a descriptive error if a non-function object is
  // passed in.
  if (process.env.NODE_ENV !== "production") {
    if (funcs.length === 0) {
      throw new Error(`Compose requires a list of funcs - you passed none.`);
    }

    funcs.forEach(func => {
      if (typeof func !== "function") {
        throw new Error(
          `Compose must be passed a list of functions, you passed: ${funcs}`
        );
      }
    });
  }

  return composable => funcs.reduce((acc, func) => func(acc), composable);
}

export default compose;
