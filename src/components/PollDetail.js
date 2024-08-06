// src/components/PollDetail.js
import React, { useState } from 'react';
import axios from 'axios';
import ResultsChart from './ResultsChart';

const PollDetail = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(null);

    const handleVote = async () => {
        if (!selectedOption) {
            alert('Please select an option before voting.');
            return;
        }

        try {
            await axios.post(`/api/polls/${poll._id}/vote`, { optionId: selectedOption });
            setShowResults(true);
        } catch (error) {
            console.error('Error voting:', error);
            setError('You must be logged in to vote.');
        }
    };

    return (
        <div>
            <h2>{poll.title}</h2>
            {poll.options.map((option) => (
                <div key={option._id}>
                    <input
                        type="radio"
                        value={option._id}
                        checked={selectedOption === option._id}
                        onChange={() => setSelectedOption(option._id)}
                    />
                    {option.text}
                </div>
            ))}
            <button onClick={handleVote}>Vote</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {}
            {showResults && <ResultsChart poll={poll} />}
        </div>
    );
};

export default PollDetail;
