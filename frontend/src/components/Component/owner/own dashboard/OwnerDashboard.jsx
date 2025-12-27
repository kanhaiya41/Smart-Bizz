import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./OwnerDashboard.css";

const OwnerDashboard = () => {
  // State to toggle the Chat Sidebar
  const [isChatOpen, setIsChatOpen] = useState(true);

  // --- MOCK DATA: ANALYTICS ---
  const trafficData = [
    { name: "Mon", users: 4000, bot: 2400 },
    { name: "Tue", users: 3000, bot: 1398 },
    { name: "Wed", users: 2000, bot: 9800 },
    { name: "Thu", users: 2780, bot: 3908 },
    { name: "Fri", users: 1890, bot: 4800 },
    { name: "Sat", users: 2390, bot: 3800 },
    { name: "Sun", users: 3490, bot: 4300 },
  ];

  const sourceData = [
    { name: "Direct", value: 400, color: "#2B3674" },
    { name: "Social", value: 300, color: "#4318FF" },
    { name: "Referral", value: 300, color: "#05CD99" },
  ];

  // --- TOP 10 QUERIES ---
  const topQueries = [
    { id: 1, query: "What are your opening hours?", count: 342, trend: 85 },
    { id: 2, query: "Do you offer refunds?", count: 290, trend: 70 },
    { id: 3, query: "How to track my order?", count: 210, trend: 60 },
    { id: 4, query: "Pricing details for bulk", count: 180, trend: 50 },
    { id: 5, query: "Contact support agent", count: 150, trend: 40 },
    { id: 6, query: "International shipping?", count: 120, trend: 35 },
    { id: 7, query: "How to reset password", count: 98, trend: 30 },
    { id: 8, query: "Is the product in stock?", count: 85, trend: 25 },
    { id: 9, query: "Cancel my subscription", count: 70, trend: 15 },
    { id: 10, query: "Collaboration inquiry", count: 45, trend: 10 },
  ];

  const liveInteractions = [
    {
      id: 1,
      user: "Sarah (Urban Coffee)",
      avatar: "S",
      color: "#FFB547",
      query: "How do I update my inventory PDF?",
      botReply: "Go to the Inventory tab and click '+ New Inventory'.",
      time: "Just now",
      status: "Resolved",
    },
    {
      id: 2,
      user: "Mike (TechStart)",
      avatar: "M",
      color: "#4318FF",
      query: "What is the pricing for Enterprise?",
      botReply: "Enterprise starts at $199/mo. Would you like a demo?",
      time: "14 min ago",
      status: "Pending",
    },
    {
      id: 3,
      user: "Guest_8821",
      avatar: "G",
      color: "#05CD99",
      query: "Do you guys open on Sundays?",
      botReply: "Yes! We are open from 9 AM to 9 PM on Sundays.",
      time: "1 hour ago",
      status: "Resolved",
    },
    {
      id: 4,
      user: "John Doe",
      avatar: "J",
      color: "#E1306C",
      query: "I want to speak to a human.",
      botReply: "I have notified a support agent. They will join shortly.",
      time: "2 hours ago",
      status: "Escalated",
    },
  ];

  return (
    <div className={`owner-dashboard-wrapper ${!isChatOpen ? 'chat-closed' : ''}`}>
      
      {/* --- LEFT COLUMN: MAIN ANALYTICS --- */}
      <div className="main-analytics-area">
        {/* Header */}
        <header className="dash-header">
          <div>
            <h1>Overview</h1>
            <p>Welcome back, here's your business at a glance.</p>
          </div>
          <div className="date-picker-mock">
            <span>📅 This Month</span>
          </div>
        </header>

        {/* Stats Row */}
        <div className="stats-row-compact">
          <div className="stat-tile">
            <span className="stat-label">Total Users</span>
            <div className="stat-flex">
              <h2>12,450</h2>
              <span className="badge-trend up">+15%</span>
            </div>
          </div>
          <div className="stat-tile">
            <span className="stat-label">Bot Handles</span>
            <div className="stat-flex">
              <h2>8,320</h2>
              <span className="badge-trend up">+8%</span>
            </div>
          </div>
          <div className="stat-tile">
            <span className="stat-label">Escalations</span>
            <div className="stat-flex">
              <h2>120</h2>
              <span className="badge-trend down">-2%</span>
            </div>
          </div>
          <div className="stat-tile">
            <span className="stat-label">Avg Response</span>
            <div className="stat-flex">
              <h2>1.2s</h2>
              <span className="badge-trend neutral">Stable</span>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="chart-section large">
          <div className="section-header">
            <h3>Traffic & Automation</h3>
            <button className="btn-icon">⋮</button>
          </div>
          <div className="chart-container-fluid">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorBot" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5F2" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#A3AED0', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'}} 
                />
                <Area type="monotone" dataKey="bot" stroke="#4318FF" strokeWidth={3} fillOpacity={1} fill="url(#colorBot)" />
                <Area type="monotone" dataKey="users" stroke="#05CD99" strokeWidth={3} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Split Row */}
        <div className="split-row">
          <div className="chart-section medium">
            <h3>Traffic Source</h3>
            <div className="pie-container">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend-custom">
                <div className="legend-dot" style={{background: '#2B3674'}}>Direct</div>
                <div className="legend-dot" style={{background: '#4318FF'}}>Social</div>
                <div className="legend-dot" style={{background: '#05CD99'}}>Referral</div>
              </div>
            </div>
          </div>

          {/* TOP 10 QUERIES TABLE */}
          <div className="chart-section medium">
            <div className="section-header">
              <h3>🔥 Top 10 User Queries</h3>
              <button className="view-all-text" style={{fontSize: '11px'}}>Export</button>
            </div>
            <div className="table-scroll-wrapper">
              <table className="modern-table compact">
                <thead>
                  <tr>
                    <th width="15%">#</th>
                    <th width="55%">Query</th>
                    <th width="30%">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topQueries.map((item, index) => (
                    <tr key={item.id}>
                      <td><span className={`rank-tag rank-${index + 1}`}>{index + 1}</span></td>
                      <td className="query-text" title={item.query}>"{item.query}"</td>
                      <td>
                        <div className="trend-bar-wrapper">
                          <span className="count-text">{item.count}</span>
                          <div className="mini-track">
                            <div className="mini-fill" style={{width: `${item.trend}%`}}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: ACTIVITY FEED --- */}
      <div className="right-activity-sidebar">
        <div className="sidebar-header">
          <button 
            className="btn-close-chat" 
            onClick={() => setIsChatOpen(false)} 
            title="Close Sidebar"
          >
            ✕
          </button>
          <h3>Live Interactions</h3>
          <span className="live-indicator">● Live</span>
        </div>

        <div className="activity-timeline">
          {liveInteractions.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-left">
                <div className="avatar-circle" style={{backgroundColor: item.color + '20', color: item.color}}>
                  {item.avatar}
                </div>
                <div className="timeline-line"></div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="user-name">{item.user}</span>
                  <span className="time-ago">{item.time}</span>
                </div>
                
                <div className="chat-bubble user">
                  <span className="bubble-label">Query:</span>
                  "{item.query}"
                </div>

                <div className="chat-bubble bot">
                  <div className="bot-icon-small">🤖</div>
                  <div>
                      <span className="bubble-label">Bot:</span>
                      {item.botReply}
                  </div>
                </div>

                {item.status === "Escalated" && (
                  <div className="status-tag escalated">⚠️ Escalated to Agent</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-link">View All History →</div>
      </div>

      {/* --- FLOATING BUTTON --- */}
      <button 
        className={`btn-floating-open ${!isChatOpen ? 'visible' : ''}`} 
        onClick={() => setIsChatOpen(true)}
        title="Open Live Chat"
      >
        💬
      </button>

    </div>
  );
};

export default OwnerDashboard;