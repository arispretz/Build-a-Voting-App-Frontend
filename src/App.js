// src/App.js
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import PollForm from './components/PollForm';
import PollList from './components/PollList';
import Login from './components/Login';
import Register from './components/Register';
import PollDetail from './components/PollDetail';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [selectedPoll, setSelectedPoll] = useState(null);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    const handleRegister = () => {
        setShowRegister(false);
        setIsAuthenticated(true);
    };

    return (
        <AuthProvider>
            <div>
                <h1>Voting App</h1>
                {/* Sección de Login, Register y Logout */}
                {!isAuthenticated ? (
                    <>
                        <Login onLogin={handleLogin} />
                        <button onClick={() => setShowRegister(true)}>Register</button>
                        {showRegister && <Register onRegister={handleRegister} />}
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}

                {/* Lista de Encuestas */}
                {selectedPoll ? (
                    <PollDetail poll={selectedPoll} />
                ) : (
                    <>
                        <PollList onPollSelect={setSelectedPoll} />
                        {isAuthenticated && (
                            <PollForm onPollCreated={() => setSelectedPoll(null)} />
                        )}
                    </>
                )}

                <Footer />
            </div>
        </AuthProvider>
    );
};

export default App;
