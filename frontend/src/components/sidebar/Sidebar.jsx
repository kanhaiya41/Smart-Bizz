import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import {
  ChevronDown, Search, Bell, User, Settings, LogOut,
  MessageSquare, Package, AlertCircle, CheckCircle, Menu, X
} from 'lucide-react';

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
    { name: "Inventory", path: "/owner/rule-sheet", icon: "ri-group-line" },

  ],
  others: [
    { name: "Profile", path: "/owner/profile", icon: "ri-user-3-line" },
    { name: "Help", path: "/owner/support-help", icon: "ri-question-line" },
  ],
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle state


  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);

  const userRole = localStorage.getItem("role") || "owner";
  const mainMenuItems = MENU_CONFIG[userRole] || MENU_CONFIG.owner;

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
      // Close sidebar on mobile when clicking outside
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.mobile-toggle')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar on route change (Mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
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

  const profile = JSON.parse(localStorage.getItem("profile")) || null;

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
    console.log("profile", profile);
  }, [profile]);





  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* LEFT SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? "show" : ""}`} ref={sidebarRef}>
        <div className="sidebar-logo">
          <div className="logo-wrapper">
            <img src="/JLOGO.png" alt="logo" className="logo" />
            <h2 className="logo-text">Smartbizz</h2>
          </div>
          <button className="mobile-close" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
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

      {/* RIGHT CONTENT AREA */}
      <div className="main-wrapper">
        <header className='main-header'>
          <div className="header-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} color="#1e293b" />
            </button>
            <h1 className="page-title">{getPageTitle()}</h1>
          </div>

          <div className='header-right'>
            <div className='sh-search-bar desktop-search'>
              <Search size={18} color="#94a3b8" className="sh-search-icon" />
              <input type="text" placeholder='Search...' />
            </div>

            {/* NOTIFICATION */}
            <div className='notif-wrapper' ref={notifRef}>
              <div className='icon-btn-circle' onClick={() => setShowNotif(!showNotif)}>
                <Bell size={20} color="#64748b" />
                <span className='notif-badge'>3</span>
              </div>

              {showNotif && (
                <div className="dropdown-panel notification-box">
                  <div className="dropdown-header">
                    <span>Notifications</span>
                    <button className="mark-read">Mark all</button>
                  </div>
                  <div className="dropdown-body">
                    <div className="notif-item unread">
                      <div className="notif-icon bg-blue"><Package size={14} /></div>
                      <div className="notif-info">
                        <p><strong>New Order</strong></p>
                        <span className="notif-time">2 mins ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <div className='profile-menu-wrapper' ref={profileRef}>
              <div className='user-profile-trigger' onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <div className='avatar-sm'>     {`${profile?.firstName?.[0] || ""}${profile?.lastName?.[0] || ""}`}</div>
                <div className='user-text hide-mobile'>
                  <span className='u-name'>{`${profile?.firstName} ${profile?.lastName || ""}`}</span>
                </div>
                <ChevronDown size={14} color="#64748b" className={`${showProfileMenu ? 'rotate-180' : ''} hide-mobile`} />
              </div>

              {showProfileMenu && (
                <div className="dropdown-panel profile-box">
                  <div className="profile-box-user">
                    <div className="avatar-lg">
                      {`${profile?.firstName?.[0] || ""}${profile?.lastName?.[0] || ""}`}
                    </div>

                    <div className="user-details">
                      <h4>{`${profile?.firstName} ${profile?.lastName || ""}`}</h4>
                      <p>{`${profile?.email}` || ""}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-body">
                    <div className="menu-item" onClick={() => navigate("/owner/profile")}>
                      <User size={16} /> <span>My Profile</span>
                    </div>
                    <div className="menu-item logout-item" onClick={handleLogout}>
                      <LogOut size={16} /> <span>Sign Out</span>
                    </div>
                  </div>
                </div>
              )}
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