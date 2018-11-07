import recursiveObjOp from "./recursive-obj-op";

function camelToSnake(camel) {
  const regex = /[A-Z]/g;
  return camel.replace(regex, function(match) {
    return `_${match.toLowerCase()}`;
  });
}

export const recursiveCamelToSnake = recursiveObjOp(camelToSnake);

export default camelToSnake;
