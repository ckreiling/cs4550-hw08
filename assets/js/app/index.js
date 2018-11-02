import React from "react";
import { Provider } from "react-redux";

import store from "./store";

/**
 * The root of the SPA.
 * @param {React.Props} props
 */
export default function(props) {
  return (
    <Provider store={store}>
      <div className="appContainer">Hello, world!</div>
    </Provider>
  );
}
