import Todo from "../Todo/Todo"
import {useState, useEffect} from 'react'

export default function TodoList(
    // todos,
    // addTodo,
    // completeTodo,
    // deleteTodo,
    // editTodoText
    props
  ) 
  {
  const [todos, setTodos] = useState([])
  const [foundTodos, setFoundTodos] = useState(null)
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false
  })
    // index
  const getTodo = async () => {
    try {
      const response = await fetch(`/api/todolist`)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
    console.error(error)
    }
  }

  // update 
  const editTodoText = async (_id, updatedData) => {
    try {
      const response = await fetch(`/api/todolist/${_id}`, {
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
    const createTodo = async () => {
      try {
        const response = await fetch(`/api/todolist`, {
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
      //delete
  const deleteTodo = async (_id) => {
    try {
      const response = await fetch(`/api/todolist/${_id}`, {
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

    const completeTodo = (_id, e) => {
    const todosCopy = [...todos]
    const indexOfTodo = todosCopy.findIndex((i) => i._id === _id )
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    setTodos([...todosCopy])
}

const handleOnKeyDown = (evt) => {
  evt.preventDefault()
  createTodo()
}

const handleChange = (evt) => {
  setNewTodo({...newTodo,  [evt.target.name]:evt.target.value, completed: false})
}

    useEffect(() => {
      getTodo()
    }, [foundTodos])

    return (
      <>
        <h1>New Item</h1>
        <input
          type="text"
          name={"title"}
          onChange={handleChange}
          value={newTodo.title}
          onKeyDown={(evt) => {
            evt.key === "Enter" && handleOnKeyDown(evt)
          }}
        />
        {todos.length ? (
          <>
            <h1>To Do Items</h1>
            <ul className="todolist">
              {todos
                .filter((i) => !i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
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
              {todos
                .filter((i) => i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
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
          <h1>No Todos Added Yet</h1>
        )}
      </>
    )
  }