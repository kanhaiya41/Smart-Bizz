import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
// Components

import Login from "./components/Login/Login";
import ConnectSocials from "./components/Oauth/Auth"; // Adjust path if your file is named differently
import Dashboard from "./components/Component/superAdmin/dashboard/Dashboard.jsx";
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
import Sidebar from "./components/sidebar/Sidebar.jsx";
import AccountsPage from "./components/Component/owner/Accounts/Accounts.jsx";

function App() {
  return (
    <Router>
  <Routes>

    <Route path="/" element={<Sidebar></Sidebar>}>
    <Route path="dashboard" element={<OwnerDashboard></OwnerDashboard>}></Route>
    <Route path="inventory" element={<Inventory/>}></Route>
    <Route path="accounts" element={<AccountsPage/>}></Route>

    </Route>

  </Routes>
    </Router>
  );
}

export default App;
