defmodule TodosWeb.Plugs.PutUserId do
  use TodosWeb, :controller

  def init(args), do: args

  def call(conn, _params) do
    with [auth_token] <- get_req_header(conn, "auth-token"),
         {:ok, user_id} <- Phoenix.Token.verify(TodosWeb.Endpoint, "user_id", auth_token)
    do
      conn |> assign(:user_id, user_id)
    else
      _ -> conn |> assign(:user_id, nil)
    end
  end
end