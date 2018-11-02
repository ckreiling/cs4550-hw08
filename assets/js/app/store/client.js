/**
 * File for our HTTP client. Consolidates the interactions w/ the backend to
 * a single file.
 */

const basePath = "/api/v1";

const headers = {
  "Content-Type": "application/json"
};

const jsonFetch = async function(request) {
  return fetch(request).then(res => res.json());
};

const fetchToken = async function(email, password) {
  const req = new Request(`${basePath}/session`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers
  });

  return jsonFetch(req);
};

const createUser = async function(email, password) {
  const req = new Request(`${basePath}/users`, {
    method: "POST",
    body: JSON.stringify({ user: { email, password } }),
    headers
  });

  return jsonFetch(req);
};

export default { fetchToken, createUser };