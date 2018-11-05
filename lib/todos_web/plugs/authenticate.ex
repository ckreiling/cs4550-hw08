defmodule TodosWeb.Plugs.Authenticate do
  use TodosWeb, :controller

  def init(args), do: args

  def call(conn, _params) do
    case conn.assigns[:current_user] do
      nil -> 
        conn 
        |> send_resp(403, Jason.encode!(%{"error" => "You must be authenticated to access #{conn.request_path}"}))
        |> halt()
      _ -> 
        conn
    end
  end
end