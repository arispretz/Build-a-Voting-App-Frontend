// src/components/PollForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PollForm = ({ onPollCreated }) => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['']);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pollData = {
            title,
            options: options.map(opt => ({ text: opt, votes: 0 }))
        };
        const token = localStorage.getItem('token');

        try {
            await axios.post('/api/polls', pollData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onPollCreated();
            setTitle('');
            setOptions(['']);
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Poll</h2>
            <input
                type="text"
                placeholder="Poll Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                />
            ))}
            <button type="button" onClick={addOption}>Add Option</button>
            <button type="submit">Create Poll</button>
        </form>
    );
};

export default PollForm;
