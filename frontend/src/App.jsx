import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
// Components

import Login from "./components/Login/Login";
import OwnerDashboard from "./components/Component/owner/own dashboard/OwnerDashboard";
import Inventory from "./components/Component/owner/Inventory/Inventory";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import AccountsPage from "./components/Component/owner/Accounts/Accounts.jsx";
import UserMangement from "./components/Component/owner/Users/UserManagement.jsx";
import ProfileManagement from "./components/Component/owner/ProfilePage/ProfileManagement.jsx";
import SupportAndHelp from "./components/Component/owner/SupportAndHelp/SupportAndHelp.jsx";

function App() {
  return (
    <Router>
  <Routes>

    <Route path="/" element={<Sidebar></Sidebar>}>
    <Route path="dashboard" element={<OwnerDashboard></OwnerDashboard>}></Route>
    <Route path="inventory" element={<Inventory/>}></Route>
    <Route path="accounts" element={<AccountsPage/>}></Route>
    <Route path="users" element={<UserMangement/>}></Route>
    <Route path="profile" element={<ProfileManagement/>}></Route>
    <Route path="support-help" element={<SupportAndHelp/>}></Route>

    </Route>

  </Routes>
    </Router>
  );
}

export default App;
