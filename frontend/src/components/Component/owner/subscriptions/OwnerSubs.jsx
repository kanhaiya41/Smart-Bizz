import React, { useState } from "react";
import "./OwnerSubscription.css";

const OwnerSubscription = () => {
  // Mock Data: Current Subscription Status
  const [currentPlan] = useState({
    name: "Pro Plan",
    price: "$49",
    billingCycle: "Monthly",
    startDate: "Oct 01, 2023",
    endDate: "Nov 01, 2023",
    status: "Active",
    daysRemaining: 7,
    progress: 76, // Percentage of month used
  });

  // Mock Data: Available Plans
  const plans = [
    {
      id: 1,
      name: "Starter",
      price: "$0",
      period: "/mo",
      features: ["1 Social Account", "Basic Analytics", "Manual Uploads"],
      isCurrent: false,
      btnText: "Downgrade",
    },
    {
      id: 2,
      name: "Pro",
      price: "$49",
      period: "/mo",
      features: ["5 Social Accounts", "AI Auto-Reply", "Advanced Inventory", "Priority Support"],
      isCurrent: true,
      btnText: "Current Plan",
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$199",
      period: "/mo",
      features: ["Unlimited Accounts", "Custom AI Model", "Dedicated Manager", "API Access"],
      isCurrent: false,
      btnText: "Upgrade",
    },
  ];

  // Mock Data: Billing History
  const invoices = [
    { id: "INV-001", date: "Oct 01, 2023", amount: "$49.00", status: "Paid" },
    { id: "INV-002", date: "Sep 01, 2023", amount: "$49.00", status: "Paid" },
    { id: "INV-003", date: "Aug 01, 2023", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="dashboard-container">
      {/* --- HEADER --- */}
      <header className="page-header">
        <div className="header-text">
          <h1>Subscription & Billing</h1>
          <p>Manage your plan, payment methods, and invoices.</p>
        </div>
      </header>

      {/* --- SECTION 1: CURRENT PLAN STATUS --- */}
      <div className="plan-status-card">
        <div className="plan-info">
          <div className="plan-header-row">
            <span className="plan-badge">{currentPlan.name}</span>
            <span className={`status-pill ${currentPlan.status.toLowerCase()}`}>
              ● {currentPlan.status}
            </span>
          </div>
          <h2 className="renewal-text">
            Renews on <span className="highlight-date">{currentPlan.endDate}</span>
          </h2>
          <p className="billing-cycle-text">
            Billed {currentPlan.billingCycle} • {currentPlan.price}
          </p>
        </div>

        {/* Progress Circle / Time Remaining */}
        <div className="plan-progress">
          <div className="progress-labels">
            <span>Cycle Usage</span>
            <span className="days-left">{currentPlan.daysRemaining} Days Left</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${currentPlan.progress}%` }}
            ></div>
          </div>
          <button className="btn-renew">Renew Now</button>
        </div>
      </div>

      {/* --- SECTION 2: AVAILABLE PLANS --- */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div key={plan.id} className={`pricing-card ${plan.isCurrent ? "active-border" : ""}`}>
            <div className="pricing-header">
              <h3>{plan.name}</h3>
              <div className="price-tag">
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
            </div>
            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <button 
              className={`btn-plan ${plan.isCurrent ? "current" : "outline"}`}
            >
              {plan.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* --- SECTION 3: BILLING HISTORY --- */}
      <div className="table-card">
        <div className="card-header">
          <h3>Billing History</h3>
        </div>
        <table className="modern-table">
          <thead>
            <tr>
              <th width="30%">INVOICE ID</th>
              <th width="30%">DATE</th>
              <th width="20%">AMOUNT</th>
              <th width="20%">STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className="fw-bold">{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td>
                  <span className="status-pill paid">{inv.status}</span>
                </td>
                <td style={{textAlign: "right"}}>
                  <button className="icon-btn" title="Download PDF">⬇️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerSubscription;