import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

const MixChart = () => {
    const data = {
        labels: ["Vegetarian", "Seafood", "Poultry", "Dessert", "Pork", "Beef"],
        datasets: [
            {
                type: 'line', // Loại biểu đồ đường
                label: 'Số Lượng Công Thức',
                borderColor: 'red',
                borderWidth: 2,
                fill: false,
                data: [10, 15, 20, 18, 25, 3],
            },
            {
                type: 'bar', // Loại biểu đồ cột
                label: 'Số Lượng Đánh Giá',
                backgroundColor: 'orange',
                data: [5, 8, 12, 10, 15, 5],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div style={{ height: '350px', width: '600px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default MixChart;
