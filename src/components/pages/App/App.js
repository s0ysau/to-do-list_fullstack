import {useState, useEffect} from 'react'
import TodoList from '../TodoList/TodoList'

export default function App () {
  const [todos, setTodos] = useState([])
  const [state, setState] = useState(null)

  const fetchState = async () => {
    try {
      const response = await fetch('/api/todolist')
      const data = await response.json()
      setState(data)
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    fetchState()
  }, [])

return (
  <main className="App">
    <h1 className="my-list">My To Do List</h1>
    <TodoList 
      // addTodo={addTodo}
      // completeTodo={completeTodo}
      // editTodoText={editTodoText}
      // deleteTodo={deleteTodo}
      // todos={todos}
    />
  </main>
)
}