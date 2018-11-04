import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as tokenActions from "../store/actions/token";

function LogoutButton({ logout, children, className }) {
  return (
    <button onClick={logout} className={className}>
      {children || "Logout"}
    </button>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: bindActionCreators(tokenActions.deleteToken, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
