import { useState, useEffect } from 'react';
import './App.css';

import todosService from './services/todos'

import Task from './components/Task'


const App = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  
  // After first render - fetch data from MongoDB database
  useEffect(() => {
    todosService.getAll().then(returnedTodos => {
      setTodos(returnedTodos)
    })
  }, [])


  // ~~~ EVENT HANDLERS ~~~
  
  // Form Submission
  const handleForm = (event) => {
    event.preventDefault()

    // create new todo
    const todo = {
      task: newTodo,
      done: false
    }

    // add it to the database(and state variable)
    todosService
      .create(todo)
      .then(returnedTodo => {
        setTodos(todos.concat(returnedTodo))
      })
      .catch(err=> console.log('error: ', err.message))

    // clean form input
    setNewTodo('')
  }

  // Marking button
  const handleMarkingButton = (id) => {

    // find todo, which should be updated (based on given id)
    const todo = todos.find(task => task.id === id)
    
    // update todo
    const newTodo = {...todo, done: !todo.done}

    // update todo in database
    todosService
      .update(id, newTodo)
      .then(updatedTodo => {
        // and in state variable 'todos'
        setTodos(todos.map(todo=> todo.id !== id ? todo : updatedTodo))
      })
  }

  // Delete button
  const handleDeleteBtn = (id) => {
    // remove todo from database and from state variable 'todos'
    todosService
      .remove(id).then(response => {
        setTodos(todos.filter(todo => todo.id !== id))
      })
  }

  return (
    <div>
      <h1>TODO:</h1>
      <table>
        <tbody>
          {todos.map(task => <Task key={task.id} task={task} handleMarkingButton={handleMarkingButton}  handleDeleteBtn={handleDeleteBtn}/>)}
        </tbody>
      </table>
      <form onSubmit={handleForm}>
        <h2>Add todo</h2>
        todo: <input value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default App;