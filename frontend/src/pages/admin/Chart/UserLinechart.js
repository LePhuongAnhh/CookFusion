import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Mon',
    'Tue',
    'Wed',
    'Thur',
    'Fri',
    'Sat',
    'Sun',
];

export default function UserLineChart() {
    return (
        <LineChart
            width={450}
            height={300}
            // định nghĩa dữ liệu cho các series trên biểu đồ, bao gồm "User" và "Sponsor".
            series={[
                { data: pData, label: 'User', id: 'userId' },
                { data: uData, label: 'Sponsor', id: 'sponsorId' },
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