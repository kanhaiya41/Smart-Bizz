import React from "react";
// We reuse the Dashboard CSS for container styles to keep it consistent
import "./ChannelHealth.css"; 

const ChannelHealth = () => {
  return (
    <div className="dashboard-container" style={{ display: 'block' }}> 
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Channel Health</h1>
          <p className="subtitle">Real-time status monitoring of messaging gateways.</p>
        </div>
      </div>

      {/* Top Status Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-details">
            <h3>WhatsApp Business</h3>
            <span className="badge live">Online</span>
            <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#888'}}>Latency: 120ms</div>
          </div>
        </div>
        <div className="stat-card">
           <div className="stat-details">
            <h3>Instagram DM API</h3>
            <span className="badge" style={{background: '#fff7ed', color: '#c2410c'}}>Degraded</span>
            <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#888'}}>Latency: 850ms</div>
          </div>
        </div>
        <div className="stat-card">
           <div className="stat-details">
            <h3>Facebook Messenger</h3>
            <span className="badge live">Online</span>
            <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#888'}}>Latency: 140ms</div>
          </div>
        </div>
        <div className="stat-card">
           <div className="stat-details">
            <h3>Telegram Bot API</h3>
            <span className="badge live">Online</span>
            <div style={{marginTop: '10px', fontSize: '0.8rem', color: '#888'}}>Latency: 200ms</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="chart-card">
          <h3>Webhook Latency (ms)</h3>
          {/* Placeholder for chart */}
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', borderRadius: '8px' }}>
            <span style={{color: '#aaa'}}>Latency Chart Visualization</span>
          </div>
        </div>
        <div className="chart-card">
          <h3>Error Rate (Today)</h3>
          <h2 style={{fontSize: '2.5rem', margin: '20px 0', color: '#02122c'}}>0.4%</h2>
          <p style={{fontSize: '0.8rem', color: '#888'}}>Threshold: 1.0% (Healthy)</p>
        </div>
      </div>

      {/* Failure Log Table */}
      <div className="table-card">
        <h3>Recent Failure Log</h3>
        <table style={{marginTop: '15px'}}>
          <thead>
            <tr>
              <th>ERROR TYPE</th>
              <th>SOURCE</th>
              <th>TIME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{color: '#dc2626', fontWeight: '600'}}>Token Expired</td>
              <td>Business A</td>
              <td>10:42 AM</td>
              <td><button className="action-btn">Investigate</button></td>
            </tr>
            <tr>
              <td style={{color: '#dc2626', fontWeight: '600'}}>500 Server Error</td>
              <td>Instagram Webhook</td>
              <td>09:15 AM</td>
              <td><button className="action-btn">Investigate</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChannelHealth;