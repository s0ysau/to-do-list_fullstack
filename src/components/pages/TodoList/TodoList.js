import Todo from '../Todo/Todo'
import { useState, useEffect } from 'react'

export default function TodoList (
  // todos,
  // addTodo,
  // completeTodo,
  // deleteTodo,
  // updatedTodo
  props
) {
  const [todos, setTodos] = useState([])
  const [foundTodos, setFoundTodos] = useState(null)
  const [newTodo, setNewTodo] = useState({
    title: '',
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

  // update
  const updatedTodo = async (_id, updatedData) => {
    try {
      const response = await fetch(`/api/todolist/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData })
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
      const response = await fetch('/api/todolist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newTodo })
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
  // delete
  const deleteTodo = async (_id) => {
    try {
      const response = await fetch(`/api/todolist/${_id}`, {
        method: 'DELETE',
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
    const todoSpead = [...todos]
    const indexOfTodo = todoSpead.findIndex((idx) => idx._id === _id)
    todoSpead[indexOfTodo].completed = !todoSpead[indexOfTodo].completed
    setTodos([...todoSpead])
  }

  const handleOnKeyDown = (evt) => {
    evt.preventDefault()
    createTodo()
  }

  const handleChange = (evt) => {
    setNewTodo({ ...newTodo, [evt.target.name]: evt.target.value, completed: false })
  }

  useEffect(() => {
    getTodo()
  }, [foundTodos])

  return (
    <>
      <h5 className='new-item'>New Item</h5>
      <input
        type='text'
        name='title'
        onChange={handleChange}
        value={newTodo.title}
        onKeyDown={(evt) => {
          evt.key === 'Enter' && handleOnKeyDown(evt)
        }}
        className="input-field"
      />
      {todos.length
        ? (
          <>
            <h4 className='todolist-items'>To Do Items:</h4>
            <ul className='todolist'>
              {todos
                .filter((i) => !i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      updatedTodo={updatedTodo}
                    />
                  )
                })}
            </ul>
            <h1>Completed</h1>
            <ul className='todolist'>
              {todos
                .filter((i) => i.completed)
                .map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                      updatedTodo={updatedTodo}
                    />
                  )
                })}
            </ul>
          </>
          )
        : (
          <h1>No Todos Added Yet</h1>
          )}
    </>
  )
}
