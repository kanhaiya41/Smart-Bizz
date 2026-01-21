import { useEffect, useState } from "react";
import { User, Mail, MapPin, Phone, Cake, ShieldCheck, Edit2, Camera  , Save,
  X,} from "lucide-react";

import "./ProfileManagement.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";
import { toast} from "react-toastify"

const ProfileManagement = () => {
  const [profile, setProfile] = useState(null);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { loading: userLupdateUserProfileoading, error: userError, request: getProfile } = useApi(businessOwnerApi.getProfile);
  const { loading: updateProfilerLoading, error: updateProfilerError, request: updateUserProfile } = useApi(businessOwnerApi.updateProfile);

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  dob: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
});

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setProfilePhoto(file);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};



      const loadProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res?.data || null);
      } catch (error) {
        console.log(error);
      }
    };

const saveProfile = async () => {
  const formDataPayload = new FormData();

  formDataPayload.append("firstName", formData.firstName);
  formDataPayload.append("lastName", formData.lastName);
  formDataPayload.append("email", formData.email);
  formDataPayload.append("contact", formData.contact);
  formDataPayload.append("dob", formData.dob);

  formDataPayload.append(
    "address",
    JSON.stringify({
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
    })
  );

  if (profilePhoto) {
    formDataPayload.append("profilePhoto", profilePhoto);
  }

  try {
    await updateUserProfile(formDataPayload); // SAME API
    toast.success("Profile Updated");
    setIsEditingPersonal(false);
    setIsEditingAddress(false);
    await loadProfile();
  } catch (error) {
    console.error("Profile update failed", error);
  }
};


useEffect(() => {
  if (profile) {
    console.log(profile.firstName);
    
    setFormData({
      firstName: profile?.firstName|| "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      contact: profile?.contact || "",
      dob: profile?.dob ? profile.dob.split("T")[0] : "",
      city: profile?.address?.city || "",
      state: profile?.address?.state || "",
      country: profile?.address?.country || "",
      pincode: profile?.address?.pincode || "",
    });
  }
}, [profile]);

  useEffect(() => {
    loadProfile();
  }, []);

  if (userLupdateUserProfileoading ||updateProfilerLoading) return <div className="profile-loading"><div className="loader-spinner"></div><p>Syncing your profile...</p></div>;
  if (userError || updateProfilerError) return <div className="profile-error">Something went wrong. Please try again.</div>;

  return (
    <div className="profile-management-container">
      <div className="profile-hero-section">
        <div className="hero-content">
          <div className="avatar-big-wrapper">
            {profile?.image ? (
              <img src={profile.image} alt="profile" />
            ) : (
              <div className="avatar-initials">{profile?.firstName?.[0] || "U"}</div>
            )}
         <input
  type="file"
  id="profilePhotoInput"
  accept="image/*"
  hidden
  onChange={handlePhotoChange}
/>

<button
  className="change-photo-btn"
  onClick={() => document.getElementById("profilePhotoInput").click()}
>
  <Camera size={16} />
</button>

          </div>
          <div className="hero-text">
            <h2>{`${profile?.firstName} ${profile?.lastName} `}</h2>
            <div className="hero-badges">
              <span className="platform-tag messenger">Business Owner</span>
              <span className="status-badge-v2"><ShieldCheck size={14}/> Verified Account</span>
            </div>
          </div>
        </div>
      </div>

  <div className="profile-grid-layout">
      {/* Left Column */}
      <div className="profile-main-col">
        {/* PERSONAL INFO */}
        <div className="glass-card">
          <div className="card-header-flex">
            <div className="title-with-icon">
              <User size={20} className="icon-purple" />
              <h3>Personal Information</h3>
            </div>

            {!isEditingPersonal ? (
              <button
                className="btn-outline-edit"
                onClick={() => setIsEditingPersonal(true)}
              >
                <Edit2 size={14} /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={saveProfile}>
                  <Save size={14} /> Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsEditingPersonal(false)}
                >
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="details-grid">
            <div className="detail-box">
              <label>First Name</label>
              {isEditingPersonal ? (
                <input name="firstName" value={formData.firstName} onChange={handleChange} />
              ) : (
                <p>{formData.firstName || "—"}</p>
              )}
            </div>

            <div className="detail-box">
              <label>Last Name</label>
              {isEditingPersonal ? (
                <input name="lastName" value={formData.lastName} onChange={handleChange} />
              ) : (
                <p>{formData.lastName || "—"}</p>
              )}
            </div>

            <div className="detail-box">
              <label><Mail size={12} /> Email Address</label>
              {isEditingPersonal ? (
                <input name="email" value={formData.email} onChange={handleChange} />
              ) : (
                <p>{formData.email}</p>
              )}
            </div>

            <div className="detail-box">
              <label><Phone size={12} /> Phone Number</label>
              {isEditingPersonal ? (
                <input name="contact" value={formData.contact} onChange={handleChange} />
              ) : (
                <p>{formData.contact || "Add number"}</p>
              )}
            </div>

            <div className="detail-box">
              <label><Cake size={12} /> Date of Birth</label>
              {isEditingPersonal ? (
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              ) : (
                <p>{formData.dob || "Not set"}</p>
              )}
            </div>
          </div>
        </div>

        {/* ADDRESS INFO */}
        <div className="glass-card mt-20">
          <div className="card-header-flex">
            <div className="title-with-icon">
              <MapPin size={20} className="icon-purple" />
              <h3>Address Details</h3>
            </div>

            {!isEditingAddress ? (
              <button
                className="btn-outline-edit"
                onClick={() => setIsEditingAddress(true)}
              >
                <Edit2 size={14} /> Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={saveProfile}>
                  <Save size={14} /> Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsEditingAddress(false)}
                >
                  <X size={14} /> Cancel
                </button>
              </div>
            )}
          </div>

          <div className="details-grid">
            {["city", "state", "country", "pincode"].map((field) => (
              <div className="detail-box" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {isEditingAddress ? (
                  <input name={field} value={formData[field]} onChange={handleChange} />
                ) : (
                  <p>{formData[field] || "—"}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (unchanged) */}
      <div className="profile-side-col">
        <div className="subscription-card">
          <h4>Current Plan</h4>
          <div className="plan-badge-big">FREE</div>
          <p>You are using the basic version of SmartBizz.</p>
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