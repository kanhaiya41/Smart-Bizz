import React from "react";
import "./AiUsage.css";

const AiUsage = () => {
  // Mock Data
  const topSpenders = [
    { name: "MegaMart Ltd", spent: "$45.20", plan: "Free" },
    { name: "TechStart Inc", spent: "$32.50", plan: "Pro" },
    { name: "LocalEats", spent: "$28.00", plan: "Free" },
  ];

  const liveLogs = [
    {
      id: 104,
      model: "GPT-4",
      prompt: "Summarize this PDF...",
      user: "User_882",
      time: "2s ago",
    },
    {
      id: 103,
      model: "Gemini",
      prompt: "Write an email response...",
      user: "User_110",
      time: "5s ago",
    },
    {
      id: 102,
      model: "GPT-4",
      prompt: "Translate to Spanish...",
      user: "User_543",
      time: "12s ago",
    },
    {
      id: 101,
      model: "Gemini",
      prompt: "Extract dates from text...",
      user: "User_991",
      time: "30s ago",
    },
  ];

  return (
    <div className="dashboard-container" style={{display: 'block'}}>
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>AI Usage & Logs</h1>
          <p className="subtitle">Monitor token consumption, costs, and model performance.</p>
        </div>
      </div>

      {/* 1. Stats Row */}
      <div className="stats-row">
        <div className="stat-box">
          <h3>Total Tokens Today</h3>
          <div className="stat-value">1,500,000</div>
        </div>
        <div className="stat-box">
          <h3>Estimated Cost</h3>
          <div className="stat-value cost">$15.00</div>
        </div>
        <div className="stat-box">
          <h3>Avg Response Time</h3>
          <div className="stat-value">1.4s</div>
        </div>
      </div>

      {/* 2. Split Grid: Spenders & Comparison */}
      <div className="split-grid">
        {/* Top Spenders */}
        <div className="panel">
          <h3>Top Spenders (Today)</h3>
          <table className="spenders-table" style={{marginTop: '20px'}}>
            <thead>
              <tr>
                <th>User</th>
                <th>Spend</th>
                <th>Plan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topSpenders.map((user, i) => (
                <tr key={i}>
                  <td className="fw-600">{user.name}</td>
                  <td>{user.spent}</td>
                  <td>
                    <span className={`pill ${user.plan.toLowerCase()}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td>
                    {user.plan === "Free" ? (
                      <button className="btn-restrict">Restrict</button>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Model Performance */}
        <div className="panel">
          <h3>Model Performance</h3>
          <div className="model-group" style={{marginTop: '20px'}}>
            <div className="model-label">
              <span>Gemini 1.5 Flash</span>
              <span className="speed-tag">Fast</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar gemini" style={{ width: "30%" }}></div>
              <span className="bar-text">1.2s</span>
            </div>
          </div>

          <div className="model-group">
            <div className="model-label">
              <span>GPT-4o</span>
              <span className="speed-tag slow">Slower</span>
            </div>
            <div className="bar-wrapper">
              <div className="bar gpt" style={{ width: "80%" }}></div>
              <span className="bar-text">3.5s</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live AI Feed */}
      <div className="panel full-width">
        <h3>Live AI Feed</h3>
        <div className="log-console">
          {liveLogs.map((log) => (
            <div key={log.id} className="log-entry">
              <span className="log-time">[{log.time}]</span>
              <span className={`log-model ${log.model.toLowerCase()}`}>
                {log.model}
              </span>
              <span className="log-user">{log.user}:</span>
              <span className="log-prompt">"{log.prompt}"</span>
            </div>
          ))}
          <div className="log-entry system">
            <span>...listening for new requests...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiUsage;