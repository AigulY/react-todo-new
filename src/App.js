import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState(key, initialState) {
    const savedState = JSON.parse(localStorage.getItem(key)) || initialState;
    const [state, setState] = useState(savedState);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
}

function App() {                                        
    const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);

    const addTodo = (newTodo) => {
        setTodoList([...todoList, newTodo]);
    };

    return (
        <>
            <header>
                <h1>To do list</h1>
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} />
            </header>
        </>
   );
}

export default App;