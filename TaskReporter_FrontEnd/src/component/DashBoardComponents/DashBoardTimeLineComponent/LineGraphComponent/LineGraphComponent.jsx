import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineGraphComponent = ({ theme }) => {

  // Sample data
  const data2 = [
    { month: 'january', projects: 4 },
    { month: 'febraury', projects: 5 },
    { month: 'march', projects: 0 },
    { month: 'april', projects: 2 }
  ];

  return (
    <div className="lineGraphWrapper" style={{ color: 'var(--text-color)' }}>
      <LineChart
        width={740}
        height={240}
        data={data2} // Replace data with data2
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="projects" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default LineGraphComponent;
