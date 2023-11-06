import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
    useEffect(() => {
        const ctx = document.getElementById('lineChart');

        const data = {
            labels: ['Like', 'Cmt', 'Share"'],
            datasets: [
                {
                    label: 'Bai vit 1',
                    data: [50, 55, 60, 58, 62, 65], // Dữ liệu like theo từng tháng
                    borderColor: 'red',
                    fill: false,
                },
                {
                    label: 'Bai vieet 2',
                    data: [40, 45, 50, 48, 52, 55], // Dữ liệu comment theo từng tháng
                    borderColor: 'blue',
                    fill: false,
                },
                {
                    label: 'bai vit 3',
                    data: [30, 35, 40, 38, 42, 45], // Dữ liệu share theo từng tháng
                    borderColor: 'green',
                    fill: false,
                },
            ],
        };

        const myChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => myChart.destroy(); // Cleanup khi component unmount
    }, []);

    return <canvas id="lineChart" width="400" height="200"></canvas>;
};

export default LineChart;
