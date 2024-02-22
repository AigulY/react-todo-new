import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AlertMessage from './AlertMessage';
import styles from './TodoUpdateForm.module.css';

const TodoUpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ title: '', dueDate: null, isCompleted: false });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            };
            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`;
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                if (data && data.fields) {
                    setTodo({
                        title: data.fields.title,
                        dueDate: data.fields.dueDate ? new Date(data.fields.dueDate) : null,
                        isCompleted: data.fields.isCompleted,
                    });
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setErrorMessage("Error fetching todo item.");
            }
        };

        fetchData();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!todo.title.trim() || !todo.dueDate) {
          setErrorMessage("Title and due date cannot be empty.");
          return;
        }
        const formattedDueDate = todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : null;
        const updateData = {
            fields: {
                title: todo.title,
                dueDate: formattedDueDate,
                isCompleted: todo.isCompleted,
            },
        };

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
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
            navigate('/');
        } catch (error) {
            console.error("Error updating todo:", error);
            setErrorMessage("Error updating todo. Please try again.");
        }
    };

    return (
        <section className={styles.updateSection}>
            {errorMessage && <AlertMessage type="error" message={errorMessage} resetMessage={() => setErrorMessage('')} />}
            <form onSubmit={handleSave} className={styles.updateTodoForm}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        className={styles.textInput} 
                        value={todo.title}
                        onChange={(e) => setTodo({...todo, title: e.target.value})}
                        placeholder="Todo Title"
                    />
                </div>
                <div className={styles.formGroup}>
                    <DatePicker
                        className={styles.datePicker} 
                        selected={todo.dueDate}
                        onChange={(date) => setTodo({...todo, dueDate: date})}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select a due date"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.statusLabel}>
                        Completed:
                        <input
                            type="checkbox"
                            className={styles.checkbox} 
                            checked={todo.isCompleted}
                            onChange={(e) => setTodo({...todo, isCompleted: e.target.checked})}
                        />
                    </label>
                </div>
                <div className={styles.formActions}>
                    <button type="submit" className={styles.saveButton}>Save</button>
                    <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>Back</button>
                </div>
            </form>
        </section>
    );
};
  
export default TodoUpdateForm;
