import { useState } from "react"

export default function Todo({ 
  todos, 
  completeTodo, 
  editTodoText, 
  deleteTodo 
}) {
  const [showInput, setShowInput] = useState(false)
  return (
    <li>
      <div className="left">
        <h2 onClick={(e) => {setShowInput(!showInput)}}>
          {todos.title}
        </h2>
        <input
          type="text"
          style={{ display: showInput ? "block" : "none" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editTodoText(todos.id, e)
              setShowInput(false)
            }
          }}
        />
      </div>
      <label className="middle">
        Complete
        <input
          type="checkbox"
          checked={todos.completed}
          onChange={(e) => {
            completeTodo(todos.id, e)
          }}
        />
      </label>
      <button
        checked={todos.completed}
        onClick={(e) => {
          deleteTodo(todos.id)
        }}
      >
        Delete Todo
      </button>
    </li>
  )
}