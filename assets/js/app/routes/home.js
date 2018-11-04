import React from "react";
import isLoggedIn from "../components/higher-order/is-logged-in";
import { Link } from "@reach/router";

function Home({ isLoggedIn, ...props }) {
  return (
    <div>
      {(!isLoggedIn && (
        <p style={{ margin: "0 auto", textAlign: "center" }}>
          <Link to="/login">Login to start creating todos!</Link>
        </p>
      )) || <AuthHome />}
    </div>
  );
}

export default isLoggedIn(Home);
