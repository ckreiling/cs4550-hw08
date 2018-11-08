import React from "react";
import { Link } from "@reach/router";

import LogoutButton from "./logout-button";
import isLoggedIn from "./higher-order/is-logged-in";

function Header({ isLoggedIn, ...props }) {
  return (
    <div className="container">
      <div className="contentContainer">
        <h1 className="headerText">
          <Link to="/todos" className="headerLink">
            The Todo App
          </Link>
        </h1>
        {isLoggedIn && (
          <nav className="nav">
            <LogoutButton className="logoutButton" />
          </nav>
        )}
        {!isLoggedIn && (
          <nav className="nav">
            <Link className="navLink" to="/login">
              Login
            </Link>
            <Link className="navLink" to="/register">
              Register
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}

export default isLoggedIn(Header);
