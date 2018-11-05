defmodule TodosWeb.TodoItemView do
  use TodosWeb, :view
  alias TodosWeb.TodoItemView

  def render("index.json", %{todos: todos}) do
    %{data: render_many(todos, TodoItemView, "todo_item.json")}
  end

  def render("show.json", %{todo_item: todo_item}) do
    %{data: render_one(todo_item, TodoItemView, "todo_item.json")}
  end

  def render("todo_item.json", %{todo_item: todo_item}) do
    %{id: todo_item.id,
      title: todo_item.title,
      description: todo_item.description,
      time_spent: todo_item.time_spent,
      completed: todo_item.completed,
      assigned_user: todo_item.assigned_user,
      user: todo_item.user}
  end
end
