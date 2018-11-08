import { UPDATE_TOKEN, CLEAR_TOKEN } from "../actions/token";

const tokenKey = "token";

const localStorageMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case UPDATE_TOKEN:
      localStorage.setItem(tokenKey, token);
      break;
    case CLEAR_TOKEN:
      localStorage.removeItem(tokenKey);
      break;
    default:
      break;
  }

  // When we initialize the store, check localStorage for the token.
  let token;
  if (getState() === "undefined" && (token = localStorage.getItem(tokenKey))) {
    dispatch(updateToken(token));
  }

  // send it onward
  return next(action);
};

export default localStorageMiddleware;
