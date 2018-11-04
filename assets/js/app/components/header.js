import React from "react";
import { Link } from "@reach/router";

import LogoutButton from "./logout-button";
import isLoggedIn from "./higher-order/is-logged-in";

function Header({ isLoggedIn, ...props }) {
  return (
    <div className="container">
      <div className="contentContainer">
        <h1 className="headerText">
          <Link to="/" className="headerLink">
            The Todo App
          </Link>
        </h1>
        {isLoggedIn && (
          <nav>
            <Link className="navLink" to="/">
              Home
            </Link>
            <LogoutButton className="logoutButton" />
          </nav>
        )}
      </div>
    </div>
  );
}

export default isLoggedIn(Header);
