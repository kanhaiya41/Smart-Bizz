import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
  ,PieChart, Pie, Cell

 } from 'recharts';

// Dummy Data matching your image (Dec 1 to 12)
const data = [
  { day: '01', current: 4000, previous: 2400 },
  { day: '02', current: 3000, previous: 4000 },
  { day: '03', current: 3800, previous: 2000 },
  { day: '04', current: 2780, previous: 3908 },
  { day: '05', current: 4800, previous: 3200 },
  { day: '06', current: 5500, previous: 2500 },
  { day: '07', current: 4000, previous: 2800 },
  { day: '08', current: 3200, previous: 4000 },
  { day: '09', current: 3700, previous: 2100 },
  { day: '10', current: 2900, previous: 3800 },
  { day: '11', current: 4600, previous: 3300 },
  { day: '12', current: 5200, previous: 2600 },
];

export const RevenueChart = () => {
  return (
    <div className='revenue.chart' style={{
      marginTop:'10px'
    }}>
      {/* Header section as seen in your image */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <span style={{fontSize:'12px'}} >Revenue</span>
          <h5>IDR 7.852.000</h5>
          <span style={{ color: '#28a745', fontSize: '12px', fontWeight: 'bold' }}>↑ 2.1% <span style={{color: '#999'}}>vs last week</span></span>
        </div>
        <button style={{ height:'15px', fontSize: '10px',  padding: '8px', borderRadius: '8px', border: '1px solid #eee', background: 'none', cursor: 'pointer' }}>View Report</button>
      </div>
      
      <p style={{ color: '#999', fontSize: '13px'}}>Sales from 1-12 Dec, 2020</p>

      {/* Actual Chart */}
      <div style={{ height: "150px"}}>
        <ResponsiveContainer>
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
            <YAxis hide={true} />
            <Tooltip cursor={{fill: 'transparent'}} />
            
            {/* Blue Bar (Current) */}
            <Bar dataKey="current" fill="#5c67f2" radius={[4, 4, 0, 0]} barSize={10} />
            
            {/* Grey Bar (Previous/Comparison) */}
            <Bar dataKey="previous" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};



const circleData = [
  { name: "Morning", value: 30 },
  { name: "Afternoon", value: 40 },
  { name: "Evening", value: 30 },
];

const COLORS = ["#5A6ACF", "#8593ED", "#C7CEFF"];

export const CircleChart = () => {
  return (
    <div style={{ height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={circleData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {circleData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};



