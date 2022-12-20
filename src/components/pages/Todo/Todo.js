import { useState } from "react"

export default function Todo({ 
  todo, 
  completeTodo, 
  deleteTodo 
}) 
{
  
  const [showInput, setShowInput] = useState(false)
  return (
    <li>
      <div className="left">
        <h2
          onClick={(e) => {
            setShowInput(!showInput)
          }}
        >
          {todo.title}
        </h2>
        <input
          style={{ display: showInput ? "block" : "none" }}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowInput(!showInput)
            }
          }}
        />
      </div>
      <label className="middle">
        Complete
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            completeTodo(todo._id)
          }}
        />
      </label>
      <button
        checked={todo.completed}
        onClick={() => {
          deleteTodo(todo._id)
        }}
      >
        Delete Todo
      </button>
    </li>
  )
}