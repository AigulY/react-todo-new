import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputWithLabel from './InputWithLabel';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddTodoForm = ({ onAddTodo }) => { 
    const [todoTitle, setTodoTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState('');

    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (!todoTitle.trim()) { 
            setError("Please enter a title for your Todo.");
            return;
        }
        if (!dueDate) {
            setError("Please select a due date.");
            return;
        }
        onAddTodo(todoTitle, dueDate); 
        setTodoTitle('');
        setDueDate(null);
        setError('');
    };

    return (
        <form onSubmit={handleAddTodo} className="addTodoForm">
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <div className="formControls">
                <InputWithLabel
                    id="todoTitle"
                    name="title"
                    value={todoTitle}
                    onChange={handleTitleChange}
                    placeholder="Please add Todo Task"
                />
                <DatePicker
                    selected={dueDate}
                    onChange={handleDueDateChange}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a due date"
                    minDate={new Date()}
                    className="datePicker"
                />
                <button type="submit">Add Task</button>
            </div>
        </form>
    );
};

AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
  };

export default AddTodoForm;
