defmodule TodosWeb.TodoItemController do
  use TodosWeb, :controller

  alias Todos.TodoItems
  alias Todos.TodoItems.TodoItem

  # All endpoints here need to be authenticated
  plug TodosWeb.Plugs.Authenticate

  action_fallback TodosWeb.FallbackController

  def index(conn, _params) do
    todos = TodoItems.list_todos()
    render(conn, "index.json", todos: todos)
  end

  def create(conn, %{"todo_item" => todo_item_params}) do
    todo_item_params = Map.put(todo_item_params, "user_id", conn.assigns[:user_id])
    with {:ok, %TodoItem{} = todo_item} <- TodoItems.create_todo_item(todo_item_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.todo_item_path(conn, :show, todo_item))
      |> render("show.json", todo_item: todo_item)
    end
  end

  def my_todos(conn, _params) do
    user_id = conn.assigns[:user_id]
    todos = TodoItems.get_todos_for_user(user_id)
    render(conn, "index.json", %{todos: todos})
  end

  def show(conn, %{"id" => id}) do
    todo_item = TodoItems.get_todo_item!(id)
    render(conn, "show.json", todo_item: todo_item)
  end

  def update(conn, %{"id" => id, "todo_item" => todo_item_params}) do
    todo_item = TodoItems.get_todo_item!(id)

    with {:ok, %TodoItem{} = todo_item} <- TodoItems.update_todo_item(todo_item, todo_item_params) do
      render(conn, "show.json", todo_item: todo_item)
    end
  end

  def delete(conn, %{"id" => id}) do
    todo_item = TodoItems.get_todo_item!(id)

    with {:ok, %TodoItem{}} <- TodoItems.delete_todo_item(todo_item) do
      send_resp(conn, :no_content, "")
    end
  end
end
