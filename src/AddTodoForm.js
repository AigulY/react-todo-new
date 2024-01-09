import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel'; 

const AddTodoForm = ({ onAddTodo }) => { 
    const [todoTitle, setTodoTitle] = useState(''); 

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        const newTodo = {
            title: todoTitle,
            //id: Date.now(),
        };
        onAddTodo(newTodo); 
        setTodoTitle('');
    };

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                type="text"
                id="todoTitle"
                name="title"
                value={todoTitle}
                onChange={handleTitleChange}
            >
                Title
            </InputWithLabel>
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
