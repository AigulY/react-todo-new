import React from "react";
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

export default TodoListItem;
