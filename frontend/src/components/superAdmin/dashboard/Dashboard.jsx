// File: src/components/Component/superAdmin/Dashboard/Dashboard.jsx

import React from "react";
import "./Dashboard.css"; 

// --- CRITICAL: DO NOT IMPORT SIDEBAR HERE ---
// The Sidebar is already coming from Layout.jsx.

const Dashboard = () => {
  // --- MOCK DATA ---
  const stats = [
    { title: "Total Active Businesses", value: "1,250", sub: "Active today", icon: "🏢", trend: "+5%" },
    { title: "Messages Processed", value: "45,300", sub: "Today", icon: "💬", trend: "+12%" },
    { title: "AI Token Usage", value: "$12.50", sub: "Est. Cost Today", icon: "🤖", trend: "-2%" },
    { title: "System Uptime", value: "99.9%", sub: "Last 30 days", icon: "⚡", trend: "Good" },
  ];

  const recentSignups = [
    { id: 1, name: "Urban Clap", email: "contact@urbancoffee.com", date: "Oct 24, 2023", status: "Onboarding" },
    { id: 2, name: "NextGen Tech", email: "admin@nextgen.io", date: "Oct 24, 2023", status: "Live" },
    { id: 3, name: "Flow Yoga", email: "sarah@flowyoga.com", date: "Oct 23, 2023", status: "Live" },
  ];

  const systemAlerts = [
    { id: 101, message: "Instagram API Webhook Failure - 500 Error", time: "2 mins ago", type: "Critical" },
    { id: 102, message: "High latency on Server US-East-1", time: "15 mins ago", type: "Warning" },
    { id: 103, message: "Daily Backup Completed", time: "4 hours ago", type: "Info" },
  ];

  const powerUsers = [
    { name: "MegaMart Ltd", msgCount: "12,450", tier: "Enterprise" },
    { name: "QuickDeliver", msgCount: "8,320", tier: "Pro" },
    { name: "Support24", msgCount: "6,100", tier: "Pro" },
    { name: "TechGiant", msgCount: "5,400", tier: "Enterprise" },
    { name: "LocalEats", msgCount: "4,200", tier: "Starter" },
  ];

  return (
    <div className="dashboard-container">
      {/* HEADER SECTION */}
      <div className="dashboard-header">
        <div>
          {/* VISUAL CHECK: If you don't see "(FIXED)" on screen, you are editing the wrong file! */}
          <h1>Dashboard Overview (FIXED)</h1>
          <p className="subtitle">Welcome back, here's what's happening today</p>
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="content-area">
        
        {/* 1. Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-bg">{stat.icon}</div>
              <div className="stat-details">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className="stat-sub">{stat.sub}</span>
              </div>
              <span className={`stat-trend ${stat.trend.includes("-") ? "down" : "up"}`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>

        {/* 2. Charts Grid */}
        <div className="charts-grid">
          {/* Traffic Volume */}
          <div className="chart-card large">
            <div className="card-header">
              <h3>Traffic Volume</h3>
              <select className="chart-filter"><option>Last 24 Hours</option></select>
            </div>
            <div className="line-chart-container">
               <div style={{width:'100%', height:'150px', background:'#f9f9f9', display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', borderRadius:'8px'}}>
                 Graph Placeholder
               </div>
            </div>
          </div>

          {/* Channel Distribution */}
          <div className="chart-card">
            <h3>Channel Distribution</h3>
            <div className="pie-chart-wrapper">
              <div className="css-pie-chart"></div>
              <div className="pie-legend">
                <div className="legend-item"><span className="dot whatsapp"></span> WhatsApp (40%)</div>
                <div className="legend-item"><span className="dot instagram"></span> Instagram (30%)</div>
              </div>
            </div>
          </div>

          {/* AI vs Manual */}
          <div className="chart-card">
            <h3>AI vs Manual Replies</h3>
            <div className="simple-bar-chart">
              <div className="bar-group">
                <div className="bar-label">AI Auto-Reply</div>
                <div className="bar-track"><div className="bar-fill ai" style={{ width: "75%" }}></div></div>
                <span className="bar-value">75%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Data Tables */}
        <div className="tables-grid">
          {/* Signups */}
          <div className="table-card">
            <div className="card-header"><h3>Recent Signups</h3></div>
            <table>
              <thead><tr><th>Business</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {recentSignups.map((user) => (
                  <tr key={user.id}>
                    <td><div className="cell-main">{user.name}</div><div className="cell-sub">{user.date}</div></td>
                    <td><span className={`badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                    <td><button className="action-btn">Verify</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alerts */}
          <div className="table-card">
            <div className="card-header"><h3>System Alerts</h3></div>
            <div className="alerts-list">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
                  <span className="alert-msg">{alert.message}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Power Users */}
          <div className="table-card">
            <div className="card-header"><h3>Top Power Users</h3></div>
            <table>
              <thead><tr><th>Owner</th><th>Msgs</th><th>Tier</th></tr></thead>
              <tbody>
                {powerUsers.map((user, i) => (
                  <tr key={i}>
                    <td className="font-bold">{user.name}</td>
                    <td>{user.msgCount}</td>
                    <td><span className="tier-badge">{user.tier}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;