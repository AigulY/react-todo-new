
import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    const [newTodo, setNewTodo] = React.useState("");

    return (
        <div>
            <header>
                <h1>To do list</h1>
                <AddTodoForm onAddTodo={setNewTodo} />
                <p>{newTodo}</p>
                <TodoList />
            </header>
        </div>
   );
}

export default App;