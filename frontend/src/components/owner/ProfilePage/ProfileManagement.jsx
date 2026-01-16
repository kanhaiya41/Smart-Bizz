import { useEffect, useState } from "react";
import { User, Mail, MapPin, Phone, Cake, ShieldCheck, Edit2, Camera } from "lucide-react";
import "./ProfileManagement.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";

const ProfileManagement = () => {
  const [profile, setProfile] = useState(null);
  const { loading: userLoading, error: userError, request: getProfile } = useApi(businessOwnerApi.getProfile);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res?.data || null);
      } catch (error) {
        console.log(error);
      }
    };
    loadProfile();
  }, []);

  if (userLoading) return <div className="profile-loading"><div className="loader-spinner"></div><p>Syncing your profile...</p></div>;
  if (userError) return <div className="profile-error">Something went wrong. Please try again.</div>;

  return (
    <div className="profile-management-container">
      <div className="profile-hero-section">
        <div className="hero-content">
          <div className="avatar-big-wrapper">
            {profile?.image ? (
              <img src={profile.image} alt="profile" />
            ) : (
              <div className="avatar-initials">{profile?.name?.[0] || "U"}</div>
            )}
            <button className="change-photo-btn"><Camera size={16} /></button>
          </div>
          <div className="hero-text">
            <h2>{profile?.name}</h2>
            <div className="hero-badges">
              <span className="platform-tag messenger">Business Owner</span>
              <span className="status-badge-v2"><ShieldCheck size={14}/> Verified Account</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid-layout">
        {/* Left Column: Account Details */}
        <div className="profile-main-col">
          <div className="glass-card">
            <div className="card-header-flex">
              <div className="title-with-icon">
                <User size={20} className="icon-purple" />
                <h3>Personal Information</h3>
              </div>
              <button className="btn-outline-edit"><Edit2 size={14} /> Edit Profile</button>
            </div>
            
            <div className="details-grid">
              <div className="detail-box">
                <label>First Name</label>
                <p>{profile?.name?.split(" ")[0] || "—"}</p>
              </div>
              <div className="detail-box">
                <label>Last Name</label>
                <p>{profile?.name?.split(" ")[1] || "—"}</p>
              </div>
              <div className="detail-box">
                <label><Mail size={12} /> Email Address</label>
                <p>{profile?.email}</p>
              </div>
              <div className="detail-box">
                <label><Phone size={12} /> Phone Number</label>
                <p>{profile?.contact || "Add number"}</p>
              </div>
              <div className="detail-box">
                <label><Cake size={12} /> Date of Birth</label>
                <p>{profile?.dob || "Not set"}</p>
              </div>
            </div>
          </div>

          <div className="glass-card mt-20">
            <div className="card-header-flex">
              <div className="title-with-icon">
                <MapPin size={20} className="icon-purple" />
                <h3>Address Details</h3>
              </div>
              <button className="btn-outline-edit"><Edit2 size={14} /> Edit</button>
            </div>
            
            <div className="details-grid">
              <div className="detail-box">
                <label>City</label>
                <p>{profile?.city || "—"}</p>
              </div>
              <div className="detail-box">
                <label>State</label>
                <p>{profile?.state || "—"}</p>
              </div>
              <div className="detail-box">
                <label>Country</label>
                <p>{profile?.country || "—"}</p>
              </div>
              <div className="detail-box">
                <label>Pincode</label>
                <p>{profile?.pincode || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Subscription/Status */}
        <div className="profile-side-col">
          <div className="subscription-card">
            <h4>Current Plan</h4>
            <div className="plan-badge-big">FREE</div>
            <p>You are using the basic version of SmartBizz. Upgrade for unlimited channels.</p>
            <button className="upgrade-btn">Upgrade to Pro</button>
          </div>
          
          <div className="account-health">
            <h4>Account Security</h4>
            <div className="security-item">
              <span>Two-Factor Auth</span>
              <span className="tag-off">OFF</span>
            </div>
            <div className="security-item">
              <span>Password Status</span>
              <span className="tag-on">STRONG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;