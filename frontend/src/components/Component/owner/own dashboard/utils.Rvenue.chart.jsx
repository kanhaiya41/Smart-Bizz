import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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
    <div className='revenue-chart-container'>
      <div className='chart-header-main'>
        <div className='revenue-info'>
          <span className='label'>Total Revenue</span>
          <h3>IDR 7.852.000</h3>
          <div className='trend-badge'>
            <span className='trend-up'>↑ 2.1%</span>
            <span className='comparison'>vs last week</span>
          </div>
        </div>
        <button className='view-report-btn'>View Report</button>
      </div>
      
      <p className='chart-timeline'>Sales from 1-12 Dec, 2020</p>

      <div className='bar-wrapper'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
            <YAxis hide={true} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}} 
              contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
            />
            <Bar dataKey="current" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={8} />
            <Bar dataKey="previous" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={8} />
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

const COLORS = ["#4f46e5", "#818cf8", "#c7d2fe"];

export const CircleChart = () => {
  return (
    <div className='circle-chart-wrapper'>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={circleData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {circleData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {/* Optional: Center Text for Pie Chart */}
      <div className='pie-center-label'>
        <span className='total-val'>100%</span>
        <span className='total-lbl'>Active</span>
      </div>
    </div>
  );
};