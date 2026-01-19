import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Cell, Pie } from 'recharts';

const weeklyData = [
  { day: 'Mon', current: 4000, previous: 2400 },
  { day: 'Tue', current: 3000, previous: 4000 },
  { day: 'Wed', current: 3800, previous: 2000 },
  { day: 'Thu', current: 2780, previous: 3908 },
  { day: 'Fri', current: 4800, previous: 3200 },
  { day: 'Sat', current: 5500, previous: 2500 },
  { day: 'Sun', current: 4000, previous: 2800 },
];

const monthlyData = [
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

const yearlyData = [
  { month: 'Jan', current: 85000, previous: 72000 },
  { month: 'Feb', current: 92000, previous: 81000 },
  { month: 'Mar', current: 78000, previous: 89000 },
  { month: 'Apr', current: 95000, previous: 76000 },
  { month: 'May', current: 88000, previous: 91000 },
  { month: 'Jun', current: 102000, previous: 83000 },
  { month: 'Jul', current: 91000, previous: 87000 },
  { month: 'Aug', current: 83000, previous: 94000 },
  { month: 'Sep', current: 97000, previous: 79000 },
  { month: 'Oct', current: 89000, previous: 92000 },
  { month: 'Nov', current: 105000, previous: 85000 },
  { month: 'Dec', current: 98000, previous: 90000 },
];

const DatePicker = ({ value, onChange, placeholder, maxDate, minDate }) => {
  const handleChange = (e) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      onChange(date);
    }
  };

  return (
    <input
      type="date"
      value={value ? value.toISOString().split('T')[0] : ''}
      onChange={handleChange}
      placeholder={placeholder}
      max={maxDate ? maxDate.toISOString().split('T')[0] : ''}
      min={minDate ? minDate.toISOString().split('T')[0] : ''}
      className="date-input"
    />
  );
};

export const RevenueChart = () => {
  const [filter, setFilter] = useState('monthly');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const currentDate = new Date();
  
  const getTotalRevenue = (data) => {
    return data.reduce((sum, item) => sum + item.current, 0).toLocaleString();
  };

  const getTrendPercentage = (data) => {
    const currentTotal = data.reduce((sum, item) => sum + item.current, 0);
    const previousTotal = data.reduce((sum, item) => sum + item.previous, 0);
    return ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1);
  };

  const chartData = useMemo(() => {
    if (filter === 'weekly') return weeklyData;
    if (filter === 'monthly') return monthlyData;
    if (filter === 'yearly') return yearlyData;
    if (filter === 'custom' && startDate && endDate) {
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const customData = [];
      for (let i = 0; i < Math.min(daysDiff + 1, 12); i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        customData.push({
          day: date.getDate().toString().padStart(2, '0'),
          current: 3000 + Math.random() * 3000,
          previous: 2000 + Math.random() * 3000,
        });
      }
      return customData;
    }
    return monthlyData;
  }, [filter, startDate, endDate]);

  const getTimelineText = () => {
    switch (filter) {
      case 'weekly': return 'Sales from last 7 days';
      case 'monthly': return 'Sales from 1-12 Dec, 2025';
      case 'yearly': return 'Sales from Jan-Dec, 2025';
      case 'custom': 
        if (startDate && endDate) {
          return `Sales from ${startDate.getDate()}/${startDate.getMonth()+1} to ${endDate.getDate()}/${endDate.getMonth()+1}`;
        }
        return 'Select date range';
      default: return 'Sales from 1-12 Dec, 2025';
    }
  };

  return (
    <div className='revenue-chart-container'>
      <div className='chart-header-main'>
        <div className='revenue-info'>
          <span className='label'>Total Revenue</span>
          <h3>IDR {getTotalRevenue(chartData)}</h3>
          <div className='trend-badge'>
            <span className={`trend-${getTrendPercentage(chartData) >= 0 ? 'up' : 'down'}`}>
              {getTrendPercentage(chartData) >= 0 ? '↑' : '↓'} {Math.abs(getTrendPercentage(chartData))}%
            </span>
            <span className='comparison'>vs previous period</span>
          </div>
        </div>
        <button className='view-report-btn'>View Report</button>
      </div>

      {/* Filter Controls */}
      <div className='filter-controls'>
        <div className='filter-tabs'>
          {['weekly', 'monthly', 'yearly', 'custom'].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? 'active' : ''}`}
              onClick={() => {
                setFilter(tab);
                setStartDate(null);
                setEndDate(null);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {filter === 'custom' && (
          <div className='date-range-picker'>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              placeholder="Start Date"
              maxDate={endDate || currentDate}
            />
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              placeholder="End Date"
              minDate={startDate}
              maxDate={currentDate}
            />
          </div>
        )}
      </div>

      <p className='chart-timeline'>{getTimelineText()}</p>

      <div className='bar-wrapper'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={8}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey={filter === 'yearly' ? 'month' : 'day'} 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 11}} 
            />
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