import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";
import localStorageMiddleware from "./middleware/local-storage";

let middleware = [thunk, localStorageMiddleware];

if (process.env.NODE_ENV !== "production") {
  // non-production middleware
  const loggerMiddleware = require("./middleware/logger").default;
  middleware = [...middleware, loggerMiddleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
