import { useState, useEffect, useRef } from "react";
import { MoreVertical, MessageSquare, Search, Bell, X, Send, Globe } from "lucide-react";
// import { MessageCircle, Instagram, Facebook, ChevronDown,  } from 'lucide-react';
import "./UserManagement.css";
import { useApi } from "../../../api/useApi";
import { toast } from "react-toastify";
import businessOwnerApi from "../../../api/apiService";
import moment from "moment";
import fbimg from '../../../assets/fb.png'
import instaimg from '../../../assets/insta.png'
import whtsimg from '../../../assets/whtsp.png'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null); // Chat state
  const chatRef = useRef(null);


  const { loading: userLoading, error: userError, request: getAllUsers } = useApi(businessOwnerApi.getUsers);
  const { loading: toggleLoading, error: toggleError, request: toggleAutoReply } = useApi(businessOwnerApi.toggleAutoReply);
  const { loading: loadingSingleConversation, error: singleComversationError, request: singleLoadConversation } = useApi(businessOwnerApi.singleConversationbyUser);
  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      // Agar API data de raha hai toh wo set hoga, warna empty array
      setUsers(res?.data || []);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleToggleAutoReply = async (conversationId, toogleValue) => {
    try {
      const res = await toggleAutoReply(conversationId, toogleValue);
      toast.success(res?.message)

    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleLoadSingleConversation = async (conversationId) => {
    try {
      const res = await singleLoadConversation(conversationId);
      // Agar API data de raha hai toh wo set hoga, warna empty array
      setConversation(res?.data || []);
    } catch (error) {
      navigate("/login")
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);


  // SAFE FILTER LOGIC: Case insensitive aur null checks ke saath
  const filteredUsers = users.filter(user => {
    const userName = user?.name?.toLowerCase() || "";
    const userPlatform = user?.platform?.toLowerCase() || "";
    const filterKey = activeFilter.toLowerCase();

    const matchesSearch = userName.includes(searchTerm.toLowerCase());
    const matchesPlatform = filterKey === "all" || userPlatform === filterKey;

    return matchesSearch && matchesPlatform;
  });

  return (
    <div
      onClick={() => setSelectedUser(null)}
      className="UserPageDiv">
      {/* HEADER - Wahi Image 1 Wala Clean Style */}
      {/* <div className="user-header-main">
        <div className="header-left">
          <h1>User Management</h1>
          <p>Monitor customer interactions and channel activity</p>
        </div>
        <div className="user-header-right">
          <div className="search-wrapper-user">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div> */}

      {/* FILTERS */}
      <div className="user-filter-row">
        {["All", "WhatsApp", "Instagram", "Messenger"].map((f) => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'All'
              ? <Globe className="iconimg" />
              : <img
                src={f === 'Facebook' ? fbimg : f === 'Instagram' ? instaimg : whtsimg}
                alt="pf"
                className="iconimg"
              />
            }
            {f}
          </button>
        ))}
      </div>

      {/* USER LIST CONTAINER */}

      <div className="user-table-container">
        <div className="user-table-container">
          <div className="user-table-header">
            <div className="col-check"><input type="checkbox" /></div>
            <div className="col-info">Customer Details</div>
            <div className="col-plt">Platform</div>
            <div className="col-msg">Last Message</div>
            <div className="col-status">Activity</div>
            <div className="col-act">Actions</div>
          </div>

          <div className="user-table-body">
            {userLoading ? (
              <div className="state-msg">
                <div className="loader-mini"></div> Loading...
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((item, idx) => {
                const customerName = item?.customer?.name || "Unknown User";
                const customerId = item?.customer?.externalId || "N/A";

                const lastMsgText = item?.lastMessage?.text || "No conversation yet";
                const sender =
                  item?.lastMessage?.senderType === "user" ? "Client" : "Bot";
                const platform = item.platform || "-/"

                return (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="user-row" key={item._id || idx}>
                    {/* CHECK */}
                    <div className="col-check">
                      <input type="checkbox" />
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="col-info">
                      <div className="user-profile-meta">
                        <div className="avatar-circle">
                          {customerName[0]}
                        </div>
                        <div style={{
                          cursor: 'pointer'
                        }} onClick={() => {
                          handleLoadSingleConversation(item?._id)
                          setSelectedUser(item)
                        }} className="name-id">
                          <strong>{customerName}</strong>
                          <span>ID: {customerId}</span>
                        </div>
                      </div>
                    </div>

                    {/* PLATFORM */}
                    <div className="col-plt">
                      <span className="plt-badge whatsapp platform-badge">
                        <img
                          src={platform === 'facebook' ? fbimg : platform === 'instagram' ? instaimg : whtsimg}
                          alt="pf"
                          className="iconimg"
                        />
                        {platform}
                      </span>
                    </div>

                    {/* LAST MESSAGE */}
                    <div className="col-msg">
                      <div className="msg-preview-box">
                        <MessageSquare size={14} className="msg-icon-sub" />
                        <p>
                          <strong>{sender}:</strong> {lastMsgText}
                        </p>
                      </div>
                    </div>

                    {/* ACTIVITY */}
                    <div className="col-status">
                      <div className="activity-status-wrapper">
                        <div className="pulse-indicator online"></div>
                        <span className="time-text">
                          {new Date(item.lastMessageAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="col-act">
                      <div className="action-icons">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={item?.autoReplyEnabled}
                            onChange={(e) => {
                              const isConfirmed = window.confirm("Are you Sure you want To update Auto Reply")
                              if (isConfirmed) {
                                handleToggleAutoReply(item?._id, e.target.checked)
                              }

                            }
                            }
                          />
                          <span className="slider"></span>
                        </label>
                        <button className="icon-btn more">
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="state-msg">
                No users found matching your search/filter.
              </div>
            )}
          </div>

        </div>
        {selectedUser && (
          <div className="chatDiv">
            <div
              onClick={(e) => e.stopPropagation()}
              className='chat-viewanimate-slide-in'>
              <div className='chat-header'>
                <div className='chat-user-info'>
                  <div className='avatar-sm-chat'>{selectedUser?.customer?.name.charAt(0)}</div>
                  <div>
                    <h4>{selectedUser?.customer?.name}</h4>
                    <span>Online • {selectedUser.platform}</span>
                  </div>
                </div>
                <button className='close-chat' onClick={() => setSelectedUser(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className='chat-messages-area'>
                {loadingSingleConversation && (
                  <div className="state-msg">
                    <div className="loader-mini"></div> Loading...
                  </div>
                )}
                {!loadingSingleConversation && conversation.length > 0 ?
                  conversation.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg?.senderType}`}>
                      <p>{msg.text}</p>
                      <span> {moment(msg.updatedAt).format("hh:mm A")}</span>
                    </div>
                  )) : (
                    <div className="state-msg">
                      No Chats Are Found.
                    </div>

                  )}
              </div>

              <div className='chat-input-wrapper'>
                <input type="text" placeholder="Type a message..." />
                <button className='send-btn'><Send size={16} /></button>
              </div>
            </div></div>

        )}

      </div>


    </div>
  );
};

export default UserManagement;