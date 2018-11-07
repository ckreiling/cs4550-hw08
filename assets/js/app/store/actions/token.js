import client from "../client";
import { error } from "./error";
import localStorageHandler from "../local-storage-handler";
import { updateUser } from "./user";

const UPDATE_TOKEN = "todos/token/update_token";
const CLEAR_TOKEN = "todos/token/clear_token";

export default function reducer(state = "", action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return action.payload;
    case CLEAR_TOKEN:
      return "";
    default:
      return state;
  }
}

export function updateToken(token) {
  localStorageHandler.setToken(token);
  return { type: UPDATE_TOKEN, payload: token };
}

export function deleteToken() {
  localStorageHandler.removeToken();
  return { type: CLEAR_TOKEN };
}

// supplies login functionality
export function fetchToken(email, password) {
  return async dispatch => {
    const res = await client.fetchToken(email, password);
    if (res.error) {
      dispatch(error(res.error));
    } else {
      const { token, user_id } = res.data;
      dispatch(updateToken(token));
      dispatch(updateUser(user_id, email));
    }
  };
}
