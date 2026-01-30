import { useState, useEffect } from "react";
import { MoreVertical, MessageSquare, Search, X, Send, Globe } from "lucide-react";
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedMsgId, setExpandedMsgId] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const { loading: userLoading, request: getAllUsers } = useApi(businessOwnerApi.getUsers);
  const { request: toggleAutoReply } = useApi(businessOwnerApi.toggleAutoReply);
  const { loading: loadingSingleConversation, request: singleLoadConversation } = useApi(businessOwnerApi.singleConversationbyUser);
  const { loading: msgSendLoading, error: msgSendError, request: sendReplyMessage } = useApi(businessOwnerApi.replytheMessage);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res?.data || []);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleToggleAutoReply = async (conversationId, toogleValue) => {
    try {
      const res = await toggleAutoReply(conversationId, toogleValue);
      toast.success(res?.message || "Status updated");
      setUsers(prev => prev.map(u => u._id === conversationId ? { ...u, autoReplyEnabled: toogleValue } : u));
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleLoadSingleConversation = async (conversationId) => {
    try {
      const res = await singleLoadConversation(conversationId);
      setConversation(res?.data || []);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const handleReplyMessage = async (selectedUser) => {
    try {

      const now = new Date();
      const lastCustomerMsgTime = new Date(selectedUser.lastMessageAt);

      const diffHours =
        (now.getTime() - lastCustomerMsgTime.getTime()) / (1000 * 60 * 60);

      if (diffHours > 24) {
        toast.info("Cannot reply. 24-hour messaging window expired.")
        return
      }
      // console.log("lastCustomerMsgTime", lastCustomerMsgTime);
      // console.log("diffHours", diffHours);

      // console.log("call", replyMessage);
      const message = replyMessage?.trim();
      // console.log("call", message);
      if (!message) return;

      const payload = {
        senderId: selectedUser?.customer?.externalId,
        replyMessage: message,
        conversationId: selectedUser?._id
      };

      await sendReplyMessage(payload); //  real API function

      loadUsers()

      handleLoadSingleConversation(selectedUser._id);
      setReplyMessage("")
      toast.success("Message Sent Succssfully")


    } catch (error) {
      console.error("API Error:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);

      // navigate("/login");
    }
  };


  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const userName = (user?.customer?.name || "").toLowerCase();
    const userPlatform = (user?.platform || "").toLowerCase();
    const filterKey = activeFilter.toLowerCase();
    const matchesSearch = userName.includes(searchTerm.toLowerCase());

    let targetFilter = filterKey;
    if (filterKey === "messenger") targetFilter = "facebook";
    const matchesPlatform = filterKey === "all" || userPlatform === targetFilter;

    return matchesSearch && matchesPlatform;
  });
  const handleDisable = (selectedUser) => {
    const message = replyMessage?.trim();

    // console.log({
    //   msgSendLoading,
    //   senderType: selectedUser?.lastMessage?.senderType,
    //   message
    // });

    const result = (
      msgSendLoading ||
      selectedUser?.lastMessage?.senderType !== "customer" ||
      !message
    );
    // console.log(result);

    return result
  };
  return (
    <div className="UserPageDiv" onClick={() => setSelectedUser(null)}>

      {/* SEARCH BAR */}
      <div className="user-header-right" style={{ marginBottom: '20px', padding: '0 20px' }}>
        <div className="search-wrapper-user">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="user-filter-row">
        {["All", "WhatsApp", "Instagram", "Messenger"].map((f) => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveFilter(f);
            }}
          >
            {f === 'All' ? (
              <Globe className="iconimg" size={16} />
            ) : (
              <img
                src={f === 'Messenger' ? fbimg : f === 'Instagram' ? instaimg : whtsimg}
                alt={f}
                className="iconimg"
              />
            )}
            <span>{f}</span>
          </button>
        ))}
      </div>

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
            <div className="state-msg">Loading users...</div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((item) => {
              const customerName = item?.customer?.name || "Unknown User";
              const customerId = item?.customer?.externalId || "N/A";
              const lastMsgText = item?.lastMessage?.text || "No message yet";
              const platform = (item.platform || "whatsapp").toLowerCase();
              const sender = item?.lastMessage?.senderType === "user" ? "Client" : "Bot";
              const isExpanded = expandedMsgId === item._id;

              return (
                <div
                  className={`user-row ${isExpanded ? 'row-expanded' : ''}`}
                  key={item._id}
                  onClick={(e) => {
                    e.stopPropagation(); // YE LINE ADD KAREIN: Parent div ka click trigger nahi hoga
                    setSelectedUser(item);
                    handleLoadSingleConversation(item._id);
                  }}
                >
                  <div className="col-check" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" />
                  </div>

                  <div className="col-info">
                    <div className="user-profile-meta">
                      <div className="avatar-circle">{customerName[0]}</div>
                      <div className="name-id">
                        <strong>{customerName}</strong>
                        <span>ID: {customerId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-plt">
                    <span className={`plt-badge ${platform} platform-badge`}>
                      <img
                        src={platform === 'facebook' ? fbimg : platform === 'instagram' ? instaimg : whtsimg}
                        alt="pf"
                        className="iconimg"
                      />
                      {platform === 'facebook' ? 'Messenger' : platform}
                    </span>
                  </div>

                  {/* LAST MESSAGE COLUMN */}
                  <div className="col-msg">
                    <div className="msg-preview-box">
                      <MessageSquare size={14} className="msg-icon-sub" />
                      <div className="msg-content">
                        <strong>{sender}:</strong>{" "}
                        <span className={isExpanded ? "msg-full" : "msg-truncated"}>
                          {/* YAHAN FIX HAI: Agar expanded nahi hai toh sirf 15 chars + ... dikhao */}
                          {isExpanded
                            ? lastMsgText
                            : `${lastMsgText?.substring(0, 15)}${lastMsgText?.length > 15 ? "..." : ""}`
                          }
                        </span>
                        {lastMsgText?.length > 15 && (
                          <button
                            className="read-more-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedMsgId(isExpanded ? null : item._id);
                            }}
                          >
                            {isExpanded ? " Show Less" : " more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-status">
                    <span className="time-text">
                      {item.lastMessageAt ? moment(item.lastMessageAt).fromNow() : "N/A"}
                    </span>
                  </div>

                  <div className="col-act" onClick={e => e.stopPropagation()}>
                    <div className="action-icons">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item?.autoReplyEnabled || false}
                          onChange={(e) => {
                            if (window.confirm("Update Auto Reply settings?")) {
                              handleToggleAutoReply(item._id, e.target.checked);
                            }
                          }}
                        />
                        <span className="slider"></span>
                      </label>
                      <button className="icon-btn more"><MoreVertical size={15} /></button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="state-msg">No users found.</div>
          )}
        </div>
      </div>

      {/* CHAT MODAL SECTION */}
      {selectedUser && (
        <div className="chatDiv" onClick={() => setSelectedUser(null)}>
          <div className="chat-view animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header1">
              <div className="chat-user-info">
                <div className="avatar-sm-chat">{selectedUser?.customer?.name?.charAt(0)}</div>
                <div>
                  <h4>{selectedUser?.customer?.name}</h4>
                  <span style={{ textTransform: 'capitalize' }}>{selectedUser.platform}</span>
                </div>
              </div>
              <button className="close-chat" onClick={() => setSelectedUser(null)}><X size={18} /></button>
            </div>

            <div className="chat-messages-area1">
              {loadingSingleConversation ? (
                <div className="state-msg">Loading chat...</div>
              ) : conversation.length > 0 ? (
                conversation.map((msg, idx) => (
                  <div key={idx} className={`chat-bubble ${msg?.senderType}`}>
                    <p>{msg.text}</p>
                    <span>{moment(msg.createdAt).format("hh:mm A")}</span>
                  </div>
                ))
              ) : (
                <div className="state-msg">No messages yet.</div>
              )}
            </div>
            <div className='chat-input-wrapper'>
              <input
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !handleDisable(selectedUser)) {
                    handleReplyMessage(selectedUser);
                  }
                }} id='replymessageId' type="text" placeholder="Type a message..." />
              <button
                type="button"
                onClick={() => handleReplyMessage(selectedUser)}
                disabled={handleDisable(selectedUser)}
                className="send-btn"
              >
                {msgSendLoading ? (
                  <div className="loader-mini"></div>
                ) : (
                  <Send size={16} />
                )}
              </button>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;