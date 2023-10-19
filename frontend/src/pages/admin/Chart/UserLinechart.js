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
            series={[
                { data: pData, label: 'User', id: 'userId' },
                { data: uData, label: 'Sponsor', id: 'sponsorId' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
                '.MuiLineElement-root, .MuiMarkElement-root': {
                    strokeWidth: 1,
                },
                '.MuiLineElement-series-userId': {
                    strokeDasharray: '5 5',
                },
                '.MuiLineElement-series-sponsorId': {
                    strokeDasharray: '3 4 5 2',
                },
                '.MuiMarkElement-root:not(.MuiMarkElement-highlighted)': {
                    fill: '#fff',
                },
                '& .MuiMarkElement-highlighted': {
                    stroke: 'none',
                },
            }}
        />
    );
}