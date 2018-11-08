import { combineReducers } from "redux";
import * as reducers from "./actions";
import { CLEAR_TOKEN } from "./actions/token";

const rootReducer = combineReducers(reducers);

function rootReducerResetOnLogout(state, action) {
  if (action.type === CLEAR_TOKEN) {
    state = undefined;
  }

  return rootReducer(state, action);
}

export default rootReducerResetOnLogout;
