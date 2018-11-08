import { UPDATE_TOKEN, CLEAR_TOKEN } from "../actions/token";

export const tokenKey = "token";

const localStorageMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case UPDATE_TOKEN:
      localStorage.setItem(tokenKey, action.payload);
      break;
    case CLEAR_TOKEN:
      localStorage.removeItem(tokenKey);
      break;
    default:
      break;
  }

  // send it onward
  return next(action);
};

export default localStorageMiddleware;
