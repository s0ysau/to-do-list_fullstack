import {useState, useEffect} from 'react'
import TodoList from '../TodoList/TodoList'

export default function App () {
  const [todos, setTodos] = useState([])
  const [state, setState] = useState(null)

  const fetchState = async () => {
    try {
      const response = await fetch('api/todolist')
      const data = await response.json()
      setState(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])

  const addTodo = (evt) => {
    const newTodo = { text: evt.target.value, id: Date.now(), completed: false}
    setTodos([newTodo, ...todos])
    evt.target.value = ""
  }

  const completeTodo = (id, e) => {
    const todosCopy = [...todos]
    const indexOfTodo = todosCopy.findIndex((i) => i.id === id )
    todosCopy[indexOfTodo].completed = !todosCopy[indexOfTodo].completed
    setTodos(todosCopy)
}

const editTodoText = (id, e) => {
  const todosCopy = [...todos]
  const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
  todosCopy[indexOfTodo].text = e.target.value
  setTodos([...todosCopy])
  e.target.value = ""
}

const deleteTodo = (id) => {
  const todosCopy = [...todos]
  const indexOfTodo = todosCopy.findIndex((i) => i.id === id)
  todosCopy.splice(indexOfTodo, 1)
  setTodos([...todosCopy])
};

return (
  <main className="App">
    <h1>My To Do List</h1>
    <TodoList
      addTodo={addTodo}
      completeTodo={completeTodo}
      editTodoText={editTodoText}
      deleteTodo={deleteTodo}
      todos={todos}
    />
  </main>
)
}