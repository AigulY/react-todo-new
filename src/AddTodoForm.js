import React from 'react';

const AddTodoForm = (props) => {
    const handleAddTodo = (event) => {
        event.preventDefault(); //prevent form from refreshing
        const todoTitle = event.target.title.value;
        props.onAddTodo(todoTitle);
        event.target.reset();   //reset the form after submission
        console.log(todoTitle);
    };

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" />
            <button>Add</button>
        </form>
    );
};

export default AddTodoForm;
