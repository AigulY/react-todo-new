import React from "react";

const TodoListItem = ({ item }) => { // Destructuring the props
    return <li> {item.title} </li>;
};

export default TodoListItem;
