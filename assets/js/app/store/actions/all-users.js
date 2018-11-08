import client from "../client";
import { error } from "./error";

export const UPDATE_ALL_USERS = "todos/allUsers/update_all_users";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ALL_USERS:
      return action.payload;
    default:
      return state;
  }
}

export function updateAllUsers(users) {
  return { type: UPDATE_ALL_USERS, payload: users };
}

// supplies login functionality
export function fetchAllUsers() {
  return async dispatch => {
    const res = await client.fetchAllUsers();
    if (res.error) {
      dispatch(error(res.error));
    } else {
      const { data: users } = res;
      const userObj = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      dispatch(updateAllUsers(userObj));
    }
  };
}
