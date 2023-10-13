import React from 'react';
import TodoList from './TodoList'; // Importing the TodoList component
import AddTodoForm from './AddTodoForm'; // Importing the AddTodoForm component

function App() {
  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm /> {/* Using the AddTodoForm component*/}
      <TodoList /> {/* Using the TodoList component*/}
    </div>
  );
}

export default App;
