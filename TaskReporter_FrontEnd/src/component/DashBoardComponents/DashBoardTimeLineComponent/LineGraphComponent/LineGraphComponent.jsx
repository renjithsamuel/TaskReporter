import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineGraphComponent = ({ theme }) => {

  // Sample data
  const data2 = [
    { month: 'january', tasksCompleted: 4 },
    { month: 'febraury', tasksCompleted: 5 },
    { month: 'march', tasksCompleted: 0 },
    { month: 'april', tasksCompleted: 2 },
    { month: 'may', tasksCompleted: 5 },
    { month: 'june', tasksCompleted: 7 },
    { month: 'july', tasksCompleted: 5 },
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
        <Line type="monotone" dataKey="tasksCompleted" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default LineGraphComponent;
