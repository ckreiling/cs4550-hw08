// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

// To use async-await
import "@babel/polyfill";

// Start our single page application
import React from "react";
import ReactDom from "react-dom";
import App from "./app";

ReactDom.render(<App />, document.getElementById("root"));
