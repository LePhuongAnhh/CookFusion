import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

const MixChart = ({ ratingCategory }) => {
    const data = {
        labels: ratingCategory.category,
        datasets: [
            {
                type: 'line', // Loại biểu đồ đường
                label: 'Số Lượng Công Thức',
                borderColor: 'red',
                borderWidth: 2,
                fill: false,
                data: ratingCategory.count,
            }, {
                type: 'line', // Loại biểu đồ đường
                label: 'Average rating',
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                data: ratingCategory.avgRating,
                yz: 'right'
            },
            {
                type: 'bar', // Loại biểu đồ cột
                label: 'Số Lượng Đánh Giá',
                backgroundColor: 'orange',
                data: ratingCategory.rating,
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
            yz: {
                beginAtZero: true,
                position: 'right',
                suggestedMax: 5
            }
        },
    };

    return (
        <div>
            <div style={{ height: '350px', width: '570px' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default MixChart;
