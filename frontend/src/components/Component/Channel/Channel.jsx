import React from 'react';
import Sidebar from '../../sidebar/Sidebar';
import './ChannelHealth.css';

const ChannelHealth = () => {
  // Mock Data
  const platforms = [
    { name: "WhatsApp Business API", status: "Online", latency: "120ms", uptime: "99.9%" },
    { name: "Instagram DM API", status: "Degraded", latency: "850ms", uptime: "98.5%" },
    { name: "Facebook Messenger", status: "Online", latency: "140ms", uptime: "99.9%" },
    { name: "Telegram Bot API", status: "Online", latency: "200ms", uptime: "100%" }
  ];

  const recentFailures = [
    { id: 1, type: "Token Expired", source: "Business A", time: "10:42 AM" },
    { id: 2, type: "500 Server Error", source: "Instagram Webhook", time: "09:15 AM" },
    { id: 3, type: "Message Timeout", source: "Business B", time: "Yesterday" }
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content-wrap">
        <header className="page-header">
          <h1>Channel Health</h1>
          <p>Real-time status monitoring of messaging gateways.</p>
        </header>

        {/* 1. Platform Status Grid */}
        <div className="status-grid">
          {platforms.map((p, i) => (
            <div key={i} className={`status-card ${p.status.toLowerCase()}`}>
              <div className="card-top">
                <h3>{p.name}</h3>
                <span className="status-badge">{p.status}</span>
              </div>
              <div className="card-metrics">
                <div className="metric">
                  <span className="label">Latency</span>
                  <span className="value">{p.latency}</span>
                </div>
                <div className="metric">
                  <span className="label">Uptime</span>
                  <span className="value">{p.uptime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Charts Row */}
        <div className="charts-row">
          
          {/* Latency Graph (SVG Mock) */}
          <div className="chart-panel">
            <h3>Webhook Latency (ms)</h3>
            <div className="graph-container">
               {/* Simple SVG Line Chart */}
               <svg viewBox="0 0 300 100" className="latency-svg">
                 <polyline 
                    fill="none" 
                    stroke="#02122c" 
                    strokeWidth="2" 
                    points="0,80 30,70 60,85 90,40 120,45 150,20 180,50 210,60 240,40 270,50 300,30" 
                 />
                 <line x1="0" y1="90" x2="300" y2="90" stroke="#eee" />
                 <line x1="0" y1="50" x2="300" y2="50" stroke="#eee" strokeDasharray="4"/>
               </svg>
               <div className="axis-labels">
                 <span>00:00</span>
                 <span>12:00</span>
                 <span>Now</span>
               </div>
            </div>
            <p className="insight-text">Instagram latency spiked at 09:00 AM.</p>
          </div>

          {/* Error Rate Monitor */}
          <div className="chart-panel">
             <h3>Error Rate (Today)</h3>
             <div className="error-stat-large">
               <span className="big-num">0.4%</span>
               <span className="label">Failure Rate</span>
             </div>
             <div className="progress-bar-bg">
               <div className="progress-bar-fill" style={{width: '15%'}}></div>
             </div>
             <p className="insight-text">Threshold: 1.0% (Healthy)</p>
          </div>
        </div>

        {/* 3. Recent Failure Log */}
        <div className="table-panel">
          <h3>Recent Failure Log</h3>
          <table>
            <thead>
              <tr>
                <th>Error Type</th>
                <th>Source</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentFailures.map(fail => (
                <tr key={fail.id}>
                  <td className="error-text">{fail.type}</td>
                  <td>{fail.source}</td>
                  <td>{fail.time}</td>
                  <td><button className="btn-small">Investigate</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ChannelHealth;