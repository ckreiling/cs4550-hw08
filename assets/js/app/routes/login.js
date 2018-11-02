import React from "react";

const initialState = () => ({
  username: "",
  password: ""
});

export default class Login extends React.Component {
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
      this.props.submit(this.state.username, this.state.password);
    }
  }

  render() {
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
            onChange={this.handleInput("username")}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInput("password")}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}
