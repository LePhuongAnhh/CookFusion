import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 35, label: 'Very good' },
  { value: 20, label: 'Good' },
  { value: 30, label: 'Normal' },
  { value: 10, label: 'Bad' },
  { value: 5, label: 'Very bad' },
];

const size = {
  width: 350,
  height: 200,
};

export default function RatingPieChart() {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
