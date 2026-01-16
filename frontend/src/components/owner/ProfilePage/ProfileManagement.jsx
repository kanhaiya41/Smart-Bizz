import { useEffect, useState } from "react";
import instImg from "../../../assets/insta.png";
import "./ProfileManagement.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";

const ProfileManagement = () => {

    const [profile,setprofile]= useState(null)

  const handleConnection = (type) => {
    console.log("Connect:", type);
  };

  const {loading:userLoading , error : userError , request:getProfile} = useApi(businessOwnerApi.getProfile)

  useEffect(()=>{

    const loadProfile = async()=>{
         try {
          const res  = await getProfile()
          setprofile(res?.data || null)
          
         } catch (error) {
          console.log(error);
         }
    }
    loadProfile()
  } , [])
  
  return (
    <div className="profile-management">

      <p className="page-title">My Profile</p>

      {/* Profile Header */}
                        {userLoading && (
            <div className="loadingDiv">
              <p>Loading...</p>
            </div>
          )}

          {!userLoading && userError && (
            <div className="errorDiv">
              <p>Error loading accounts</p>
            </div>
          )}
          {!userLoading && !userError && profile && (
      <div>

      <div className="profile-header">
        <img className="profile-image" src={instImg} alt="profile" />

        <div className="profile-basic">
          <h4>{profile?.name}</h4>
          <p>{profile?.email}</p>
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
       <p>{profile?.name?.split(" ")[0] || "-/"}</p>
          </div>

          <div className="info-item">
            <span>Last Name</span>
          <p>{profile?.name?.split(" ")[1] || "-/"}</p>
          </div>

          <div className="info-item">
            <span>Email</span>
              <p>{profile?.email}</p>
          </div>

          <div className="info-item">
            <span>Contact</span>
             <p>{profile?.contact || "-/"}</p>
          </div>

          <div className="info-item">
            <span>Date of Birth</span>
             <p>{profile?.dob || "-/"}</p>
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
              <p>{profile?.city || "-/"}</p>
          </div>

          <div className="info-item">
            <span>State</span>
               <p>{profile?.state || "-/"}</p>
          </div>

          <div className="info-item">
            <span>Country</span>
           <p>{profile?.country || "-/"}</p>
          </div>

          <div className="info-item">
            <span>Pincode</span>
              <p>{profile?.pincode || "-/"}</p>
          </div>
        </div>
      </div>
      </div>
          )}



    </div>
  );
};

export default ProfileManagement;
