defmodule TodosWeb.TodoItemControllerTest do
  use TodosWeb.ConnCase

  alias Todos.TodoItems
  alias Todos.TodoItems.TodoItem

  @create_attrs %{
    completed: true,
    description: "some description",
    time_spent: 42,
    title: "some title"
  }
  @update_attrs %{
    completed: false,
    description: "some updated description",
    time_spent: 43,
    title: "some updated title"
  }
  @invalid_attrs %{completed: nil, description: nil, time_spent: nil, title: nil}

  def fixture(:todo_item) do
    {:ok, todo_item} = TodoItems.create_todo_item(@create_attrs)
    todo_item
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all todos", %{conn: conn} do
      conn = get(conn, Routes.todo_item_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create todo_item" do
    test "renders todo_item when data is valid", %{conn: conn} do
      conn = post(conn, Routes.todo_item_path(conn, :create), todo_item: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.todo_item_path(conn, :show, id))

      assert %{
               "id" => id,
               "completed" => true,
               "description" => "some description",
               "time_spent" => 42,
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.todo_item_path(conn, :create), todo_item: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update todo_item" do
    setup [:create_todo_item]

    test "renders todo_item when data is valid", %{conn: conn, todo_item: %TodoItem{id: id} = todo_item} do
      conn = put(conn, Routes.todo_item_path(conn, :update, todo_item), todo_item: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.todo_item_path(conn, :show, id))

      assert %{
               "id" => id,
               "completed" => false,
               "description" => "some updated description",
               "time_spent" => 43,
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, todo_item: todo_item} do
      conn = put(conn, Routes.todo_item_path(conn, :update, todo_item), todo_item: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete todo_item" do
    setup [:create_todo_item]

    test "deletes chosen todo_item", %{conn: conn, todo_item: todo_item} do
      conn = delete(conn, Routes.todo_item_path(conn, :delete, todo_item))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.todo_item_path(conn, :show, todo_item))
      end
    end
  end

  defp create_todo_item(_) do
    todo_item = fixture(:todo_item)
    {:ok, todo_item: todo_item}
  end
end
