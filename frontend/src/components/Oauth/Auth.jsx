import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { BASE_URL } from "../../apiConfig"; 
import './Auth.css';

// Importing images from assets
import instaLogo from '../../assets/insta.png'; 
import fbLogo from '../../assets/fb.png';     
import whtspLogo from '../../assets/whtsp.png'; 

const ConnectSocials = () => {
  const navigate = useNavigate(); 

  // --- HELPER: Get User ID from Local Storage ---
  const getUserId = () => {
    // 1. Retrieve the userId saved during login
    const userId = localStorage.getItem("userId"); 
    
    // 2. Validation: If no ID is found, force re-login
    if (!userId) {
      alert("User ID not found. Please log in again.");
      navigate('/'); 
      return null;
    }
    return userId;
  };

  // --- DYNAMIC CONNECTION HANDLER ---
  const handleConnect = (platform) => {
    // 1. Get the current user's ID
    const userId = getUserId();
    if (!userId) return;

    // 2. Construct the URL with Path Parameters (Slashes)
    // Structure: BASE_URL/auth/oauth/USER_ID/PLATFORM_NAME
    const redirectUrl = `${BASE_URL}/auth/oauth/${userId}/${platform}`;
    
    // 3. Redirect the browser to the backend
    window.location.href = redirectUrl;
  };

  return (
    <div className="connect-page-container">
      <div className="content-wrapper">
        <h1 className="main-heading">Connect your social media</h1>
        <p className="sub-heading">Select a platform to integrate with SmartBizz</p>

        <div className="cards-grid">
          {/* Instagram Card */}
          <div className="social-card instagram">
            <div className="icon-wrapper">
              <img src={instaLogo} alt="Instagram" className="social-icon" />
            </div>
            <h3>Instagram</h3>
            <button 
              className="connect-btn" 
              onClick={() => handleConnect('instagram')}
            >
              Connect
            </button>
          </div>

          {/* WhatsApp Card */}
          <div className="social-card whatsapp">
            <div className="icon-wrapper">
              <img src={whtspLogo} alt="WhatsApp" className="social-icon" />
            </div>
            <h3>WhatsApp</h3>
            <button 
              className="connect-btn" 
              onClick={() => handleConnect('whatsapp')}
            >
              Connect
            </button>
          </div>

          {/* Facebook Card */}
          <div className="social-card facebook">
            <div className="icon-wrapper">
              <img src={fbLogo} alt="Facebook" className="social-icon" />
            </div>
            <h3>Facebook</h3>
            <button 
              className="connect-btn" 
              onClick={() => handleConnect('facebook')}
            >
              Connect
            </button>
          </div>
        </div>

        <div className="footer-action">
          <button className="btn-dashboard-link" onClick={() => navigate('/owner-dashboard')}>
            Continue to Dashboard <span className="arrow-icon">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectSocials;