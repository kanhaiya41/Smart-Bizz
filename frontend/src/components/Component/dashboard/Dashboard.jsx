import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  // --- MOCK DATA ---

  // 1. Stats Cards Data
  const stats = [
    {
      title: "Total Active Businesses",
      value: "1,250",
      sub: "Active today",
      icon: "🏢",
      trend: "+5%",
    },
    {
      title: "Messages Processed",
      value: "45,300",
      sub: "Today",
      icon: "💬",
      trend: "+12%",
    },
    {
      title: "AI Token Usage",
      value: "$12.50",
      sub: "Est. Cost Today",
      icon: "🤖",
      trend: "-2%",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      sub: "Last 30 days",
      icon: "⚡",
      trend: "Good",
    },
  ];

  // 2. Table Data: Recent Signups
  const recentSignups = [
    {
      id: 1,
      name: "Urban Coffee",
      email: "contact@urbancoffee.com",
      date: "Oct 24, 2023",
      status: "Onboarding",
    },
    {
      id: 2,
      name: "NextGen Tech",
      email: "admin@nextgen.io",
      date: "Oct 24, 2023",
      status: "Live",
    },
    {
      id: 3,
      name: "Flow Yoga",
      email: "sarah@flowyoga.com",
      date: "Oct 23, 2023",
      status: "Live",
    },
  ];

  // 3. Table Data: System Alerts
  const systemAlerts = [
    {
      id: 101,
      message: "Instagram API Webhook Failure - 500 Error",
      time: "2 mins ago",
      type: "Critical",
    },
    {
      id: 102,
      message: "High latency on Server US-East-1",
      time: "15 mins ago",
      type: "Warning",
    },
    {
      id: 103,
      message: "Daily Backup Completed",
      time: "4 hours ago",
      type: "Info",
    },
  ];

  // 4. Table Data: Top Power Users
  const powerUsers = [
    { name: "MegaMart Ltd", msgCount: "12,450", tier: "Enterprise" },
    { name: "QuickDeliver", msgCount: "8,320", tier: "Pro" },
    { name: "Support24", msgCount: "6,100", tier: "Pro" },
    { name: "TechGiant", msgCount: "5,400", tier: "Enterprise" },
    { name: "LocalEats", msgCount: "4,200", tier: "Starter" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        {/* Header */}
        <header className="top-bar">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search businesses, logs..." />
          </div>
          <div className="user-profile">
            <div className="admin-info">
              <span className="name">Super Admin</span>
              <span className="role">Jaffar Mia</span>
            </div>
            <div className="avatar">
              <img src="https://i.pravatar.cc/150?img=12" alt="Admin" />
            </div>
          </div>
        </header>

        <div className="content-area">
          {/* SECTION A: The Pulse (Stats Cards) */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon-bg">{stat.icon}</div>
                <div className="stat-details">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span className="stat-sub">{stat.sub}</span>
                </div>
                <span
                  className={`stat-trend ${
                    stat.trend.includes("-") ? "down" : "up"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            ))}
          </div>

          {/* SECTION B: Graphical Analytics */}
          <div className="charts-grid">
            {/* 1. Traffic Volume (CSS/SVG Line Chart Mock) */}
            <div className="chart-card large">
              <div className="card-header">
                <h3>Traffic Volume</h3>
                <select className="chart-filter">
                  <option>Last 24 Hours</option>
                </select>
              </div>
              <div className="line-chart-container">
                {/* Simple SVG Line Chart */}
                <svg viewBox="0 0 500 150" className="svg-line-chart">
                  {/* Grid Lines */}
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#eee" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#eee" />
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#eee" />
                  {/* The Line Path */}
                  <polyline
                    fill="none"
                    stroke="#02122c"
                    strokeWidth="3"
                    points="0,120 50,100 100,110 150,60 200,80 250,40 300,50 350,20 400,60 450,30 500,10"
                  />
                  {/* Area fill (optional) */}
                  <polygon
                    fill="rgba(2, 18, 44, 0.05)"
                    points="0,150 0,120 50,100 100,110 150,60 200,80 250,40 300,50 350,20 400,60 450,30 500,10 500,150"
                  />
                </svg>
                <div className="chart-labels">
                  <span>00:00</span>
                  <span>04:00</span>
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </div>

            {/* 2. Channel Distribution (CSS Pie Chart) */}
            <div className="chart-card">
              <h3>Channel Distribution</h3>
              <div className="pie-chart-wrapper">
                <div className="css-pie-chart"></div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <span className="dot whatsapp"></span> WhatsApp (40%)
                  </div>
                  <div className="legend-item">
                    <span className="dot instagram"></span> Instagram (30%)
                  </div>
                  <div className="legend-item">
                    <span className="dot facebook"></span> Facebook (20%)
                  </div>
                  <div className="legend-item">
                    <span className="dot telegram"></span> Telegram (10%)
                  </div>
                </div>
              </div>
            </div>

            {/* 3. AI vs Manual (Bar Chart) */}
            <div className="chart-card">
              <h3>AI vs Manual Replies</h3>
              <div className="simple-bar-chart">
                <div className="bar-group">
                  <div className="bar-label">AI Auto-Reply</div>
                  <div className="bar-track">
                    <div className="bar-fill ai" style={{ width: "75%" }}></div>
                  </div>
                  <span className="bar-value">75%</span>
                </div>
                <div className="bar-group">
                  <div className="bar-label">Manual Type</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill manual"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <span className="bar-value">25%</span>
                </div>
              </div>
              <p className="chart-note">
                High AI usage indicates good product value.
              </p>
            </div>
          </div>

          {/* SECTION C: Live Data Tables (Action Items) */}
          <div className="tables-grid">
            {/* Recent Signups */}
            <div className="table-card">
              <div className="card-header">
                <h3>Recent Signups</h3>
                <button className="view-btn">View All</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Business</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSignups.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="cell-main">{user.name}</div>
                        <div className="cell-sub">{user.date}</div>
                      </td>
                      <td>
                        <span className={`badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn">Verify</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* System Alerts */}
            <div className="table-card">
              <div className="card-header">
                <h3>System Alerts / Logs</h3>
              </div>
              <div className="alerts-list">
                {systemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`alert-item ${alert.type.toLowerCase()}`}
                  >
                    <div className="alert-content">
                      <span className="alert-msg">{alert.message}</span>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Power Users */}
            <div className="table-card">
              <div className="card-header">
                <h3>Top Power Users</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Owner</th>
                    <th>Msgs</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {powerUsers.map((user, i) => (
                    <tr key={i}>
                      <td className="font-bold">{user.name}</td>
                      <td>{user.msgCount}</td>
                      <td>
                        <span className="tier-badge">{user.tier}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
