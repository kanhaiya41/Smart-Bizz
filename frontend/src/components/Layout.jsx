import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar"; 

const Layout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", backgroundColor: "#F4F7FE" }}>
      
      {/* Sidebar Section */}
      <div style={{ width: "260px", flexShrink: 0, zIndex: 100 }}>
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div style={{ 
          flex: 1, 
          height: "100vh",
          overflowY: "auto", 
          overflowX: "hidden",
          position: "relative"
      }}>
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;