import { recursiveSnakeToCamel } from "../utils/snake-to-camel";
import { recursiveCamelToSnake } from "../utils/camel-to-snake";

/**
 * File for our HTTP client. Consolidates the interactions w/ the backend to
 * a single file.
 */

const basePath = "/api/v1";

const headers = {
  "Content-Type": "application/json"
};

function putTokenHeader(token) {
  if (process.env.NODE_ENV !== "production" && !token) {
    throw new Error(`There is no token for the authenticated request.`);
  }
  return { ...headers, "auth-token": token };
}

function jsonFetch(request) {
  return fetch(request)
    .then(res => res.json())
    .then(recursiveSnakeToCamel);
}

function fetchToken(email, password) {
  const req = new Request(`${basePath}/session`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers
  });

  return jsonFetch(req);
}

function createUser(email, password) {
  const req = new Request(`${basePath}/users`, {
    method: "POST",
    body: JSON.stringify({ user: { email, password } }),
    headers
  });

  return jsonFetch(req);
}

function fetchUserInfo(token) {
  const headers = putTokenHeader(token);

  const req = new Request(`${basePath}/me`, {
    method: "GET",
    headers
  });

  return jsonFetch(req);
}

function fetchAllUsers() {
  const req = new Request(`${basePath}/users`, {
    method: "GET",
    headers
  });

  return jsonFetch(req);
}

function fetchTodos(token) {
  const headers = putTokenHeader(token);

  const req = new Request(`${basePath}/todos`, {
    method: "GET",
    headers
  });

  return jsonFetch(req);
}

function toggleTodoCompleted(token, todoId) {
  const headers = putTokenHeader(token);

  const req = new Request(`${basePath}/toggle-todo`, {
    method: "POST",
    headers,
    body: { id: todoId }
  });

  return jsonFetch(req);
}

function createTodo(token, todo) {
  const headers = putTokenHeader(token);

  const req = new Request(`${basePath}/todos`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      todo_item: recursiveCamelToSnake(todo)
    })
  });

  return jsonFetch(req);
}

function updateTodo(token, id, todo) {
  const headers = putTokenHeader(token);

  const req = new Request(`${basePath}/todos/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      todo_item: recursiveCamelToSnake(todo)
    })
  });

  return jsonFetch(req);
}

export default {
  fetchToken,
  createUser,
  fetchTodos,
  fetchUserInfo,
  toggleTodoCompleted,
  fetchAllUsers,
  createTodo,
  updateTodo
};
