import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import localStorageHandler from "./local-storage-handler";
import rootReducer from "./root-reducer";
import { updateToken } from "./actions/token";

const store = createStore(rootReducer, applyMiddleware(thunk));

// If the token is stored in the browser's localStorage, authenticate the user
// on page-load.
const token = localStorageHandler.getToken();
if (token) {
  store.dispatch(updateToken(token));
}

export default store;
