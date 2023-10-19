import React from 'react';
import { Bar } from 'react-chartjs-2';

const RecipeBarChart = () => {
    // Dữ liệu mẫu về số lượng sản phẩm bán ra trong các tháng
    const data = {
        labels: ["Vegetarian", "Seafood", "Poultry", "Dessert", "Pork", "Beef"],
        datasets: [
            {
                label: "Quantity",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: [50, 60, 70, 55, 80, 75]
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ height: '300px', width: '450px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default RecipeBarChart;
