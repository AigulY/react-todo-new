import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => { // Destructuring the props
    const [todoTitle, setTodoTitle] = useState(''); 

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            title: todoTitle,
            id: Date.now(), // generate unique identifier
        };
        onAddTodo(newTodo); 
        setTodoTitle(''); //logic to reset the todoTitle state to an empty String
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input 
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
