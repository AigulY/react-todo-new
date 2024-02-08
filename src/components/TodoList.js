import React from 'react';
import PropTypes from 'prop-types';
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

TodoList.propTypes = {
    todoList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool
    })).isRequired,
    onRemoveTodo: PropTypes.func.isRequired,
    onToggleTodoCompletion: PropTypes.func.isRequired
};

export default TodoList;

