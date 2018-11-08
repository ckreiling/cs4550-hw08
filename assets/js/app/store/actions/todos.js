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

export function createOrUpdateTodo(todo) {
  return async (dispatch, getState) => {
    const { token } = getState();

    // If the todo has an ID, then we're just updating it.
    if (todo.id) {
      await client.updateTodo(token, todo.id, todo);
    } else {
      await client.createTodo(token, todo);
    }

    // After creating or updating a todo, re-fetch the todos-list for the user.
    dispatch(fetchTodos());
  };
}

export function toggleTodoCompleted(todoId) {
  return async (dispatch, getState) => {
    const { token, todos } = getState();

    const { data: todo, error } = await client.toggleTodoCompleted(
      token,
      todoId
    );

    // todo handle error case? shouldn't be possible with the current app tho

    const updatedTodos = {
      ...todos,
      [todo.id]: todo
    };

    dispatch(updateTodos(updatedTodos));
  };
}
