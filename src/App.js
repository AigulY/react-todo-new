import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() { 
    const key = 'savedTodoList'
    //const initialState = []

    //const savedState = JSON.parse(localStorage.getItem(key)) || initialState;  
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: { todoList:[] }}) 
            }, 2000)
        })
        .then(result => {
            setTodoList(result.data.todoList)
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if(!isLoading) {
            localStorage.setItem(key, JSON.stringify(todoList));
        }
    }, [todoList, isLoading])

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