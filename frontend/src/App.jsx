import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components

import Login from "./components/Login/Login";
import ConnectSocials from "./components/Oauth/Auth"; // Adjust path if your file is named differently
import Dashboard from "./components/Component/superAdmin/Dashboard/Dashboard";
import UserManagement from "./components/Component/superAdmin/User management/UserManagement";
import ChannelHealth from "./components/Component/superAdmin/Channel/Channel";
import AiUsage from "./components/Component/superAdmin/AIusage/AiUsage";
import Subscription from "./components/Component/superAdmin/Subscription/Subscription";
import OwnerDashboard from "./components/Component/owner/own dashboard/OwnerDashboard";
import Inventory from "./components/Component/owner/Inventory/Inventory";
import OwnerSubscription from "./components/Component/owner/subscriptions/OwnerSubs.jsx";
// Helpers
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // <--- Import the Layout

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Route --- */}
        <Route path="/" element={<Login />} />

        {/* --- OWNER ROUTES (With Sidebar) --- */}
        <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
        <Route element={<Layout />}>
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
          <Route path="/subscription" element={<OwnerSubscription />} />
          </Route>
        <Route path="/connect" element={<ConnectSocials />} />
        </Route>

        {/* --- SUPER ADMIN ROUTES (With Sidebar) --- */}
        <Route element={<ProtectedRoute allowedRoles={["superAdmin"]} />}>
          {/* We wrap these routes in the Layout so they get the Sidebar */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/health" element={<ChannelHealth />} />
            <Route path="/logs" element={<AiUsage />} />
            <Route path="/subscription" element={<Subscription />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
