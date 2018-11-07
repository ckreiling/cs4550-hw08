function snakeToCamel(snake) {
  const regex = /(_[a-zA-Z])/g;
  return snake.replace(regex, function(match) {
    return match[1].toUpperCase();
  });
}

// put recursive in the name so callers know that it's inefficien for deeply
// nested objects
export function recursiveSnakeToCamel(obj) {
  if (Array.isArray(obj)) return obj.map(recursiveSnakeToCamel);
  if (obj === null || obj === "undefined" || typeof obj !== "object") {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = snakeToCamel(key);
    acc[camelCaseKey] = recursiveSnakeToCamel(obj[key]);

    return acc;
  }, {});
}

export default snakeToCamel;
