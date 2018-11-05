defmodule Todos.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :password_hash, :string

    field :password, :string, virtual: true

    has_many :todos, Todos.TodoItems.TodoItem
    has_many :assigned_todos, Todos.TodoItems.TodoItem, foreign_key: :assigned_user_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password])
    |> unique_constraint(:email)
    |> validate_password(:password)
    |> put_pass_hash()
    |> validate_required([:email, :password_hash])
    |> validate_format(:email, ~r/^.+@.+\..+$/)
  end

  # Password validation
  # From Comeonin docs
  def validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      case valid_password?(password) do
        {:ok, _} -> []
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  def put_pass_hash(%Ecto.Changeset{
    valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Argon2.add_hash(password))
  end
  def put_pass_hash(changeset), do: changeset

  def valid_password?(password) when byte_size(password) > 7 do
    {:ok, password}
  end
  def valid_password?(_), do: {:error, "The password is too short"}

end
