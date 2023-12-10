import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    PROFILE_INFORMATION
} from "~/constants/constants"

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December']
const datasets = [
    {
        label: "Quantity ($)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40, 46, 3, 2, 8, 1]
    }
]
const RecipeBarChart = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/userpackage/getrevenue`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                console.log(response.data)
                if (response.data.success) {
                    response.data.data.map((data, index) => {
                        datasets[0].data[index] = data.count
                    })
                    setData({ labels: labels, datasets: datasets })
                }

            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    // Dữ liệu mẫu về số lượng sản phẩm bán ra trong các tháng
    const [data, setData] = useState({ labels: labels, datasets: datasets });
    const [value, setValue] = useState([])
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div style={{ height: '296px', width: "750px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default RecipeBarChart;
