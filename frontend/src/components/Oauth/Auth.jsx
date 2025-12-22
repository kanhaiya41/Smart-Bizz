import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { BASE_URL } from "../../apiConfig"; // Import your Base URL
import './Auth.css';

// Importing images from assets
import instaLogo from '../../assets/insta.png'; 
import fbLogo from '../../assets/fb.png';     
import whtspLogo from '../../assets/whtsp.png'; 

const ConnectSocials = () => {
  const navigate = useNavigate(); 

  // --- UPDATED FUNCTION ---
  function connectInstagram() {
      // Redirect to your backend. The backend will construct the Meta URL 
      // with the correct App IDs and Redirect URIs stored in your .env file.
      // If BASE_URL is empty (using proxy), this becomes '/auth/instagram'
      window.location.href = `${BASE_URL}/auth/instagram`;
  }

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
            {/* Call the updated function */}
            <button className="connect-btn" onClick={connectInstagram}>Connect</button>
          </div>

          {/* WhatsApp Card */}
          <div className="social-card whatsapp">
            <div className="icon-wrapper">
              <img src={whtspLogo} alt="WhatsApp" className="social-icon" />
            </div>
            <h3>WhatsApp</h3>
            <button className="connect-btn">Connect</button>
          </div>

          {/* Facebook Card */}
          <div className="social-card facebook">
            <div className="icon-wrapper">
              <img src={fbLogo} alt="Facebook" className="social-icon" />
            </div>
            <h3>Facebook</h3>
            <button className="connect-btn">Connect</button>
          </div>
        </div>

        <div className="footer-action">
          <button className="btn-dashboard-link" onClick={() => navigate('/dashboard')}>
            Continue to Dashboard <span className="arrow-icon">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectSocials;   