import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function HomePage({ addTodo, isLoading, todoList, removeTodo, toggleTodoCompletion, errorMessage }) {
    return (
        <header>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? <p>Loading...</p> : 
                <TodoList 
                    todoList={todoList} 
                    onRemoveTodo={removeTodo} 
                    onToggleTodoCompletion={toggleTodoCompletion}
                />}
            {errorMessage && <p>{errorMessage}</p>}
        </header>
    );
}

function NewTodo() {
    return (
        <header>
            <h1>New Todo List</h1>
        </header>
    );
}

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
                title: record.fields.title,
                isCompleted: false
            })) : [];
            
            setTodoList([...todos]);
            setIsLoading(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setIsLoading(false);
            setErrorMessage("Error fetching data: " + error.message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    }

    const addTodo = async (newTodoTitle) => {
        const newTodoData = {
            fields: {
                title: newTodoTitle,
            },
        };
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            },
            body: JSON.stringify(newTodoData),
        };
    
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const addedData = await response.json();
            setTodoList(prevTodoList => [
                ...prevTodoList,
                {
                    id: addedData.id,
                    title: addedData.fields.title,
                    isCompleted: false
                }
            ]);
        } catch (error) {
            console.error("Fetch error:", error);
            setIsLoading(false);
            setErrorMessage("Error fetching data: " + error.message);
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };
      
    const toggleTodoCompletion = (id) => {
        const updatedTodoList = todoList.map(todo => {
            if (todo.id === id) {
                return {...todo, isCompleted: !todo.isCompleted};
            }
            return todo
        })
        setTodoList(updatedTodoList);
    };

    const removeTodo = (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodoList);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={
                    <HomePage 
                    addTodo={addTodo} 
                    isLoading={isLoading} 
                    todoList={todoList} 
                    removeTodo={removeTodo} 
                    toggleTodoCompletion={toggleTodoCompletion}
                    errorMessage={errorMessage} 
                    />
                } />
                <Route path="/new" element={<NewTodo />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;