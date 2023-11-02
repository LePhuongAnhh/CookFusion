import React, { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from "axios"
import {
  apiUrl,
  ACCESS_TOKEN,
  PROFILE_INFORMATION
} from "~/constants/constants"
const accessToken = localStorage.getItem(ACCESS_TOKEN);

const size = {
  width: 350,
  height: 200,
};

export default function RatingPieChart() {
  const [data, setData] = useState([
    { value: 35, label: 'Very good' },
    { value: 20, label: 'Good' },
    { value: 30, label: 'Normal' },
    { value: 10, label: 'Bad' },
    { value: 5, label: 'Very bad' },
  ])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${apiUrl}/userpackage/getcount`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.data.success) {
          setData(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    )()
  }, [])
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} - (${item.count})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 13,
        },
      }}
      {...size}
    />
  );
}
