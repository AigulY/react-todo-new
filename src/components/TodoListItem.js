import React from "react";
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const TodoListItem = ({ item, onRemoveTodo, onToggleTodoCompletion }) => { 
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate(`/update/${item.id}`);
    };
    return (
        <li className={styles.ListItem}>
            <span className={styles.taskContent}>
                {item.title}
            </span>
            <span className={styles.dueDate}>
                    Due: {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'Not defined'}
            </span>
            <div className={styles.actions}>
                <input 
                    type="checkbox" 
                    checked={item.isCompleted} 
                    onChange={() => onToggleTodoCompletion(item.id)} 
                />
                <button type="editButton"onClick={handleUpdateClick} className={styles.updateButton}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button type="button" onClick={() => onRemoveTodo(item.id)} className={styles.removeButton}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
};

TodoListItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool,
        dueDate: PropTypes.string
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodoCompletion: PropTypes.func.isRequired
};

export default TodoListItem;
