import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";
import { updateToken } from "./actions/token";

const store = createStore(rootReducer, applyMiddleware(thunk));

if (localStorage.getItem("token")) {
  store.dispatch(updateToken(localStorage.getItem("token")));
}

export default store;
