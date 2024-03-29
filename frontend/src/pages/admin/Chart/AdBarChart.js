import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import { apiUrl, ACCESS_TOKEN } from '~/constants/constants';
import axios from 'axios';
Chart.register(CategoryScale);

// import { BarChart } from '@mui/x-charts/BarChart';

export default function AdBarsChart() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const [categories, setCategories] = useState(["Vegetarian", "Seafood", "Poultry", "Dessert", "Pork", "Beef", "Hi"])
    const [mealplans, setMealplan] = useState([65, 59, 80, 81, 56, 55, 40])
    const data = {
        labels: categories,
        datasets: [{
            label: categories,
            data: mealplans,
            borderWidth: 1
        }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${apiUrl}/mealplan/getallcategorywithmealplan`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(res.data.data)
                if (res.data.success) {
                    const listCategories = []
                    const mealplans = []
                    res.data.data.map((category) => {
                        listCategories.push(category.name)
                        mealplans.push(category.mealplans)
                    })
                    setCategories(listCategories)
                    setMealplan(mealplans)
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <div style={{
            height: " 250px",
            width: " 494px",
            marginTop: '51px'
        }}>
            <div style={{ height: '250px', width: '494px' }}>
                <Bar data={data} options={config} />
            </div>
        </div>
    );
}