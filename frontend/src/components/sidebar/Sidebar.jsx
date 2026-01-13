import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const MENU_CONFIG = {
  superAdmin: [
    { name: "Dashboard", path: "/dashboard", icon: "ri-grid-fill" },
    { name: "User Management", path: "/user-management", icon: "ri-user-settings-line" },
    { name: "Channel Health", path: "/health", icon: "ri-pulse-line" },
    { name: "AI Usage & Logs", path: "/logs", icon: "ri-terminal-window-line" },
    { name: "Subscription", path: "/subscription", icon: "ri-vip-crown-2-line" },
  ],
  owner: [
    { name: "Dashboard", path: "/dashboard", icon: "ri-grid-fill" },
    { name: "Inventory", path: "/inventory", icon: "ri-box-3-line" },
    { name: "Accounts", path: "/accounts", icon: "ri-wallet-3-line" },
    { name: "Users", path: "/users", icon: "ri-group-line" },
  ],
  others: [
    { name: "Profile", path: "/profile", icon: "ri-user-3-line" },
    { name: "Settings", path: "/settings", icon: "ri-settings-4-line" },
    { name: "Help", path: "/help", icon: "ri-question-line" },
  ],
};

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "owner";
  const mainMenuItems = MENU_CONFIG[userRole] || MENU_CONFIG.owner;

  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        {/* LOGO SECTION */}
        <div className="sidebar-logo">
          <h2 className="logo-text">SMARTBIZZ</h2>
        </div>

        <nav className="sidebar-content">
          {/* MAIN MENU */}
          <div className="menu-group">
            <label className="group-label">MENU</label>
            <div className="nav-list">
              {mainMenuItems.map((item) => (
                <NavLink 
                  to={item.path} 
                  key={item.name} 
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* OTHER SECTION */}
          <div className="menu-group">
            <label className="group-label">OTHERS</label>
            <div className="nav-list">
              {MENU_CONFIG.others.map((item) => (
                <NavLink 
                  to={item.path} 
                  key={item.name} 
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="sidebar-footer">
            <button className="btn-logout" onClick={() => {localStorage.clear(); navigate("/")}}>
                <i className="ri-logout-circle-r-line"></i>
                <span>Logout</span>
            </button>
        </div>
      </aside>

      <main className="main-view">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;