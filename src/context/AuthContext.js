// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = async (username, password) => {
        const response = await axios.post('/api/auth/login', { username, password });
        localStorage.setItem('token', response.data.token);
        setUser({ token: response.data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
