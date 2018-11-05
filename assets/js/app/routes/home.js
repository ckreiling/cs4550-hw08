import React from "react";
import { Router } from "@reach/router";

import withAuthentication from "../components/higher-order/with-authentication";
import TodosList from "../components/todos-list";

function Home({ props }) {
  return (
    <Router>
      <TodosList path="todos" />
    </Router>
  );
}

export default withAuthentication(Home);
