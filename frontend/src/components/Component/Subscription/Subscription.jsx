import React from "react";
import Sidebar from "../../sidebar/Sidebar";
import "./Subscription.css";

const Subscription = () => {
  const invoices = [
    {
      id: "TXN_9921",
      date: "Oct 24",
      user: "Urban Coffee",
      amount: "$49.00",
      status: "Paid",
    },
    {
      id: "TXN_9922",
      date: "Oct 24",
      user: "MegaMart Ltd",
      amount: "$299.00",
      status: "Paid",
    },
    {
      id: "TXN_9923",
      date: "Oct 23",
      user: "John Doe",
      amount: "$15.00",
      status: "Failed",
    },
  ];

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content-wrap">
        <header className="page-header">
          <h1>Subscription</h1>
          <p>Revenue overview and billing management.</p>
        </header>

        {/* 1. MRR Banner */}
        <div className="mrr-banner">
          <div className="mrr-text">
            <h2>
              $12,400<span className="period">/mo</span>
            </h2>
            <p>Monthly Recurring Revenue</p>
          </div>
          <div className="mrr-chart-placeholder">
            {/* Abstract visual for MRR trend */}
            <div className="trend-line">📈 +15% vs last month</div>
          </div>
        </div>

        {/* 2. Grid */}
        <div className="sub-grid">
          {/* Plan Distribution */}
          <div className="panel">
            <h3>Plan Distribution</h3>
            <div className="donut-chart-container">
              <div className="css-donut-chart">
                <div className="center-hole"></div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="dot free"></span> Free (60%)
                </div>
                <div className="legend-item">
                  <span className="dot pro"></span> Pro (30%)
                </div>
                <div className="legend-item">
                  <span className="dot ent"></span> Enterprise (10%)
                </div>
              </div>
            </div>
          </div>

          {/* Churn Watch */}
          <div className="panel">
            <h3>Churn Watch (This Month)</h3>
            <ul className="churn-list">
              <li>
                <div className="user-info">
                  <strong>Bakery 101</strong>
                  <span>Cancelled Oct 20</span>
                </div>
                <span className="reason">"Too expensive"</span>
              </li>
              <li>
                <div className="user-info">
                  <strong>Test Account</strong>
                  <span>Cancelled Oct 18</span>
                </div>
                <span className="reason">"Switched to competitor"</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Invoices Table */}
        <div className="panel full-width">
          <h3>Recent Invoices</h3>
          <table className="inv-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="mono">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td>{inv.user}</td>
                  <td>{inv.amount}</td>
                  <td>
                    <span className={`status-tag ${inv.status.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
