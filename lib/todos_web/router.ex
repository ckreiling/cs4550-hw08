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

    resources "/users", UserController, only: [:create]
    resources "/session", SessionController, only: [:create]
    resources "/todos", TodoItemController, except: [:new, :edit]
  end

  scope "/", TodosWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
