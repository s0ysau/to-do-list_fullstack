import Todo from "../Todo/Todo"

export default function TodoList({
    todo,
    addTodo,
    completeTodo,
    deleteTodo,
    editTodoText
  }) {
    return (
      <>
        <h1>Create Todo</h1>
        <input
          type="text"
          onKeyDown={(e) => {
            e.key === "Enter" && addTodo(e)
          }}
        />
        {todo.length ? (
          <>
            <h1>Todo Items</h1>
            <ul className="todolist">
              {todo
                .filter((i) => !i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      editTodoText={editTodoText}
                    />
                  )
                })}
            </ul>
            <h1>Completed Items </h1>
            <ul className="todolist">
              {todo
                .filter((i) => i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      editTodoText={editTodoText}
                    />
                  )
                })}
            </ul>
          </>
        ) : (
          <h1>No Todo Added Yet</h1>
        )}
      </>
    )
  }