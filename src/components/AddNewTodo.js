import React from 'react';
import AddTodoForm from './AddTodoForm';
import { useNavigate } from 'react-router-dom';
import './TodoUpdateForm.module.css'; 

const AddNewTodo = ({ onAddTodo }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <section className="updateSection">
      <h2>Add New Todo</h2>
      <AddTodoForm onAddTodo={(title, dueDate) => {
        onAddTodo(title, dueDate); 
        navigate('/');
      }} />
      <button className="backButton" onClick={handleBack} style={{marginTop: '20px'}}>
        Back
      </button>
    </section>
  );
};

export default AddNewTodo;