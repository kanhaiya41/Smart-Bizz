import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

// Icons Components (Kept exactly the same)
const Icons = {
  Home: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Rate: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4"></path></svg>,
  Bookings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Apartments: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4 8 4v14M8 11v-1m8 1v-1m-8 5v-1m8 1v-1"></path></svg>,
  Pricing: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path></svg>,
  Support: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path></svg>,
  LogOut: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Get the User Role from LocalStorage
  const userRole = localStorage.getItem("role");

  // 2. Define Menu for SuperAdmin
  const superAdminItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Icons.Home /> },
    { name: "User Management", path: "/user-management", icon: <Icons.Rate /> },
    { name: "Channel Heath", path: "/health", icon: <Icons.Bookings /> },
    { name: "AI Usage & Logs", path: "/logs", icon: <Icons.Apartments /> },
    { name: "Subscription", path: "/subscription", icon: <Icons.Pricing /> },
  ];

  // 3. Define Menu for Owner
  const ownerItems = [
    { name: "Dashboard", path: "/owner-dashboard", icon: <Icons.Home /> },
    { name: "Inventory", path: "/inventory", icon: <Icons.Home /> },
    { name: "Connect Socials", path: "/connect", icon: <Icons.Home /> },
    { name: "Subscription", path: "/subscription", icon: <Icons.Pricing /> },
    
  ];

  // 4. Decide which menu to show
  const menuItems = userRole === "superAdmin" ? superAdminItems : ownerItems;

  // 5. Handle Logout (Clear storage)
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // Clear Token and Role
    navigate("/"); // Redirect to Login
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">@</div>
        <span className="logo-text">SMARTBIZZ...</span>
      </div>

      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name} className={isActive ? "active" : ""}>
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="title">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="bottom-menu">
          <ul>
            <li>
              <a href="#support">
                <span className="icon">
                  <Icons.Support />
                </span>
                <span className="title">Support</span>
              </a>
            </li>
            <li>
              <a href="/" onClick={handleLogout}>
                <span className="icon">
                  <Icons.LogOut />
                </span>
                <span className="title">LogOut</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Optional: You can hide the upgrade card for Admins if you want, 
          or keep it for everyone. Keeping it for now. */}
      <div className="upgrade-card">
        <div className="cat-illustration">
          <div className="moon-shape"></div>
        </div>
        <h3>Upgrade now!</h3>
        <p>And get full access to all features platform!</p>
        <button className="btn-upgrade">Upgrade</button>
      </div>
    </div>
  );
};

export default Sidebar;