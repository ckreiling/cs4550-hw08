defmodule TodosWeb.TodoItemController do
  use TodosWeb, :controller

  import TodosWeb.TodoItemPlugs

  alias Todos.TodoItems
  alias Todos.TodoItems.TodoItem

  # Checks to make sure any request params with an "id" key has a corresponding
  # todo item in the DB. Otherwise replies 404.
  plug :todo_item_exists
  # Ensure that the user owns the given todo on delete or update
  plug :is_owner when action in [:delete, :toggle_completed]
  plug :is_assigned when action in [:toggle_completed]

  action_fallback TodosWeb.FallbackController

  def my_assigned_todos(conn, _params) do
    user_id = conn.assigns[:user_id]
    todos = TodoItems.get_assigned_todos_for_user(user_id)
    render(conn, "index.json", %{todos: todos})
  end

  def index(conn, _params) do
    user_id = conn.assigns[:user_id]
    todos = TodoItems.get_todos_for_user(user_id)
    render(conn, "index.json", %{todos: todos})
  end

  def toggle_completed(conn, %{"id" => id}) do
    with true <- conn.assigns[:is_owner] || conn.assigns[:is_assigned],
        {:ok, %TodoItem{} = todo_item} <- TodoItems.toggle_todo_item(id) do
      render(conn, "show.json", todo_item: todo_item)
    else
      _ -> 
        conn
        |> send_resp(403, Jason.encode!(%{"error" => "You must be an owner or assigned the todo with ID #{id} to toggle its completeness."}))
    end
  end

  # Auto-generated

  def create(conn, %{"todo_item" => todo_item_params}) do
    todo_item_params = Map.put(todo_item_params, "user_id", conn.assigns[:user_id])
    with {:ok, %TodoItem{} = todo_item} <- TodoItems.create_todo_item(todo_item_params) do
      conn
      |> put_status(:created)
      |> render("show.json", todo_item: todo_item)
    end
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
