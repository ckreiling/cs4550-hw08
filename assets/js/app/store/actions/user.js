import client from "../client";
import * as errors from "./error";
import { fetchToken } from "./token";

const UPDATE_USER = "todos/user/update_user";
const CLEAR_USER = "todos/user/clear_user";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.payload;
    case CLEAR_USER:
      return {};
    default:
      return state;
  }
}

export function updateUser(userId, email) {
  return { type: UPDATE_USER, payload: { userId, email } };
}

export function clearUser() {
  return { type: CLEAR_USER };
}

export function fetchCurrentUser() {
  return async (dispatch, getState) => {
    const { token } = getState();

    const { data: user } = await client.fetchUserInfo(token);

    dispatch(updateUser(user.id, user.email));
  };
}

// used for user registration, and then login
export function createUser(email, password) {
  return async (dispatch, getState) => {
    const res = await client.createUser(email, password);

    if (!res.errors) {
      dispatch(fetchToken(email, password));
    } else {
      dispatch(
        errors.error(
          Object.keys(res.errors).map(key => `${key}: ${res.errors[key]}`)
        )
      );
    }
  };
}
