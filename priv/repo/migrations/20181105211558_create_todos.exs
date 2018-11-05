defmodule Todos.Repo.Migrations.CreateTodos do
  use Ecto.Migration

  def change do
    create table(:todos) do
      add :title, :string, null: false
      add :description, :text
      add :time_spent, :integer, default: 0
      add :completed, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :assigned_user_id, references(:users, on_delete: :nilify_all)

      timestamps()
    end

    create index(:todos, [:user_id])
    create index(:todos, [:assigned_user_id])
  end
end
