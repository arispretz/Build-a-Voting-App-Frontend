// src/components/PollList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PollList = ({ onPollSelect }) => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('/api/polls');
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();
    }, []);

    return (
        <div>
            <h2>Available Polls</h2>
            {polls.map((poll) => (
                <div key={poll._id} onClick={() => onPollSelect(poll)}>
                    <h3>{poll.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default PollList;
