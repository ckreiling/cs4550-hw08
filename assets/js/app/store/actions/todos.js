import * as errorActions from "./error";

const UPDATE_TODOS = "todos/todos/update_todos";

export default function reducer(state = [], action) {
  switch (action.type) {
    case UPDATE_TODOS:
      return action.payload;
    default:
      return state;
  }
}

export function updateTodos(listOfTodos) {
  return { type: UPDATE_TODOS, payload: listOfTodos };
}

export function fetchTodos() {
  return async (dispatch, getState) => {
    const { token } = getState();
    // TODO do async stuff to fetch the todos for the user.
  };
}
