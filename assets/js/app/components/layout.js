import React from "react";

import Header from "./header";

export default function(props) {
  return (
    <div>
      <Header />
      <div className="contentContainer">{props.children}</div>
    </div>
  );
}
