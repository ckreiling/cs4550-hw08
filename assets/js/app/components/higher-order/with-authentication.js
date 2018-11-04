import React from "react";
import { navigate } from "@reach/router";

import isLoggedIn from "./is-logged-in";

const withAuthentication = (Component, to = "/login") =>
  isLoggedIn(({ isLoggedIn, ...props }) => {
    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      navigate(to, { state: { from: location.pathname } });
      return null;
    }
  });

export default withAuthentication;
