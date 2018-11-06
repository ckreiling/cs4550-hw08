defmodule Todos.TodoItems.TodoItem do
  use Ecto.Schema
  import Ecto.Changeset


  schema "todos" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time_spent, :integer, default: 0
    field :title, :string

    belongs_to :user, Todos.Users.User
    belongs_to :assigned_user, Todos.Users.User, foreign_key: :assigned_user_id

    timestamps()
  end

  @doc false
  def changeset(todo_item, attrs) do
    todo_item
    |> cast(attrs, [:title, :description, :time_spent, :user_id, :completed, :assigned_user_id])
    |> validate_required([:title, :description, :time_spent, :completed, :user_id])
  end
end
