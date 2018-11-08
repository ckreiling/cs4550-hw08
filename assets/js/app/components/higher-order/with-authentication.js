import React from "react";
import { Redirect } from "@reach/router";

import isLoggedIn from "./is-logged-in";

const withAuthentication = (Component, to = "/login") =>
  isLoggedIn(({ isLoggedIn, ...props }) => {
    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      return <Redirect to={to} noThrow />;
    }
  });

export default withAuthentication;
