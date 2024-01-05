import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() { 
    const key = 'savedTodoList'
    const savedState = JSON.parse(localStorage.getItem(key)) || [];
    const [todoList, setTodoList] = useState(savedState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { todoList: savedState } }) //Loading the data from the saved state
            }, 2000)
        })
        .then(result => {
            setTodoList(result.data.todoList)
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(todoList));
    }, [todoList]);

     const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    const removeTodo = (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodoList);
    }

    return (
        <>
            <header>
                <h1>To do list</h1>
                <AddTodoForm onAddTodo={addTodo} />
                {isLoading ?<p>loading...</p>: <TodoList todoList={todoList} onRemoveTodo={removeTodo} />} 
            </header>
        </>
   );
}

export default App;