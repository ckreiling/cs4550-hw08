import client from "../client";
import { error } from "./error";

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
  return { type: UPDATE_TOKEN, payload: token };
}

export function deleteToken() {
  return { type: CLEAR_TOKEN };
}

// supplies login functionality
export function fetchToken(email, password) {
  return async (dispatch, getState) => {
    const res = await client.fetchToken(email, password);
    if (res.error) {
      dispatch(error(res.error));
    } else {
      localStorage.setItem("token", res.data.token);
      dispatch(updateToken(res.data.token));
    }
  };
}
