import React, { useEffect, useState } from "react";
import { Search, Plus, MoreVertical, X, Globe, Instagram, MessageCircle, ExternalLink } from "lucide-react";
import "./Account.css";

import fbimg from '../../../assets/fb.png'
import instaimg from '../../../assets/insta.png'
import whtsimg from '../../../assets/whtsp.png'
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";

const AccountsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { request: fetchTenants, loading: tenantsLoading } = useApi(businessOwnerApi.getTenants);


const handlePlatformSelect = (type) => {
  const userId = "693ef33a3dfcb0a4a11c0ad4";
  const state = encodeURIComponent(JSON.stringify({ type, userId }));

  let scope = "";

  if (type === "facebook" || type === "instagram") {
    scope = [
      "pages_show_list",
      "pages_read_engagement",
      "instagram_basic",
      "instagram_manage_messages",
      "business_management"
    ].join(",");
  }

  if (type === "whatsapp") {
    scope = [
      "whatsapp_business_management",
      "whatsapp_business_messaging",
      "business_management"
    ].join(",");
  }

  const oauthUrl =
    "https://www.facebook.com/v18.0/dialog/oauth" +
    "?client_id=" + import.meta.env.VITE_META_APP_ID +
    "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_META_REDIRECT_URI) +
    "&response_type=code" +
    "&scope=" + scope +
    "&state=" + state;

  window.location.href = oauthUrl;
  setIsPopupOpen(false);
};

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchTenants();
        setTenants(res?.data || []);
      } catch (err) { console.error(err); }
    };
    loadData();
  }, []);
  

  const filteredTenants = tenants.filter(item => {
    const matchesFilter = filter === "All" || item?.type?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = item.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });



  return (
    <div className="AccountsPageDiv">
      {/* HEADER: Wapis Image 1 wala clean layout */}
      <div className="account-header-main">
        <div className="header-left">
          <h1>Account Management</h1>
          <p>Connect and manage your social media business profiles</p>
        </div>
        <div className="account-heading-filter">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="search"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-account-btn" onClick={() => setIsPopupOpen(true)}>
            <Plus size={18} /> Add New Account
          </button>
        </div>
      </div>

      {/* FILTER ROW: Properly spaced */}
      <div className="platform-filter-row">
        {["All", "Facebook", "Instagram", "WhatsApp"].map((p) => (
          <button
            key={p}
            className={`filter-pill ${filter === p ? 'active' : ''}`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* CARDS GRID: Modern but clean alignment */}
      {/* // ... (Imports and Logic same as before) */}

<div className="accounts-modern-grid">
  {tenantsLoading ? (
     <div className="loader-container"><p>Loading accounts...</p></div>
  ) : filteredTenants.map((item, index) => (
    <div className="account-card-premium" key={index}>
      {/* Top Section: Platform & Options */}
      <div className="card-top-row">
        <div className={`platform-badge ${item?.platform?.toLowerCase()}`}>
          {item.platform === "instagram" ? <Instagram size={12}/> : <MessageCircle size={12}/>}
          {item.platform}
        </div>
        <button className="more-options-btn"><MoreVertical size={18}/></button>
      </div>

      {/* Middle Section: Profile Info */}
      <div className="card-profile-section">
        <div className="avatar-wrapper">
          <div className="main-avatar">{item.businessName[0]}</div>
          <div className="status-indicator-dot online"></div>
        </div>
        <h3>{item.businessName}</h3>
<p className="account-id-text">
  ID: {
    item.platform === "instagram"
      ? item.page?.igBusinessId
      : item.platform === "facebook"
      ? item.page?.pageId
      : item.platform === "whatsapp"
      ? item.whatsapp?.phoneNumberId
      : "N/A"
  }
</p>

      </div>

      {/* Stats Section */}
      <div className="card-stats-row">
        <div className="stat-pill">
          <Globe size={14} />
          <span>{item.contacts || "0"} Contacts</span>
        </div>
      </div>

      {/* Action Section */}
      <div className="card-action-footer">
        <button className="manage-btn-premium">
          Manage Account <ExternalLink size={14} />
        </button>
      </div>
    </div>
  ))}
</div>
{isPopupOpen && (
  <div className="platform-modal-overlay">
    <div className="platform-modal">
      
      {/* HEADER */}
      <div className="modal-header">
        <h3>Add New Account</h3>
        <button
          className="close-btn"
          onClick={() => setIsPopupOpen(false)}
        >
          ✕
        </button>
      </div>

      {/* PLATFORM CARDS */}
      <div className="platform-grid">

        {/* INSTAGRAM */}
        <div
          className="platform-card instagram"
          onClick={() => handlePlatformSelect("instagram")}
        >
          <img src={instaimg} alt="Instagram" />
          <h4>Instagram</h4>
          <p>Connect Instagram Business Account</p>
        </div>

        {/* FACEBOOK */}
        <div
          className="platform-card facebook"
          onClick={() => handlePlatformSelect("facebook")}
        >
          <img src={fbimg} alt="Facebook" />
          <h4>Facebook</h4>
          <p>Connect Facebook Page</p>
        </div>

        {/* WHATSAPP */}
        <div
          className="platform-card whatsapp"
          onClick={() => handlePlatformSelect("whatsapp")}
        >
          <img src={whtsimg} alt="WhatsApp" />
          <h4>WhatsApp</h4>
          <p>Connect WhatsApp Business</p>
        </div>

      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AccountsPage;