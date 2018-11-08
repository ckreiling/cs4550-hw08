import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createOrUpdateTodo } from "../store/actions/todos";

class TodoItemForm extends React.Component {
  constructor(props) {
    super(props);

    const todoId = new Number(props.todoId);

    console.log(props);
    this.state = {};

    // If a todo is passed in as a prop, we intend to edit it. Otherwise
    // we're creating a new todo.
    if (props.todoId) {
      if (props.todos[todoId]) {
        this.state.todo = props.todos[todoId];
      } else {
        this.state.error = `You don't own and are not assigned the todo with Id ${todoId}`;
        this.state.todo = {};
      }
    } else {
      this.state = {
        todo: {
          title: "",
          description: ""
        }
      };
    }

    this.state.isOwner = this.state.todo.userId === this.props.currentUserId;

    this.handleInput = this.handleInput.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInput(event) {
    if (event.target) {
      event.persist();
      this.setState(({ todo }) => ({
        todo: { ...todo, [event.target.name]: event.target.value }
      }));
    }
  }

  verifyInputs() {
    if (!this.state.todo.title || !this.state.todo.description) {
      this.setState({
        error: "You must fill the required title and description fields."
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
            onChange={this.handleInput}
            disabled={this.state.isOwner}
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

const mapStateToProps = ({ allUsers, user, todos }) => ({
  allUsers,
  currentUserId: user.id,
  todos
});

const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(createOrUpdateTodo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemForm);
