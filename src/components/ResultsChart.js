// src/components/ResultsChart.js
import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

const ResultsChart = ({ poll }) => {
    const chartRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        if (poll && poll.options) {
            setIsLoading(false);
        }
    }, [poll]);

    if (!poll || !poll.options || poll.options.length === 0) {
        return <p>No data available for this poll.</p>;
    }

    console.log('Poll data:', poll);

    const data = {
        labels: poll.options.map(option => option.text),
        datasets: [
            {
                label: 'Votes',
                data: poll.options.map(option => option.votes),
                backgroundColor: '#858A77',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Options',
                },
                ticks: {
                    color: '#ffffff',
                },
            },
            y: {
                type: 'linear',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Votes',
                },
                ticks: {
                        color: '#ffffff',
                    },
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container">
            <h2>Poll Results</h2>
            {isLoading ? (
                <p>Loading chart...</p>
            ) : (
                <Bar ref={chartRef} data={data} options={options} />
            )}
        </div>
    );
};

export default ResultsChart;
