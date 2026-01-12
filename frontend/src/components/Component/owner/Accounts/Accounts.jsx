import "./Account.css";
import fbimg from '../../../../assets/fb.png'
import instaimg from '../../../../assets/insta.png'
import whtsimg from '../../../../assets/whtsp.png'
import { useEffect, useState } from "react";
import axios from "axios";

const connectedAccounts = [
  {
    accountName: "Instagram Business",
    accountId: "IG_982134",
    platform: "Instagram",
    contacts: 1240,
    action: "Disconnect"
  },
  {
    accountName: "WhatsApp Support",
    accountId: "WA_554321",
    platform: "WhatsApp",
    contacts: 856,
    action: "Manage"
  },
  {
    accountName: "Facebook Messenger",
    accountId: "FBM_778812",
    platform: "Messenger",
    contacts: 430,
    action: "Manage"
  },
  {
    accountName: "Instagram Marketing",
    accountId: "IG_221908",
    platform: "Instagram",
    contacts: 2980,
    action: "Disconnect"
  },
  {
    accountName: "WhatsApp Sales",
    accountId: "WA_663245",
    platform: "WhatsApp",
    contacts: 1125,
    action: "Manage"
  },
  {
    accountName: "Messenger Customer Care",
    accountId: "FBM_998102",
    platform: "Messenger",
    contacts: 642,
    action: "Manage"
  },
  {
    accountName: "Instagram Support",
    accountId: "IG_443219",
    platform: "Instagram",
    contacts: 980,
    action: "Disconnect"
  },
  {
    accountName: "WhatsApp Marketing",
    accountId: "WA_775390",
    platform: "WhatsApp",
    contacts: 2100,
    action: "Manage"
  },
  {
    accountName: "Facebook Messenger Bot",
    accountId: "FBM_330912",
    platform: "Messenger",
    contacts: 315,
    action: "Disconnect"
  },
  {
    accountName: "Instagram Creator Page",
    accountId: "IG_119002",
    platform: "Instagram",
    contacts: 5400,
    action: "Manage"
  }
];

const AccountsPage = ()=>{
    
  const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleConnection = (type) => {

  const userId = "693ef33a3dfcb0a4a11c0ad4"
const state = encodeURIComponent(JSON.stringify({ type, userId }));

    const oauthUrl =
        "https://www.facebook.com/v18.0/dialog/oauth" +
        "?client_id=" + import.meta.env.VITE_META_APP_ID +
        "&redirect_uri=" + encodeURIComponent(import.meta.env.VITE_META_REDIRECT_URI) +
        "&response_type=code" +
        // "&scope=pages_show_list,pages_read_engagement" +
        // instagram
        "&scope=pages_show_list,pages_read_engagement,instagram_basic,instagram_manage_messages,business_management" +
        "&state=" + state;
    window.location.href =oauthUrl

};

useEffect(()=>{

  const getAllTeanants = async()=>{
    try {
      
      const res =await Onwe
    } catch (error) {
      
    }

  }
},[])


    return (
        <div className="AccountsPageDiv">
            <div className="account-heading">
                <p>Account Management</p>
                <div className="account-heading-filter">
                    <input type="search" placeholder="serarch"/>
                    <button className="newbutton" onClick={()=>setIsPopupOpen(true)}>+ Add New Account</button>
                </div>
            </div>

           <div className="account-content-div">

            <div className="account-content-div-heading">
                <p className="checkBoxP"><input type="checkbox" /> Account Name</p>
                <p>Account Id</p>
                <p>PlatForm</p>
                <p>Contacts</p>
                <p>Action</p>
            </div>

          <div className="account-content-div-body">
            {connectedAccounts.map((item, index) => (
  <div className="account-content-div-body-card" key={index}>
    <p className="checkBoxP">
    <input type="checkbox" /> {item.accountName}
    </p>
    <p>{item.accountId}</p>
    <p>{item.platform}</p>
    <p>{item.contacts}</p>
    <p className="action-text">{item.action}</p>
  </div>
))}


            </div>

           </div>
{isPopupOpen && (
  <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
    <div className="popup" onClick={(e) => e.stopPropagation()}>
      
      <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
        ✕
      </button>

      <h5>Add Your Profile</h5>
      <p className="popup-subtitle">
        Choose a social profile you'd like to manage
      </p>

      <div className="social-pages-images">
        <div className="social-pages-div" onClick={()=>{
          handleConnection("facebook")
        }}>
          <img src={fbimg} alt="Facebook" />
          <p>Facebook Page</p>
        </div>

        <div className="social-pages-div" onClick={()=>{
          handleConnection("instagram")
        }}>
          <img src={instaimg} alt="Instagram" />
          <p>Instagram Page</p>
        </div>

        <div className="social-pages-div" onClick={()=>{
          handleConnection("whatsApp")
        }}>
          <img src={whtsimg} alt="WhatsApp" />
          <p>WhatsApp Page</p>
        </div>
      </div>
    </div>
  </div>
)}


            
        </div>
    )

    

}
export default AccountsPage