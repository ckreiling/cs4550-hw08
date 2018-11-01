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

export function updateUser(user) {
  return { type: UPDATE_USER, payload: user };
}

export function clearUser() {
  return { type: CLEAR_USER };
}
