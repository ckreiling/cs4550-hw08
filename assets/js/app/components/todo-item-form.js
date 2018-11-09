import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createOrUpdateTodo } from "../store/actions/todos";

const getInitialState = () => ({
  isOwner: true,
  todo: { title: "", description: "" },
  isSet: false
});

class TodoItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = getInitialState();

    this.handleInput = this.handleInput.bind(this);
    this.verifyInputs = this.verifyInputs.bind(this);
    this.submit = this.submit.bind(this);
    this.newNumber = this.newNumber.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const condition =
      (Object.keys(props.todos).length !== 0 &&
        props.currentUserId !== undefined &&
        props.todoId &&
        !props.newTodo &&
        !state.isSet) ||
      (!props.newTodo && props.todoId != state.todo.id);
    if (condition) {
      const todoId = new Number(props.todoId);
      if (props.todos[todoId]) {
        state.todo = props.todos[todoId];
      }

      state.isOwner = state.todo.userId == props.currentUserId;
      state.isSet = true;
    }
    return state;
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
    if (
      !this.state.todo.title ||
      !this.state.todo.description ||
      this.state.todo.minutesSpent < 0
    ) {
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

  newNumber(event) {
    event.persist();
    const targetValue = event.target.value;

    if (targetValue === "") {
      this.setState(({ todo }) => ({
        todo: { ...todo, [event.target.name]: 0 }
      }));
      return;
    }

    const val = parseInt(targetValue);

    if (!isNaN(val)) {
      console.log("updating stae");
      this.setState(({ todo }) => ({
        todo: { ...todo, [event.target.name]: val }
      }));
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
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={this.state.todo.title}
            onChange={this.handleInput}
            disabled={!this.state.isOwner}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={this.state.todo.description}
            onChange={this.handleInput}
          />
        </label>
        <br />
        <label>
          Time spent (15 min increments)
          <input
            type="text"
            value={this.state.todo.timeSpent}
            name="timeSpent"
            onChange={this.newNumber}
          />
        </label>
        <br />
        <label>
          Assigned to:
          <select
            value={this.state.todo.assignedUserId || undefined}
            onChange={this.newNumber}
            name="assignedUserId"
          >
            <option value={null}>None</option>
            {Object.keys(this.props.allUsers).map(userId => (
              <option key={userId} value={userId}>
                {this.props.allUsers[userId].email}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">
          {this.props.newTodo ? "Create" : "Update"}
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ allUsers, user, todos }) => ({
  allUsers,
  currentUserId: user.userId,
  todos
});

const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(createOrUpdateTodo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItemForm);
