import Todo from "../Todo/Todo"
import {useState, useEffect} from 'react'

export default function TodoList({
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
    editTodoText
  }) {
    const [{todos, setTodos}] = useState([])
    const [foundTodos, setFoundTodos] = useState(null)
    const [newTodo, setNewTodo] = useState({
      title: "",
      completed: false
    })

  // index
  const getTodo = async () => {
    try {
      const response = await fetch('/api/todolist')
      const data = await response.json()
      setTodos(data)
    } catch (error) {
    console.error(error)
    }
  }
    //delete
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`./api/todolist/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setFoundTodos(data)
    } catch (error) {
      console.error(error)
    }
  }
  // update 
  const editTodoText = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/todolist/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...updatedData})
      })
      const data = await response.json()
      setFoundTodos(data)
    } catch (error) {
      console.error(error)
    }
  }
  // create 
  const addTodo = async () => {
    try {
      const response = await fetch(`api/todolist`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({...newTodo})
      })
      const data = await response.json()
      setFoundTodos(data)
      setNewTodo({
        title: '',
        completed: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTodo()
  }, [foundTodos]) 


    return (
      <>
        <h2>New Item</h2>
        <input
          type="text"
          onKeyDown={(e) => {
            e.key === "Enter" && addTodo(e)
          }}
        />
        {todos.length ? (
          <>
            <h1>To Do Items:</h1>
            <ul className="todolist">
              {todos
                .filter((i) => !i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todos={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      editTodoText={editTodoText}
                    />
                  )
                })}
            </ul>
            <h1>Completed Items </h1>
            <ul className="todolist">
              {todos
                .filter((i) => i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todos={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      editTodoText={editTodoText}
                    />
                  )
                })}
            </ul>
          </>
        ) : (
          <h1>My To Do List is Empty</h1>
        )}
      </>
    )
  }