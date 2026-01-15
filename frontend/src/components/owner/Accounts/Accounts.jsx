import React, { useEffect, useState } from "react";
import { Search, Plus, MoreVertical, X, Globe, UserCheck, MessageCircle, Instagram } from "lucide-react";
import "./Account.css";

// Dummy images (Jo tumne import kiye hain wahi use honge)
import fbimg from '../../../assets/fb.png'
import instaimg from '../../../assets/insta.png'
import whtsimg from '../../../assets/whtsp.png'
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";

const connectedAccounts = [
  { accountName: "Instagram Business", accountId: "IG_982134", platform: "Instagram", contacts: "1.2k", status: "Connected" },
  { accountName: "WhatsApp Support", accountId: "WA_554321", platform: "WhatsApp", contacts: "856", status: "Active" },
  { accountName: "Facebook Messenger", accountId: "FBM_778812", platform: "Messenger", contacts: "430", status: "Active" },
  { accountName: "Instagram Marketing", accountId: "IG_221908", platform: "Instagram", contacts: "2.9k", status: "Connected" },
];

const AccountsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tenants, setTenants] = useState([]);

  const handleConnection = (type) => {
    const userId = "693ef33a3dfcb0a4a11c0ad4";
    const state = encodeURIComponent(JSON.stringify({ type, userId }));

    const oauthUrl =
      "https://www.facebook.com/v18.0/dialog/oauth" +
      "?client_id=" + import.meta.env.VITE_META_APP_ID +
      "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_META_REDIRECT_URI) +
      "&response_type=code" +
      "&scope=pages_show_list,pages_read_engagement,instagram_basic,instagram_manage_messages,business_management" +
      "&state=" + state;

    window.location.href = oauthUrl;
  };

  const {
    request: fetchTenants,
    error: tenantsError,
    loading: tenantsLoading
  } = useApi(businessOwnerApi.getTenants);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchTenants();
        console.log("re",res);
        
        setTenants(res?.data|| []);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);


  return (
    <div className="AccountsPageDiv">
      <div className="account-header-main">
        <div className="header-left">
          <h1>Account Management</h1>
          <p>Connect and manage your social media business profiles</p>
        </div>
        <div className="account-heading-filter">
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input type="search" placeholder="Search accounts..." />
          </div>
          <button className="add-account-btn" onClick={() => setIsPopupOpen(true)}>
            <Plus size={18} /> Add New Account
          </button>
        </div>
      </div>false

      <div className="account-table-container">
        <div className="account-table-header">
          <p><input type="checkbox" /> Account Name</p>
          <p>Account ID</p>
          <p>Platform</p>
          <p>Contacts</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        <div className="account-table-body">

                  {tenantsLoading && (
            <div className="loadingDiv">
              <p>Loading...</p>
            </div>
          )}

          {!tenantsLoading && tenantsError && (
            <div className="errorDiv">
              <p>Error loading accounts</p>
            </div>
          )}

          {!tenantsLoading && !tenantsError  && tenants.map((item, index) => (
            <div className="account-row" key={index}>
              <p className="acc-name-cell">
                <input type="checkbox" />
                <div className="acc-avatar">{item?.businessName[0]}</div>
                <span>{item?.businessName}</span>
              </p>
              <p className="id-cell">{item.type === "instagram" ? item.page.igBusinessId :item.page.pageId }</p>
              <p className="platform-cell">
                <span className={`platform-tag ${item?.type.toLowerCase()}`}>
                  {item?.type}
                </span>
              </p>
              <p className="contact-cell"><Globe size={14} /> {item.contacts}</p>
              <p><span className="status-pill">Active</span></p>
              <p className="action-cell">
                <button className="manage-btn">Manage</button>
                <MoreVertical size={18} className="more-icon" />
              </p>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-x" onClick={() => setIsPopupOpen(false)}>
              <X size={20} />
            </button>
            <div className="popup-header">
              <h3>Connect New Profile</h3>
              <p>Select a platform to integrate with your dashboard</p>
            </div>

            <div className="social-options-list">
              <div className="social-option-item" onClick={() => handleConnection("facebook")}>
                <div className="social-icon-bg fb"><img src={fbimg} alt="FB" /></div>
                <div className="social-text">
                  <strong>Facebook Page</strong>
                  <span>Manage messenger and post comments</span>
                </div>
              </div>

              <div className="social-option-item" onClick={() => handleConnection("instagram")}>
                <div className="social-icon-bg insta"><img src={instaimg} alt="IG" /></div>
                <div className="social-text">
                  <strong>Instagram Business</strong>
                  <span>Handle DMs and business insights</span>
                </div>
              </div>

              <div className="social-option-item" onClick={() => handleConnection("whatsApp")}>
                <div className="social-icon-bg wats"><img src={whtsimg} alt="WA" /></div>
                <div className="social-text">
                  <strong>WhatsApp Business</strong>
                  <span>Send notifications and support messages</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;