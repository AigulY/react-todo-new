import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
    const [todoList, setTodoList] = useState([]);

    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]); //usin the spread operator
    };

    return (
        <div>
            <header>
                <h1>To do list</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} />
            </header>
        </div>
   );
}

export default App;