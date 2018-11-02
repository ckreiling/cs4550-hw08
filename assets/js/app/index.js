import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";

import store from "./store";

// routes
import { Login, Register } from "./routes";

/**
 * The root of the SPA.
 * @param {React.Props} props
 */
export default function(props) {
  return (
    <Provider store={store}>
      <div className="appContainer">
        <Router>
          <Login path="login" />
          <Register path="register" />
        </Router>
      </div>
    </Provider>
  );
}
