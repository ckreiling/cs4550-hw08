import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // If a todo is passed in as a prop, we intend to edit it. Otherwise
    // we're creating a new todo.
    this.state = props.todo ? { todo: props.todo } : { todo: null };

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
        <button type="submit">Update</button>
      </form>
    );
  }
}
