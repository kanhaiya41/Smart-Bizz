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



// import React, { useState, useMemo } from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, 
//   Tooltip, ResponsiveContainer 
// } from 'recharts';

export const RevenueChart = () => {
  const [filter, setFilter] = useState('monthly');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const currentDate = new Date();

  const chartData = useMemo(() => {
    // Standard Filters (Aapka original logic)
    if (filter === 'weekly') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => ({
        day: d, current: 2000 + Math.random() * 5000, previous: 1500 + Math.random() * 4000
      }));
    }

    if (filter === 'yearly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => ({
        month: m, current: 20000 + Math.random() * 50000, previous: 15000 + Math.random() * 40000
      }));
    }

    if (filter === 'monthly' || (filter === 'custom' && (!startDate || !endDate))) {
      const days = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      return Array.from({ length: days }, (_, i) => ({
        day: (i + 1).toString().padStart(2, '0'),
        current: 2000 + Math.random() * 5000,
        previous: 1500 + Math.random() * 4000,
      }));
    }

    if (filter === 'custom' && startDate && endDate) {
      const diffDays = Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
      let groupSize = 1;
      if (diffDays > 120) groupSize = 7;
      else if (diffDays > 45) groupSize = 3;
      else groupSize = 1;

      const aggregated = [];
      for (let i = 0; i < Math.ceil(diffDays / groupSize); i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + (i * groupSize));
        aggregated.push({
          day: groupSize === 1 ? `${d.getDate()}/${d.getMonth() + 1}` : `${d.getDate()}/${d.getMonth() + 1}..`,
          current: (2000 + Math.random() * 5000) * groupSize,
          previous: (1500 + Math.random() * 4000) * groupSize,
        });
      }
      return aggregated;
    }
    return [];
  }, [filter, startDate, endDate]);

  const getTotalRevenue = (data) => data.reduce((sum, item) => sum + item.current, 0).toLocaleString();

  return (
    <div className='revenue-chart-container'>
      <div className='chart-header-main'>
        <div className='revenue-info'>
          <span className='label'>Total Revenue</span>
          <h3>IDR {getTotalRevenue(chartData)}</h3>
          <div className='trend-badge'>
            <span className="trend-up">↑ 30.1%</span>
            <span className='comparison'>vs previous period</span>
          </div>
        </div>

        <div className='header-controls-group'>
          <div className='filter-tabs'>
            {['weekly', 'monthly', 'yearly', 'custom'].map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${filter === tab ? 'active' : ''}`}
                onClick={() => { setFilter(tab); setStartDate(null); setEndDate(null); }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <button className='view-report-btn'>View Report</button>
        </div>
      </div>

      {/* Logic: Date Inputs Shifted Below Header to stop compression */}
      {filter === 'custom' && (
        <div className='date-selection-row'>
          <div className='date-range-picker'>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="date-input"
              dateFormat="dd/MM/yyyy"
              value={startDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              value={endDate}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="date-input"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      )}

      <p className='chart-timeline' style={{ marginTop: '10px', marginBottom: '15px' }}>
        {filter === 'custom' && startDate && endDate
          ? `Showing sales from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
          : 'Sales Overview'}
      </p>

      <div className='bar-wrapper'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={chartData.length > 20 ? 4 : 8}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={filter === 'yearly' ? 'month' : 'day'}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              interval={chartData.length > 25 ? 2 : 0}
            />
            <YAxis hide={true} />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="current" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={chartData.length > 25 ? 5 : 8} />
            <Bar dataKey="previous" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={chartData.length > 25 ? 5 : 8} />
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
