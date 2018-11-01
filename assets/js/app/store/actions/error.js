// we'll just have an app-wide error. No need for specific errors
const ERROR = "todos/error/add_error";
const REMOVE_ERROR = "todos/error/remove_error";

export default function reducer(state = "", action) {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case REMOVE_ERROR:
      return "";
    default:
      return state;
  }
}

export function error(message) {
  return { type: ERROR, payload: message };
}

export function removeError() {
  return { type: REMOVE_ERROR };
}
