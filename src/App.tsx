
import { useTodos } from "./hooks/useTodos";
import Addtodo from './components/Addtodo';
import TodoList from './components/TodoList'
import { useState } from "react";

function App() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });


  return (
    <>
      <h1>Todo App</h1>
      <Addtodo dispatch={dispatch} />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <TodoList todos={filteredTodos} dispatch={dispatch} />
    </>
  )
}

export default App;
