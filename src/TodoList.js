import React from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo, onToggleTodoCompletion }) => { 
    return (
        <>
            <div className={styles.header}>
                <span>Tasks</span>
            </div>
            <ul>
                {todoList.map(item => (
                    <TodoListItem 
                        key={item.id} 
                        item={item} 
                        onRemoveTodo={onRemoveTodo}
                        onToggleTodoCompletion={onToggleTodoCompletion} />
                ))}
            </ul>
        </>
    );
}

export default TodoList;

