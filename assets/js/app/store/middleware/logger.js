const logger = ({ getState }) => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  console.info("initial state", getState());

  // send it onward
  let result = next(action);

  console.info("new state", getState());
  console.groupEnd();

  return result;
};

export default logger;
