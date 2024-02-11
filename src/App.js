import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notification from './components/AlertMessage';
import './App.css';

function App() {
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showErrorNotification = (message) => {
        setNotification({ message, type: 'error' })
    }

    const showSuccessNotification = (message) => {
        setNotification({ message, type: 'success' })
    }

    return (
        <BrowserRouter>
          <Header />
          {notification.message && <Notification message={notification.message} type={notification.type} />}
          <Routes>
            <Route path="/" element={
              <TodoContainer 
                showErrorNotification={showErrorNotification} 
                showSuccessNotification={showSuccessNotification} 
              />
            } />
            <Route path="/new" element={
                    <header>
                        <h1>New Todo List</h1>
                    </header>
                } />
            </Routes>
        </BrowserRouter>
      );
    }
export default App;