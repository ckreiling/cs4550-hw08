import * as errorActions from "./error";
import client from "../client";

const UPDATE_TODOS = "todos/todos/update_todos";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_TODOS:
      return action.payload;
    default:
      return state;
  }
}

export function updateTodos(idToTodo) {
  return { type: UPDATE_TODOS, payload: idToTodo };
}

export function newTodo(todo) {
  return async (dispatch, getState) => {};
}

export function fetchTodos() {
  return async (dispatch, getState) => {
    const { token } = getState();

    const { data: todos } = await client.fetchTodos(token);

    // Turn the todos state upside-down
    const todosState = todos.reduce((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {});

    dispatch(updateTodos(todosState));
  };
}
