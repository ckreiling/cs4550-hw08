import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import localStorageHandler from "./local-storage-handler";
import rootReducer from "./root-reducer";
import { updateToken } from "./actions/token";

let middleware = [thunk];

if (process.env.NODE_ENV !== "production") {
  // non-production middleware
  const loggerMiddleware = require("./middleware/logger").default;
  middleware = [...middleware, loggerMiddleware];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

// If the token is stored in the browser's localStorage, authenticate the user
// on page-load.
const token = localStorageHandler.getToken();
if (token) {
  store.dispatch(updateToken(token));
}

export default store;
