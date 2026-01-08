import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

// Icons Components (Kept exactly the same)

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Get the User Role from LocalStorage
  const userRole = localStorage.getItem("role");

  // 2. Define Menu for SuperAdmin
  const superAdminItems = [
    { name: "Dashboard", path: "/dashboard", icon: "<Icons.Home />" },
    { name: "User Management", path: "/user-management", icon: "<Icons.Rate />" },
    { name: "Channel Heath", path: "/health", icon: "<Icons.Bookings /> "},
    { name: "AI Usage & Logs", path: "/logs", icon:" <Icons.Apartments />" },
    { name: "Subscription", path: "/subscription", icon: "<Icons.Pricing /> "},
  ];

  // 3. Define Menu for Owner
  const ownerItems = [
    { name: "Dashboard", path: "/dashboard", icon: 'ri-dashboard-line' },
    { name: "Inventory", path: "/inventory",icon: 'ri-dashboard-line'},
    { name: "Connect Socials", path: "/connect", icon: 'ri-dashboard-line'},
    { name: "Subscription", path: "/subscription", icon: 'ri-dashboard-line'},
    
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
  <div className="sidbar-div">

    <div className="sidebar">
      <h4>Smartbizz</h4>
      <hr />
      <div className="sidebarlinks">
   
        <div>
               <p>Menu</p>
          {
            ownerItems.map((nav , index)=>{
              return <div 
              onClick={()=>navigate("/dashboard")}
               key={index} className="navCard">
                <i className={nav.icon}></i>
                <p>{nav.name}</p>
              </div>
            })
          }
        </div>
                <div>
               <p>Other</p>
          {
            ownerItems.map((nav , index)=>{
              return <div 
              onClick={()=>navigate("/dashboard")}
               key={index} className="navCard">
                <i className={nav.icon}></i>
                <p>{nav.name}</p>
              </div>
            })
          }
        </div>
      </div>
      {}
    </div>

    <div className="main-cotent">
      <Outlet/>
    </div>

  </div>
  );
};

export default Sidebar;