import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchTodos } from "../store/actions/todos";

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;

    return (
      <div>
        {todos && todos.map(todo => <p key={todo.id}>{todo.title}</p>)}
        {!todos && "You have no todos!!!"}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos: Object.keys(todos).map(id => todos[id])
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: bindActionCreators(fetchTodos, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
