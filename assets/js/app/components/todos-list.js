import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "@reach/router";

import { fetchTodos } from "../store/actions/todos";

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;

    const todosArray = Object.keys(todos).map(id => todos[id]);

    return (
      <div>
        {todosArray.length !== 0 &&
          todosArray.map(todo => (
            <Link to={`/todos/${todo.id}`} key={todo.id}>
              {todo.title}
            </Link>
          ))}
        {todosArray.length === 0 && "You have no todos!!!"}
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos
});

const mapDispatchToProps = dispatch => ({
  fetchTodos: bindActionCreators(fetchTodos, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
