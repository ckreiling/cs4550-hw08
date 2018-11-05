defmodule TodosWeb.Plugs.PutUser do
  use TodosWeb, :controller

  alias Todos.Users
  alias Todos.Users.User

  def init(args), do: args

  def call(conn, _params) do
    with [auth_token] <- get_req_header(conn, "auth-token"),
         {:ok, user_id} <- Phoenix.Token.verify(TodosWeb.Endpoint, "user_id", auth_token),
         %User{} = user <- Users.get_user(user_id) 
    do
      conn |> assign(:current_user, user)
    else
      _ -> conn |> assign(:current_user, nil)
    end
  end
end