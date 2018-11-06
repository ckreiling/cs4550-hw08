defmodule TodosWeb.TodoItemPlugs do
  import Plug.Conn

  alias Todos.TodoItems

  @doc """
  Plug which ensures that the user of the given todo is the owner of that todo.

  If the user is not the owner, the server responds 403 with an error.
  """
  def is_owner(conn, %{"id" => id}) do
    with todo <- TodoItems.get_todo_item!(id),
      true <- todo.user_id == conn.assigns[:user_id] do
        conn |> assign(:is_owner, true)
      end
    conn
  end
  def is_owner(conn, _), do: conn

  @doc """
  Plug which ensures that the user of the given todo is assigned to that todo.

  If the user is not the owner, the server responds 403 with an error.
  """
  def is_assigned(conn, %{"id" => id}) do
    with todo <- TodoItems.get_todo_item!(id),
      true <- todo.assigned_user_id == conn.assigns[:user_id] do
        conn |> assign(:is_assigned, true)
      end
    conn
  end
  def is_assigned(conn, _), do: conn
end