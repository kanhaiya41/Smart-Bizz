import React, { useState } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import './UserManagement.css';

const UserManagement = () => {
  // --- MOCK DATA ---
  const initialUsers = [
    { 
      id: 1, 
      businessName: "Urban Coffee", 
      owner: "Sarah Jenkins", 
      email: "sarah@urbancoffee.com", 
      phone: "+1 555-0123",
      plan: "Pro", 
      status: "Active", 
      channels: ["WA", "IG"], 
      msgsMonth: 12500, 
      logo: "☕",
      health: "Healthy",
      lastActive: "5 mins ago",
      invoices: [
        { id: "INV-001", date: "Oct 1, 2023", amount: "$49.00" },
        { id: "INV-002", date: "Sep 1, 2023", amount: "$49.00" }
      ]
    },
    { 
      id: 2, 
      businessName: "TechStart Inc", 
      owner: "Mike Ross", 
      email: "mike@techstart.io", 
      phone: "+1 555-0199",
      plan: "Enterprise", 
      status: "Active", 
      channels: ["WA", "IG", "FB"], 
      msgsMonth: 45300, 
      logo: "🚀",
      health: "Warning (API Rate Limit)",
      lastActive: "1 hour ago",
      invoices: [
        { id: "INV-099", date: "Oct 1, 2023", amount: "$299.00" }
      ]
    },
    { 
      id: 3, 
      businessName: "Flower Power", 
      owner: "Lily Evans", 
      email: "lily@flowers.com", 
      phone: "+1 555-0000",
      plan: "Free", 
      status: "Pending", 
      channels: ["IG"], 
      msgsMonth: 120, 
      logo: "🌸",
      health: "Healthy",
      lastActive: "2 days ago",
      invoices: []
    },
    { 
      id: 4, 
      businessName: "Burger King 42", 
      owner: "John Doe", 
      email: "john@burgers.com", 
      phone: "+1 555-9999",
      plan: "Pro", 
      status: "Banned", 
      channels: ["WA"], 
      msgsMonth: 0, 
      logo: "🍔",
      health: "Disconnected",
      lastActive: "1 week ago",
      invoices: [
        { id: "INV-045", date: "Aug 1, 2023", amount: "$49.00" }
      ]
    },
  ];

  // --- STATE ---
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null); // For Drawer

  // --- FILTERS LOGIC ---
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.owner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    const matchesPlan = planFilter === "All" || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // --- HANDLERS ---
  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit user ${id}`);
  };

  const handleBan = (e, id) => {
    e.stopPropagation();
    // Toggle ban status logic would go here
    alert(`Ban/Unban user ${id}`);
  };

  const handleLoginAs = (e, name) => {
    e.stopPropagation();
    alert(`Logging in as ${name}...`);
  };

  return (
    <div className="usermanagement-container">
      <Sidebar />
      
      <main className="um-content">
        <header className="um-header">
          <h1>User Management</h1>
          <p>Manage access, subscriptions, and monitor usage.</p>
        </header>

        {/* A. FILTER TOOLBAR */}
        <div className="um-toolbar">
          <div className="search-group">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search Business, Email, or Owner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Banned">Banned</option>
            </select>

            <select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
              <option value="All">All Plans</option>
              <option value="Free">Free Tier</option>
              <option value="Pro">Pro Tier</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* B. MAIN DATA TABLE */}
        <div className="um-table-card">
          <table>
            <thead>
              <tr>
                <th>Business Profile</th>
                <th>Contact</th>
                <th>Subscription</th>
                <th>Channels</th>
                <th>Usage (Mo)</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} onClick={() => setSelectedUser(user)} className="clickable-row">
                  <td>
                    <div className="profile-cell">
                      <div className="profile-logo">{user.logo}</div>
                      <div>
                        <div className="business-name">{user.businessName}</div>
                        <div className="owner-name">{user.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <span>{user.email}</span>
                      <span className="sub-text">{user.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${user.plan.toLowerCase()} ${user.status.toLowerCase()}`}>
                      {user.plan} • {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="channels-flex">
                      {user.channels.includes("WA") && <span className="ch-icon wa">WA</span>}
                      {user.channels.includes("IG") && <span className="ch-icon ig">IG</span>}
                      {user.channels.includes("FB") && <span className="ch-icon fb">FB</span>}
                    </div>
                  </td>
                  <td className="font-mono">{user.msgsMonth.toLocaleString()}</td>
                  <td>
                    <div className="actions-flex">
                      <button className="icon-btn" title="Edit" onClick={(e) => handleEdit(e, user.id)}>✏️</button>
                      <button className="icon-btn" title="Ban" onClick={(e) => handleBan(e, user.id)}>🚫</button>
                      <button className="btn-impersonate" onClick={(e) => handleLoginAs(e, user.businessName)}>
                        Login as
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <div className="no-results">No users found.</div>}
        </div>
      </main>

      {/* C. USER DETAILS SLIDE-OVER (DRAWER) */}
      {selectedUser && (
        <>
          <div className="drawer-backdrop" onClick={() => setSelectedUser(null)}></div>
          <div className="drawer-panel">
            <div className="drawer-header">
              <h2>{selectedUser.businessName}</h2>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            
            <div className="drawer-body">
              {/* Profile Summary */}
              <div className="drawer-section">
                <div className="drawer-profile">
                  <div className="big-logo">{selectedUser.logo}</div>
                  <div>
                    <h3>{selectedUser.owner}</h3>
                    <p>{selectedUser.email}</p>
                    <span className={`status-pill ${selectedUser.status.toLowerCase()}`}>{selectedUser.status}</span>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="drawer-section">
                <h4>System Health</h4>
                <div className={`health-indicator ${selectedUser.health.includes("Warning") ? 'warning' : 'good'}`}>
                  <span className="dot"></span>
                  {selectedUser.health}
                </div>
                <div className="detail-row">
                  <span>API Status:</span> <strong>Connected</strong>
                </div>
                <div className="detail-row">
                  <span>Valid Tokens:</span> <strong>Yes</strong>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="drawer-section">
                <h4>Recent Activity</h4>
                <div className="activity-timeline">
                  <div className="activity-item">
                    <span className="time">{selectedUser.lastActive}</span>
                    <p>Last message sent successfully.</p>
                  </div>
                  <div className="activity-item">
                    <span className="time">1 day ago</span>
                    <p>Updated business profile settings.</p>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div className="drawer-section">
                <h4>Billing History</h4>
                {selectedUser.invoices.length > 0 ? (
                  <table className="mini-table">
                    <tbody>
                      {selectedUser.invoices.map(inv => (
                        <tr key={inv.id}>
                          <td>{inv.date}</td>
                          <td>{inv.id}</td>
                          <td className="text-right">{inv.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-data">No invoices found (Free Tier)</p>
                )}
              </div>

              <div className="drawer-footer">
                <button className="btn-full-width">Reset Password</button>
                <button className="btn-full-width danger">Delete Account</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;