import { useEffect, useState } from "react";
import { 
  User, Mail, MapPin, Phone, ShieldCheck, Edit3, Camera, Save, X, 
  Building2, Globe, Lock, ExternalLink 
} from "lucide-react";
import "./ProfileManagement.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";
import { toast } from "react-toastify";

const ProfileManagement = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { loading, request: getProfile } = useApi(businessOwnerApi.getProfile);
  const { loading: updateLoading, request: updateUserProfile } = useApi(businessOwnerApi.updateProfile);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", contact: "", dob: "",
    city: "", state: "", country: "", pincode: "",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res?.data || null);
    } catch (error) { console.log(error); }
  };

  const saveProfile = async () => {
    const formDataPayload = new FormData();
    Object.keys(formData).forEach(key => {
      if (!['city', 'state', 'country', 'pincode'].includes(key)) {
        formDataPayload.append(key, formData[key]);
      }
    });
    formDataPayload.append("address", JSON.stringify({
      city: formData.city, state: formData.state, country: formData.country, pincode: formData.pincode,
    }));
    if (profilePhoto) formDataPayload.append("profilePhoto", profilePhoto);

    try {
      await updateUserProfile(formDataPayload);
      toast.success("Changes saved successfully");
      setIsEditingPersonal(false);
      setIsEditingAddress(false);
      loadProfile();
    } catch (error) { toast.error("Update failed"); }
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile?.firstName || "",
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

  useEffect(() => { loadProfile(); }, []);

  // if (userLoading || updateLoading) return <div className="pm-loader">Syncing secure data...</div>;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-content-grid">
        
        {/* Left Column: Personal & Address */}
        <div className="main-info-column">
          
          <div className="info-card-white">
            <div className="card-header-inline">
              <div className="card-label-row">
                <User size={18} className="icon-muted" />
                <h3>Personal Identity</h3>
              </div>
              {!isEditing && (
                <button className="inline-edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit3 size={14} /> Edit
                </button>
              )}
            </div>
            
            <div className="avatar-upload-section">
              <div className="avatar-circle-large">
                {profile?.image ? <img src={profile.image} alt="Profile" /> : <span>{formData.firstName?.[0] || 'U'}</span>}
                {isEditing && (
                  <label htmlFor="photo-upload" className="photo-overlay">
                    <Camera size={16} />
                    <input type="file" id="photo-upload" hidden onChange={handlePhotoChange} />
                  </label>
                )}
              </div>
              <div className="avatar-text">
                <p className="avatar-instruction">Profile Picture</p>
                <p className="avatar-sub">Click on avatar to change (Max 5MB)</p>
              </div>
            </div>

            <div className="input-grid-modern">
              <div className="input-field">
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-field full-width">
                <label>Email Address</label>
                <div className="input-with-icon">
                   <Mail size={14} className="field-icon" />
                   <input name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                </div>
              </div>
            </div>

            {/* Sticky Actions inside the card when editing */}
            {isEditing && (
              <div className="card-actions-footer">
                <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn-primary" onClick={saveProfile}>
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          <div className="info-card-white mt-24">
            <div className="card-label-row">
              <MapPin size={18} className="icon-muted" />
              <h3>Office / Home Address</h3>
            </div>
            <div className="input-grid-modern">
              <div className="input-field">
                <label>City</label>
                <input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-field">
                <label>State</label>
                <input name="state" value={formData.state} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-field">
                <label>Country</label>
                <input name="country" value={formData.country} onChange={handleChange} disabled={!isEditing} />
              </div>
              <div className="input-field">
                <label>Pincode</label>
                <input name="pincode" value={formData.pincode} onChange={handleChange} disabled={!isEditing} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Security */}
        <div className="side-status-column">
          <div className="status-card-white">
            <div className="status-header">
              <ShieldCheck size={20} color="#10b981" />
              <h4>Account Status</h4>
            </div>
            <div className="status-body">
              <div className="status-row">
                <span>Verification</span>
                <span className="badge-verified">Verified</span>
              </div>
              <div className="status-row">
                <span>Role</span>
                <span className="text-bold">Business Owner</span>
              </div>
            </div>
          </div>

          <div className="security-card-white mt-24">
            <div className="status-header">
              <Lock size={20} className="icon-muted" />
              <h4>Security</h4>
            </div>
            <p className="security-tip">Protect your data with modern security standards.</p>
            <button className="security-link-btn">
              Security Settings <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;