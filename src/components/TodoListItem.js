import React from "react";
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';

const TodoListItem = ({ item, onRemoveTodo, onToggleTodoCompletion }) => { 
    return (
        <li className={styles.ListItem}>
            <span className={styles.taskContent}>
                {item.title}
            </span>
            <div className={styles.actions}>
                <input 
                    type="checkbox" 
                    checked={item.isCompleted} 
                    onChange={() => onToggleTodoCompletion(item.id)} 
                />
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
        isCompleted: PropTypes.bool
    }).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodoCompletion: PropTypes.func.isRequired
};

export default TodoListItem;
