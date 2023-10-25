import React from 'react';

const AddTodoForm = ({ onAddTodo }) => {
    const handleAddTodo = (event) => {
        event.preventDefault(); //prevent form from refreshing
        const todoTitle = event.target.title.value;
        onAddTodo(todoTitle);
        event.target.reset();   //reset the form after submission
        console.log(todoTitle);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input type="text" id="todoTitle" name="title" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddTodoForm;
