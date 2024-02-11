import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import AlertMessage from './AlertMessage'; 
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortField, setSortField] = useState('title');

    useEffect(() => {
        fetchData();
    }, [sortField, sortOrder]);

    const fetchData = async () => {
        const options = {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
            }};

            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();                                                                                                                                                                                                            

            const todos = data.records.map(record => ({
                id: record.id,
                title: record.fields.title,
                isCompleted: record.fields.isCompleted || false,
                dueDate: record.fields.dueDate || ''
            }));
            
            setTodoList([...todos]);
            setIsLoading(false);

        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage("Error fetching data. Please try again.");
            setIsLoading(false);
        }
    }

    const addTodo = async (newTodoTitle, newDueDate) => {
        const formattedDueDate = newDueDate ? newDueDate.toISOString().split('T')[0] : null;
        const newTodoData = {
            fields: {
                title: newTodoTitle,
                dueDate: formattedDueDate,
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
            setSuccessMessage("Todo added successfully!");
            fetchData();
        } catch (error) {
            console.error("Fetch error:", error);
            console.log(error.response);
            setErrorMessage("Error adding todo. Please try again.");
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
            setSuccessMessage("Todo updated successfully!");
            fetchData();
        } catch (error) {
            console.error("Error updating completion status:", error);
            console.log(error.response);
            setErrorMessage("Error updating todo. Please try again.");
        };
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
            setSuccessMessage("Todo updated successfully!");
            fetchData();
        } catch (error) {
            console.error("Error deleting todo item:", error);
            console.log(error.response);
            setErrorMessage("Error removing todo: " + error.message);
        }
    }
    
    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    
    const resetErrorMessage = () => setErrorMessage('');
    const resetSuccessMessage = () => setSuccessMessage('');

    return (
        <section>
            {errorMessage && (
                <AlertMessage type="error" message={errorMessage} resetMessage={resetErrorMessage} />
            )}
            {successMessage && (
                <AlertMessage type="success" message={successMessage} resetMessage={resetSuccessMessage} />
            )}
            <AddTodoForm onAddTodo={addTodo} />
            <div className="tasksHeader">
                <h2 className="tasksTitle">Tasks</h2>
                <div>
                    <select value={sortField} onChange={e => setSortField(e.target.value)} className="selectInput">
                        <option value="title">Title</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                    <button onClick= {toggleSortOrder} className="sortButton">
                        {sortOrder === 'asc' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
                    </button>
                </div>
            </div>
            {isLoading ? <p>Loading...</p> : (
                <TodoList 
                    todoList={todoList} 
                    onRemoveTodo={removeTodo} 
                    onToggleTodoCompletion={toggleTodoCompletion}
                />
            )}
        </section>
    );
};

export default TodoContainer;