/**
 * File for handling all interactions with the local storage, for specific
 * objects that are central to application logic.
 */

const tokenKey = "token";

function getToken() {
  return localStorage.getItem(tokenKey);
}

function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

function removeToken() {
  localStorage.removeItem(tokenKey);
}

export default { getToken, setToken, removeToken };
