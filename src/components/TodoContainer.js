import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import PropTypes from 'prop-types';

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const displayErrorMessage = (message) => {
        setErrorMessage(message);
        const timeoutId = setTimeout(() => setErrorMessage(''), 3000);
        return () => clearTimeout(timeoutId);
    };

    const displaySuccessMessage = (message) => {
        setSuccessMessage(message);
        const timeoutId = setTimeout(() => setSuccessMessage(''), 3000);
        return () => clearTimeout(timeoutId);
    }

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            }};

            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?sort[0][field]=title&sort[0][direction]=asc`;
            // const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view`;
            // const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();                                                                                                                                                                                                            

            const todos = data.records ? data.records.map((record) => ({
                id: record.id,
                title: record.fields.title,
                isCompleted: record.fields.isCompleted || false
            })) : [];
            
            setTodoList([...todos]);
            setIsLoading(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setIsLoading(false);
            displayErrorMessage("Error fetching data. please try again.")
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
            displaySuccessMessage("Todo added successfully!");
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
            displayErrorMessage("Error adding todo. Please try again.");
        }
    };
      
    const toggleTodoCompletion = async (id) => {
        const todo = todoList.find(todo => todo.id === id);
        if (!todo) return;
    
        const newIsCompletedStatus = !todo.isCompleted;
    
        const updatedTodoList = todoList.map(todo =>
            todo.id === id ? { ...todo, isCompleted: newIsCompletedStatus } : todo
        );
        setTodoList(updatedTodoList)
    
        const updateData = {
            fields: {
                isCompleted: newIsCompletedStatus,
            },
        };
    
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            },
            body: JSON.stringify(updateData),
        };
    
        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            displaySuccessMessage("Todo updated successfully!");
        } catch (error) {
            console.error("Error updating completion status:", error);

            setTodoList(todoList.map(todo =>
                todo.id === id ? { ...todo, isCompleted: !newIsCompletedStatus } : todo
            ));
        }
    };
    const removeTodo = async (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodoList);
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            },
        };

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            displaySuccessMessage("Todo updated successfully!");
        } catch (error) {
            console.error("Error deleting todo item:", error);
            setTodoList(todoList);
            displayErrorMessage("Error updating todo. Please try again.");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? <p>Loading...</p> : 
                <TodoList 
                    todoList={todoList} 
                    onRemoveTodo={removeTodo} 
                    onToggleTodoCompletion={toggleTodoCompletion}
                />}
            {errorMessage && <p>{errorMessage}</p>}
        </section>
    );
}

export default TodoContainer;