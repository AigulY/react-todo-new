import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() { 
    const key = 'savedTodoList'
    const savedState = JSON.parse(localStorage.getItem(key)) || [];
    const [todoList, setTodoList] = useState(savedState);
    const [isLoading, setIsLoading] = useState(true);
    const [completionMessage, setCompletionMessage] = useState('');

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            }};

            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
            const data = await response.json();                                                                                                                                                                                                            

            const todos = data.records.map((record) => ({
                id: record.id,
                title: record.fields.title
            }))
            
            setTodoList(todos)
            setIsLoading(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setIsLoading(false);
            setCompletionMessage("Error fetching data: " + error.message);
            setTimeout(() => setCompletionMessage(""), 3000);
        }
    };


    useEffect(() => {
        fetchData();
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
                {completionMessage && <p>{completionMessage}</p>}
            </header>
        </>
   );
}
export default App;