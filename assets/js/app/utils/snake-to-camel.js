import recursiveObjOp from "./recursive-obj-op";

function snakeToCamel(snake) {
  const regex = /(_[a-zA-Z])/g;
  return snake.replace(regex, function(match) {
    return match[1].toUpperCase();
  });
}

export const recursiveSnakeToCamel = recursiveObjOp(snakeToCamel);

export default snakeToCamel;
