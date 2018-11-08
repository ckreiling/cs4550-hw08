import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { updateToken } from "./actions/token";
import rootReducer from "./root-reducer";
import localStorageMiddleware from "./middleware/local-storage";
import onLoginMiddleware from "./middleware/on-login";

import { tokenKey } from "./middleware/local-storage";

let middleware = [thunk, localStorageMiddleware, onLoginMiddleware];

if (process.env.NODE_ENV !== "production") {
  // non-production middleware
  const loggerMiddleware = require("./middleware/logger").default;
  middleware = [...middleware, loggerMiddleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

// load the token from localStorage and persist it
const token = localStorage.getItem(tokenKey);
if (token) {
  // This dispatch will initialize the application with onLogin middleware.
  store.dispatch(updateToken(token));
}

export default store;
