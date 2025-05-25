import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = () => {
    const data = {
        labels: ['產品A', '產品B', '產品C', '其他'],
        datasets: [
            {
                data: [120, 150, 100, 50],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <Pie data={data} options={options} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>共715張訂單，共86,500 HKD</h2>
                <p>30% - 120 產品A</p>
                <p>40% - 150 產品B</p>
                <p>20% - 100 產品C</p>
                <p>10% - 50 其他</p>
            </div>
        </div>
    );
};

export default ChartComponent;