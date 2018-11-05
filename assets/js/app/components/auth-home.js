import React from "react";
import { Router } from "@reach/router";

import withAuthentication from "./higher-order/with-authentication";

import TodosList from "./todos-list";

function AuthHome(props) {
  return (
    <Router>
      <TodosList path="todos" />
    </Router>
  );
}

export default withAuthentication(AuthHome);
