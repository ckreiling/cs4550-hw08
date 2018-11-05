defmodule TodosWeb.Router do
  use TodosWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug TodosWeb.Plugs.PutUserId
  end

  # Other scopes may use custom stacks.
  # Putting this above the browser scope prioritizes these endpoints
  # over the browser's catch-all endpoint.
  scope "/api/v1", TodosWeb do
    pipe_through :api

    # Unauthenticated
    resources "/users", UserController, only: [:create]
    resources "/session", SessionController, only: [:create]

    # Authenticated; these routes rely on a token passed in the header of the request
    resources "/todos", TodoItemController, only: [:create, :index]
    get "/assigned", TodoItemController, :my_assigned_todos
  end

  scope "/", TodosWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
