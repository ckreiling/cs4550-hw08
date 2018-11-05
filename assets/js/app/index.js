import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";

import store from "./store";

// routes
import { Login, Register, AuthHome } from "./routes";
import Layout from "./components/layout";

/**
 * The root of the SPA.
 * @param {React.Props} props
 */
export default function(props) {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <Login path="login" />
          <Register path="register" />
          {/** Will redirect if unauthenticated */}
          <AuthHome default />
        </Router>
      </Layout>
    </Provider>
  );
}
