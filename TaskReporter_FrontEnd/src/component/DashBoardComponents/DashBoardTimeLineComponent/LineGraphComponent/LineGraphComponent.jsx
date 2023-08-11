import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './LineGraphComponent.css'
import { useCallback, useState } from 'react';

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

  const [state, setState] = useState({
    opacity: {
      uv: 1,
      pv: 1,
    },
  })

  let handleMouseEnter = useCallback((o) => {
    console.log("Entering"+JSON.stringify(o));

    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  });

  let handleMouseLeave = useCallback((o) => {
    console.log("Leaving"+JSON.stringify(o));
    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  });



  return (
    <div className="lineGraphWrapper" style={{ width:"100%", color: 'var(--text-color)' }}>
      <ResponsiveContainer width="100%" height={240}>   
        <LineChart
          width={740}
          height={240}
          data={graphData} 
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
          <Legend onMouseEnter={(e) => handleMouseEnter(e)} onMouseLeave={(e) => handleMouseLeave(e)} />
          <Line type="monotone" dataKey="numberOfTasksCompleted" strokeOpacity={state.opacity.uv} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Tooltip className={"toolTip"}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraphComponent;
