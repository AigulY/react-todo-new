import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoContainer from './components/TodoContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<TodoContainer />} />
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