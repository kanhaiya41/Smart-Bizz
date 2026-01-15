import React, { useState } from "react";
import "./UserManagement.css";

// MOCK DATA
const initialUsers = [
  { id: 1, name: "Urban Coffee", contactName: "Sarah Jenkins", email: "sarah@urbancoffee.com", phone: "+1 555-0123", plan: "Pro", status: "Active", channels: ["WA", "IG"], usage: "12,500" },
  { id: 2, name: "TechStart Inc", contactName: "Mike Ross", email: "mike@techstart.io", phone: "+1 555-0199", plan: "Enterprise", status: "Active", channels: ["WA", "IG", "FB"], usage: "45,300" },
  { id: 3, name: "Flower Power", contactName: "Lily Evans", email: "lily@flowers.com", phone: "+1 555-0000", plan: "Free", status: "Pending", channels: ["IG"], usage: "120" },
  { id: 4, name: "Burger King 42", contactName: "John Doe", email: "john@burgers.com", phone: "+1 555-9999", plan: "Pro", status: "Banned", channels: ["WA"], usage: "0" },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(initialUsers);

  // Filter Logic
  const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      {/* Page Header */}
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage access, subscriptions, and monitor usage.</p>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search Business, Email, or Owner..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <div className="filters">
          <select className="filter-select"><option>All Status</option><option>Active</option></select>
          <select className="filter-select"><option>All Plans</option><option>Pro</option></select>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>BUSINESS PROFILE</th><th>CONTACT</th><th>SUBSCRIPTION</th><th>CHANNELS</th><th>USAGE (MO)</th><th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="profile-cell">
                    <div className="avatar-circle">{user.name.charAt(0)}</div>
                    <div><div className="font-bold">{user.name}</div><div className="sub-text">{user.contactName}</div></div>
                  </div>
                </td>
                <td><div className="font-bold">{user.email}</div><div className="sub-text">{user.phone}</div></td>
                <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.plan} • {user.status}</span></td>
                <td>
                  <div className="channels-flex">
                    {user.channels.includes("WA") && <span className="chan-tag wa">WA</span>}
                    {user.channels.includes("IG") && <span className="chan-tag ig">IG</span>}
                    {user.channels.includes("FB") && <span className="chan-tag fb">FB</span>}
                  </div>
                </td>
                <td className="font-bold">{user.usage}</td>
                <td>
                  <div className="actions-flex">
                    <button className="icon-btn">✏️</button>
                    <button className="icon-btn delete">🚫</button>
                    <button className="btn-login-as">Login as</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;