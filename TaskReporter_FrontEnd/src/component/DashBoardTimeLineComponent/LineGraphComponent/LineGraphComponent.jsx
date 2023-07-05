import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
  
  
const LineGraphComponent = ({theme}) => {
  
// Sample data
const data = [
  {month: 'january', projects: 4},
  {month: 'febraury', projects: 5},
  {month: 'march', projects: 0},
  {month: 'april', projects: 2}
]; 
  
  
return (
  <div className="lineGraphWrapper" style={{color: 'var(--text-color)' }} >
    <AreaChart width={600} height={220} data={data} >
        <Area dataKey="projects" fill="gray" stroke="blue" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="month" />
        <YAxis />
      </AreaChart>
  </div>
);
}
  
export default LineGraphComponent;