function recursiveObjOp(operation) {
  return function recursiveOp(obj) {
    if (Array.isArray(obj)) return obj.map(recursiveOp);
    if (obj === null || obj === "undefined" || typeof obj !== "object") {
      return obj;
    }

    return Object.keys(obj).reduce((acc, key) => {
      const newKey = operation(key);
      acc[newKey] = recursiveOp(obj[key]);

      return acc;
    }, {});
  };
}

export default recursiveObjOp;
