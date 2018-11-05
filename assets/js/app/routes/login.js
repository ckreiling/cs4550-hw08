import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { navigate } from "@reach/router/lib/history";

import * as tokenActions from "../store/actions/token";
import compose from "../utils/compose";
import isLoggedIn from "../components/higher-order/is-logged-in";

const initialState = () => ({
  username: "",
  password: ""
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState();

    this.handleInput = this.handleInput.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  handleInput(event) {
    if (event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  verifyInputs() {
    if (!this.state.username || !this.state.password) {
      this.setState({
        error: "You must fill both the username and the password fields."
      });
      return false;
    }
    return true;
  }

  submit() {
    if (this.verifyInputs()) {
      this.props.submit(this.state.username, this.state.password);
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      navigate("/");
      return null;
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.submit();
        }}
      >
        {this.state.error ? this.state.error : ""}
        <div>
          Username:
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInput}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInput}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(tokenActions.fetchToken, dispatch)
});

export default compose(
  isLoggedIn,
  connect(
    null,
    mapDispatchToProps
  )
)(Login);
