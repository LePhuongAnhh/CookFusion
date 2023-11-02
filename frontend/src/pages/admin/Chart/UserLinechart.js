import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from "axios"
import {
    apiUrl,
    ACCESS_TOKEN,
    ACCOUNT_ID,
    ROLE,
    PROFILE_INFORMATION,
    USERNAME
} from "../../../constants/constants.js"


export default function UserLineChart() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const xLabels = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    const [uData, setUData] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const [pData, setPData] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${apiUrl}/admin/getUserDashboard`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log(response.data)
                if (response.data.success) {
                    setUData(response.data.users.map(item => item.count))
                    setPData(response.data.sponsors.map(item => item.count))
                }
            } catch (error) {
                console.log(error)
            }
        }
        )()
    }, [])
    return (
        <LineChart
            width={890}
            height={300}
            // định nghĩa dữ liệu cho các series trên biểu đồ, bao gồm "User" và "Sponsor".
            series={[
                { data: uData, label: 'User', id: 'userId' },
                { data: pData, label: 'Sponsor', id: 'sponsorId' },
            ]}

            // định nghĩa nhãn cho trục x.
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
                // Selector cho series "User".
                '.MuiLineElement-root, .MuiMarkElement-root': {
                    strokeWidth: 1,
                },
                '.MuiLineElement-series-userId': {
                    stroke: 'blue', // Đổi màu sắc cho User thành màu xanh
                    strokeDasharray: '5 5',
                },
                '.MuiLineElement-series-sponsorId': {
                    stroke: 'red', // Đổi màu sắc cho Sponsor thành màu đỏ
                    strokeDasharray: '3 4 5 2', //Thuộc tính để đặt kiểu đường dẫn (dash-array) cho đường dẫn của series.
                },
                '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                    fill: '#fff',

                },
                '& .MuiMarkElement-highlighted': {
                    stroke: 'none',
                },
                '.MuiLegendItem-root': {
                    color: 'green', // Đổi màu sắc chú thích thành màu xanh
                },
            }}
        />
    );
}