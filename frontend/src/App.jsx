import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import Login from "./components/Login/Login";
import ConnectSocials from "./components/Oauth/Auth"; // Adjust path if your file is named differently
import Dashboard from "./components/Component/dashboard/Dashboard";
import UserManagement from "./components/Component/User management/UserManagement";
import ChannelHealth from "./components/Component/Channel/Channel";
import AiUsage from "./components/Component/AIusage/AiUsage";
import Subscription from "./components/Component/Subscription/Subscription";

function App() {
  return (
    <Router>
      <Routes>
        {/* This is the default page (Login) */}
        <Route path="/" element={<Login />} />

        {/* This is the page we want to go to */}
        <Route path="/connect" element={<ConnectSocials />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/health" element={<ChannelHealth />} />
        <Route path="/logs" element={<AiUsage />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </Router>
  );
}

export default App;
