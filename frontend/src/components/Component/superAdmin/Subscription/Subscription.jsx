import React from "react";
// Reuse dashboard styles


const Subscription = () => {
  return (
    <div className="dashboard-container" style={{display: 'block'}}>
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Subscription</h1>
          <p className="subtitle">Revenue overview and billing management.</p>
        </div>
      </div>

      {/* MRR Banner */}
      <div style={{background: '#02122c', borderRadius: '15px', padding: '30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', margin: 0}}>$12,400<span style={{fontSize: '1rem', fontWeight: 400}}>/mo</span></h1>
          <p style={{margin: '5px 0 0 0', opacity: 0.8}}>Monthly Recurring Revenue</p>
        </div>
        <div style={{background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', color: '#4ade80', fontWeight: '600'}}>
          📈 +15% vs last month
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
        {/* Plan Distribution */}
        <div className="chart-card">
          <h3>Plan Distribution</h3>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px'}}>
             {/* CSS Donut Chart */}
             <div style={{width: '100px', height: '100px', borderRadius: '50%', border: '15px solid #e2e8f0', borderTopColor: '#3b82f6', borderRightColor: '#02122c'}}></div>
             <div style={{marginLeft: '20px', fontSize: '0.8rem', color: '#555'}}>
                <div style={{marginBottom: '5px'}}>🔵 Free (60%)</div>
                <div style={{marginBottom: '5px'}}>⚫ Enterprise (10%)</div>
                <div>🔘 Pro (30%)</div>
             </div>
          </div>
        </div>

        {/* Churn Watch */}
        <div className="chart-card">
          <h3>Churn Watch (This Month)</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
             <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                <div>
                    <strong>Bakery 101</strong><br/>
                    <span style={{fontSize: '0.7rem', color: '#999'}}>Cancelled Oct 20</span>
                </div>
                <span style={{color: '#ef4444', background: '#fef2f2', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', height: 'fit-content'}}>Too expensive</span>
             </div>
             <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
                <div>
                    <strong>Test Account</strong><br/>
                    <span style={{fontSize: '0.7rem', color: '#999'}}>Cancelled Oct 18</span>
                </div>
                <span style={{color: '#ef4444', background: '#fef2f2', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', height: 'fit-content'}}>Switched to competitor</span>
             </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="table-card">
        <h3>Recent Invoices</h3>
        <table style={{marginTop: '15px'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>USER</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TXN_9921</td>
              <td>Oct 24</td>
              <td>Urban Coffee</td>
              <td>$49.00</td>
              <td><span className="badge live">Paid</span></td>
            </tr>
            <tr>
              <td>TXN_9922</td>
              <td>Oct 24</td>
              <td>MegaMart Ltd</td>
              <td>$299.00</td>
              <td><span className="badge live">Paid</span></td>
            </tr>
            <tr>
              <td>TXN_9923</td>
              <td>Oct 23</td>
              <td>John Doe</td>
              <td>$15.00</td>
              <td><span className="badge" style={{background: '#fee2e2', color: '#991b1b'}}>Failed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscription;