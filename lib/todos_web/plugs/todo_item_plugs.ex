defmodule TodosWeb.TodoItemPlugs do
  import Plug.Conn

  alias Todos.TodoItems
  alias Todos.TodoItems.TodoItem

  @doc """
  Plug which ensures that the user of the given todo is the owner of that todo.

  If the user is not the owner, the server responds 403 with an error.
  """
  def is_owner(%Plug.Conn{:params => %{"id" => id}} = conn, _) do
    with %TodoItem{} = todo <- TodoItems.get_todo_item(id),
      true <- todo.user_id == conn.assigns[:user_id]
      do
        conn |> assign(:is_owner, true)
      else
        _ -> conn
    end
  end
  def is_owner(conn, _), do: conn

  @doc """
  Plug which ensures that the user of the given todo is assigned to that todo.

  If the user is not the owner, the server responds 403 with an error.
  """
  def is_assigned(%Plug.Conn{:params => %{"id" => id}} = conn, _) do
    with %TodoItem{} = todo <- TodoItems.get_todo_item(id), 
      true <- todo.assigned_user_id == conn.assigns[:assigned_user_id] 
      do
        conn |> assign(:is_assigned, true)
      else
        _ -> conn
    end
  end
  def is_assigned(conn, _), do: conn

  @doc """
  Checks to ensure a request with an "id" param has a corresponding member in
  the database. Otherwise sends a 404 response.
  """
  def todo_item_exists(%Plug.Conn{:params => %{"id" => id}} = conn, _) do
    if TodoItems.todo_item_exist_by_id(id) do
      conn
    else
      conn
      |> send_resp(404, Jason.encode!(%{"error" => "No todo item with that ID exists."}))
    end
  end
  def todo_item_exists(conn, _), do: conn
end