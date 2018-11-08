import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    // If a todo is passed in as a prop, we intend to edit it. Otherwise
    // we're creating a new todo.
    this.state = props.todo
      ? { todo: props.todo }
      : {
          todo: {
            title: "",
            description: ""
          }
        };

    this.handleInput = this.handleInput.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInput(event) {
    if (event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  verifyInputs() {
    if (!this.state.todo.title || !this.state.todo.description) {
      this.setState({
        error: "You must fill both the title and the description fields."
      });
      return false;
    }
    return true;
  }

  submit() {
    if (this.verifyInputs()) {
      this.props.submit(this.state.todo);
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
          Title:
          <input
            type="text"
            name="title"
            value={this.state.todo.title}
            name="username"
            onChange={this.handleInput}
          />
        </div>
        <div>
          Description:
          <textarea
            name="description"
            value={this.state.todo.description}
            onChange={this.handleInput}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    );
  }
}
