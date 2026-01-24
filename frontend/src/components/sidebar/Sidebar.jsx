import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { ChevronDown, Search, Bell } from 'lucide-react';

const MENU_CONFIG = {
  superAdmin: [
    { name: "Dashboard", path: "/dashboard", icon: "ri-grid-fill" },
    { name: "User Management", path: "/user-management", icon: "ri-user-settings-line" },
    { name: "Channel Health", path: "/health", icon: "ri-pulse-line" },
    { name: "AI Usage & Logs", path: "/logs", icon: "ri-terminal-window-line" },
    { name: "Subscription", path: "/subscription", icon: "ri-vip-crown-2-line" },
  ],
  owner: [
    { name: "Dashboard", path: "/owner/dashboard", icon: "ri-grid-fill" },
    { name: "Inventory", path: "/owner/inventory", icon: "ri-box-3-line" },
    { name: "Accounts", path: "/owner/accounts", icon: "ri-wallet-3-line" },
    { name: "Users", path: "/owner/users", icon: "ri-group-line" },
  ],
  others: [
    { name: "Profile", path: "/owner/profile", icon: "ri-user-3-line" },
    { name: "Help", path: "/owner/support-help", icon: "ri-question-line" },
  ],
};

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "owner";
  const mainMenuItems = MENU_CONFIG[userRole] || MENU_CONFIG.owner;

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you Sure you want to Logout?");
    if (isConfirmed) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const allItems = [...MENU_CONFIG.superAdmin, ...MENU_CONFIG.owner, ...MENU_CONFIG.others];
    const currentItem = allItems.find(item => item.path === path);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="app-container">
      {/* 1. LEFT SIDEBAR */}
      <aside  className="sidebar">
        <div className="sidebar-logo">
          <h2 className="logo-text">SMARTBIZZ</h2>
        </div>

        <nav className="sidebar-content">
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
          <button className="btn-logout" onClick={handleLogout}>
            <i className="ri-logout-circle-r-line"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. RIGHT CONTENT AREA */}
      <div className="main-wrapper">
        <header  className='main-header'>
          {/* LEFT: Page Title Section */}
          <div className="header-left">
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>

          {/* RIGHT: Search & Profile */}
          <div className='header-right'>
            <div className='search-container'>
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder='Search...' />
            </div>

            <div className='notif-wrapper'>
              <div className='icon-btn-circle'>
                <Bell size={20} color="#64748b" />
                <span className='notif-badge'>9+</span>
              </div>
            </div>

            <div className='user-profile-trigger'>
              <div className='avatar-sm'>VS</div>
              <div className='user-text'>
                <span className='u-name'>Vishal Saini</span>
                <ChevronDown size={14} color="#64748b" />
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="the-container"> 
          <Outlet />

          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;