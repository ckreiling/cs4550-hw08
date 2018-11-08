import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";

import compose from "../utils/compose";
import isLoggedIn from "../components/higher-order/is-logged-in";
import * as userActions from "../store/actions/user";

const initialState = () => ({
  username: "",
  password: ""
});

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState();

    this.handleInput = this.handleInput.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
  }

  handleInput(inputName) {
    return event => {
      if (event) {
        this.setState({
          [inputName]: event.target.value
        });
      }
    };
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
      this.props.create(this.state.username, this.state.password);
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/todos" noThrow />;
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
          New Username:
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleInput("username")}
          />
        </div>
        <div>
          New Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInput("password")}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  create: bindActionCreators(userActions.createUser, dispatch)
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  isLoggedIn
)(Register);
