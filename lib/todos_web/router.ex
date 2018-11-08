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
  end

  pipeline :get_user do
    plug TodosWeb.Plugs.PutUserId
  end

  pipeline :authenticate do
    # must be AFTER the :get_user pipeline
    plug TodosWeb.Plugs.Authenticate
  end

  scope "/api/v1", TodosWeb do
    pipe_through [:api, :get_user]

    resources "/users", UserController, only: [:create]
    resources "/session", SessionController, only: [:create]
  end

  # Authenticated; these routes rely on a token passed in the header of the request
  scope "/api/v1", TodosWeb do
    pipe_through [:api, :get_user, :authenticate]

    resources "/todos", TodoItemController, only: [:create, :index]
    get "/me", UserController, :current_user
    post "/toggle-todo", TodoItemController, :toggle_completed
    get "/assigned", TodoItemController, :my_assigned_todos   
  end

  scope "/", TodosWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
