import React from 'react';

function TodoList() {
    const todoListData = [
        {
            id: 1,
            title: 'Complete assignment',
            assignment_number: '_1_2'
        },
        {
            id: 2,
            title: 'Git push assignment',
            assignment_number: '_1_2'
        },
        {
            id: 3,
            title: 'Merge assignment',
            assignment_number: '_1_2'
        },
    ];

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todoListData.map(function (item) {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <span>{item.assignment_number}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TodoList;
