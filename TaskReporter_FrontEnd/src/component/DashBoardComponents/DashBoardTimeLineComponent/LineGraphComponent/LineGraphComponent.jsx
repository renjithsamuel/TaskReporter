import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './LineGraphComponent.css'

const LineGraphComponent = ({ theme , graphData }) => {

  // Sample data
  const data2 = [
    { date: 'january', numberOfTasksCompleted: 4 },
    { date: 'febraury', numberOfTasksCompleted: 5 },
    { date: 'march', numberOfTasksCompleted: 0 },
    { date: 'april', numberOfTasksCompleted: 2 },
    { date: 'may', numberOfTasksCompleted: 5 },
    { date: 'june', numberOfTasksCompleted: 7 },
    { date: 'july', numberOfTasksCompleted: 5 },
  ];



  return (
    <div className="lineGraphWrapper" style={{ color: 'var(--text-color)' }}>
      <LineChart
        width={740}
        height={240}
        data={( graphData && graphData.length > 0 && graphData[0].date==null)?data2:graphData} 
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numberOfTasksCompleted" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default LineGraphComponent;
