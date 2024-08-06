// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/auth/register', { username, password });
        localStorage.setItem('token', response.data.token);
        onRegister();
    } catch (error) {
        console.error('Error registering:', error);
    }
};

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
