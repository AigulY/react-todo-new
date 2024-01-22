import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() { 
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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

            const todos = data.records ? data.records.map((record) => ({
                id: record.id,
                title: record.fields.title
            })) : [];
            
            setTodoList([...todos]);
            setIsLoading(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setIsLoading(false);
            setErrorMessage("Error fetching data: " + error.message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

     const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };
    const removeTodo = (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodoList);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <header>
                        <h1>Todo list</h1>
                        <AddTodoForm onAddTodo={addTodo} />
                        {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
                        {errorMessage && <p>{errorMessage}</p>}
                    </header>
                } />
                <Route path="/new" element={
                    <header>
                    <h1>New Todo List</h1>
                    </header>
                } />
            </Routes>
        </BrowserRouter>
    );
}
export default App;