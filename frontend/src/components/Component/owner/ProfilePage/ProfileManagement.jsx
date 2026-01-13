import instImg from "../../../../assets/insta.png";
import "./ProfileManagement.css";

const ProfileManagement = () => {
  return (
    <div className="profile-management">

      <p className="page-title">My Profile</p>

      {/* Profile Header */}
      <div className="profile-header">
        <img className="profile-image" src={instImg} alt="profile" />

        <div className="profile-basic">
          <h4>Vishal Saini</h4>
          <p>vishalgarna7@gmail.com</p>
          <span className="badge">Free</span>
        </div>
      </div>

      {/* Personal Info */}
      <div className="info-card">
        <div className="info-header">
          <h4>Personal Information</h4>
          <button>Edit</button>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span>First Name</span>
            <p>Vishal</p>
          </div>

          <div className="info-item">
            <span>Last Name</span>
            <p>Saini</p>
          </div>

          <div className="info-item">
            <span>Email</span>
            <p>vishalgarna7@gmail.com</p>
          </div>

          <div className="info-item">
            <span>Contact</span>
            <p>9876543210</p>
          </div>

          <div className="info-item">
            <span>Date of Birth</span>
            <p>07/08/2003</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="info-card">
        <div className="info-header">
          <h4>Address</h4>
          <button>Edit</button>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span>City</span>
            <p>Delhi</p>
          </div>

          <div className="info-item">
            <span>State</span>
            <p>Delhi</p>
          </div>

          <div className="info-item">
            <span>Country</span>
            <p>India</p>
          </div>

          <div className="info-item">
            <span>Pincode</span>
            <p>110001</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileManagement;
