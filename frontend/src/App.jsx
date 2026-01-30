import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
// Components
import OwnerDashboard from "./components/owner/own dashboard/OwnerDashboard";
import Inventory from "./components/owner/Inventory/Inventory";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import AccountsPage from "./components/owner/Accounts/Accounts.jsx";
import UserMangement from "./components/owner/Users/UserManagement.jsx";
import ProfileManagement from "./components/owner/ProfilePage/ProfileManagement.jsx";
import SupportAndHelp from "./components/owner/SupportAndHelp/SupportAndHelp.jsx";
import Rulesheet from "./components/owner/RuleSheet/Rulesheet.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";


// jaffar import second loginpage2

import Loginpage from "./components/Login2/Login2.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="login" element={<Loginpage></Loginpage>}></Route>

        {/* Test Login Page */}
        {/* <Route path="/login2" element={<Loginpage />} /> */}


        <Route path="/owner" element={<Sidebar></Sidebar>}>
          <Route index element={<OwnerDashboard></OwnerDashboard>}></Route>
          <Route path="dashboard" element={<OwnerDashboard></OwnerDashboard>}></Route>
          <Route path="inventory" element={<Inventory />}></Route>
          <Route path="accounts" element={<AccountsPage />}></Route>
          <Route path="users" element={<UserMangement />}></Route>
          <Route path="profile" element={<ProfileManagement />}></Route>
          <Route path="support-help" element={<SupportAndHelp />}></Route>
          <Route path="rule-sheet" element={<Rulesheet />}></Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
