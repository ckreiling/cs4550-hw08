import React from "react";
import { Router } from "@reach/router";

import withAuthentication from "../components/higher-order/with-authentication";
import TodosList from "../components/todos-list";
import TodoItemForm from "../components/todo-item-form";

function Home(props) {
  return (
    <Router>
      <TodosList path="todos">
        {/** Nested todoItemForm for rendering a todo */}
        <TodoItemForm path=":todoId" />
        <TodoItemForm path="new-todo" />
      </TodosList>
    </Router>
  );
}

export default withAuthentication(Home);
