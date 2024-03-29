import React, { useState } from 'react';
import Header from './Header';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notification from './components/AlertMessage';
import TodoUpdateForm from './components/TodoUpdateForm';
import Navbar from './components/Navbar';
import AddNewTodo from './components/AddNewTodo';
import './App.css';

function App() {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showErrorNotification = (message) => {
        setNotification({ message, type: 'error' });
    }

    const showSuccessNotification = (message) => {
        setNotification({ message, type: 'success' });
    }

    return (
        <BrowserRouter>
          <Header />
            <Navbar />
                {notification.message && <Notification message={notification.message} type={notification.type} />}
            <Routes>
                <Route path="/" element={
                <TodoContainer 
                    showErrorNotification={showErrorNotification} 
                    showSuccessNotification={showSuccessNotification} 
                />
                } />
                {/* <Route path="/new" element={
                    <header>
                        <h1>New Todo List</h1>
                    </header>
                } /> */}
                <Route path="/contact" element={
                    <header>
                        <h1>Contact information</h1>
                </header>
                } />
                <Route path="/update/:id" element={<TodoUpdateForm/>} />
                <Route path="/new" element={<AddNewTodo/>} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;