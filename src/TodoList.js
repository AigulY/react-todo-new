import React from 'react';
import TodoListItem from './TodoListItem';

const todoListData = [
    {
        id: 1,
        title: 'Complete assignment',
    },
    {
        id: 2,
        title: 'Git push assignment',
    },
    {
        id: 3,
        title: 'Merge assignment',
    },
];

const TodoList = () => {
    return (
        <ul>
            {todoListData.map(function (item) {
                return <TodoListItem key={item.id} item={item} />;
            })}
        </ul>
    );
}

export default TodoList;
