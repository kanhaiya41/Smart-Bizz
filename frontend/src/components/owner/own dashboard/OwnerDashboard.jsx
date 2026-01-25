import React, { useEffect, useState } from 'react';
import './OwnerDashboard.css';
import { CircleChart, RevenueChart } from './utils.Rvenue.chart';
import { ChevronDown, Search, Bell, X, Send, ArrowLeft } from 'lucide-react';
import { useApi } from '../../../api/useApi';
import businessOwnerApi from '../../../api/apiService';
import { toast } from "react-toastify";
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import fbimg from '../../../assets/fb.png'
import instaimg from '../../../assets/insta.png'
import whtsimg from '../../../assets/whtsp.png'
import { socket, useSocket } from '../../../api/socket';

const OwnerDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");

  const navigate = useNavigate();
  const businessId = localStorage.getItem("businessId");
  useSocket(businessId);

  const topQueriesData = [
    { id: 1, query: "Order Kab Tak Aayega?", count: 450, platform: "WhatsApp" },
    { id: 2, query: "Refund Process Kya Hai?", count: 320, platform: "Messenger" },
    { id: 3, query: "Price List & Catalog", count: 280, platform: "Instagram" },
  ];

  const { loading: userLoading, request: todayConversationbyUsers } = useApi(businessOwnerApi.todayConversationbyUsers);
  const { loading: loadingSingleConversation, request: singleLoadConversation } = useApi(businessOwnerApi.singleConversationbyUser);
  const { request: toggleAutoReply } = useApi(businessOwnerApi.toggleAutoReply);
  const { loading: msgSendLoading, request: sendReplyMessage } = useApi(businessOwnerApi.replytheMessage);

  const loadUsers = async () => {
    try {
      const res = await todayConversationbyUsers();
      setUsers(res?.data || []);
    } catch (error) { navigate("/login"); }
  };

  const handleReplyMessage = async (user) => {
    if (!replyMessage.trim()) return;
    try {
      const payload = { senderId: user?.customer?.externalId, replyMessage: replyMessage.trim(), conversationId: user?._id };
      await sendReplyMessage(payload);
      loadUsers();
      handleLoadSingleConversation(user._id);
      setReplyMessage("");
      toast.success("Message Sent");
    } catch (error) { toast.error("Error sending message"); }
  };

  const handleLoadSingleConversation = async (id) => {
    try {
      const res = await singleLoadConversation(id);
      setConversation(res?.data || []);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { loadUsers(); }, []);

  useEffect(() => {
    const handler = (data) => {
      loadUsers();
      if (selectedUser?._id === data.conversationId) handleLoadSingleConversation(selectedUser._id);
    };
    socket.on("conversation:update", handler);
    return () => { socket.off("conversation:update", handler); };
  }, [selectedUser]);

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-main-content'>
        
        {/* SECTION 1: Charts Row */}
        <div className='responsive-grid-row'>
          <div className='glass-card revenue-container'>
            <RevenueChart />
          </div>
          <div className='glass-card questions-container'>
            <div className='card-header'>
              <h3>Top Search Questions</h3>
            </div>
            <div className='query-list-container'>
              {topQueriesData.map((query, i) => (
                <div key={i} className='query-row'>
                  <div className='query-main'>
                    <img src={query?.platform === 'Messenger' ? fbimg : query?.platform === 'Instagram' ? instaimg : whtsimg} alt="pf" className="iconimg" />
                    <p>{query.query}</p>
                  </div>
                  <span className='count-badge'>{query.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: Conversations & Chat/Stats Row */}
        <div className='responsive-grid-row bottom-row'>
          
          {/* Recent Conversations */}
          <div className={`glass-card list-section ${selectedUser ? 'hide-on-mobile' : ''}`}>
            <div className='card-header'>
              <h3>Recent Conversations</h3>
            </div>
            <div className='messages-list-container'>
              {userLoading ? <div className="loader-mini"></div> : 
                users.map((user, index) => (
                  <div key={index} className={`message-item-card ${selectedUser?._id === user._id ? 'active-chat' : ''}`}
                    onClick={() => { setSelectedUser(user); handleLoadSingleConversation(user._id); }}>
                    <div className='user-info-box'>
                      <div className='avatar-main'>{user?.customer?.name.charAt(0)}</div>
                      <div className='user-details'>
                        <span className='u-name-bold'>{user?.customer?.name}</span>
                        <span className='u-platform-name'>{user.platform}</span>
                      </div>
                    </div>
                    <div className='message-snippet hide-small'>
                      <p>{user?.lastMessage?.text}</p>
                    </div>
                    <div className='toggle-action' onClick={(e) => e.stopPropagation()}>
                       <label className="switch">
                        <input type="checkbox" checked={user?.autoReplyEnabled} onChange={(e) => {
                          if(window.confirm("Update Auto Reply?")) navigate(0); // Dummy update logic
                        }} />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Dynamic Content: Chat OR Circle Chart */}
          <div className={`glass-card dynamic-content-section ${!selectedUser ? 'show-stats' : 'show-chat'}`}>
            {!selectedUser ? (
              <div className='stats-view-full'>
                <h3>Platform Stats</h3>
                <div className='chart-holder'>
                  <CircleChart />
                </div>
                <div className='custom-legend-grid'>
                  <div className='legend-item'><span className='dot fb'></span> Facebook <b>40%</b></div>
                  <div className='legend-item'><span className='dot ig'></span> Instagram <b>30%</b></div>
                  <div className='legend-item'><span className='dot wa'></span> WhatsApp <b>20%</b></div>
                </div>
              </div>
            ) : (
              <div className='chat-interface'>
                <div className='chat-header-top'>
                  <button className='back-btn-mobile' onClick={() => setSelectedUser(null)}><ArrowLeft size={20}/></button>
                  <div className='chat-user-meta'>
                    <h4>{selectedUser.customer?.name}</h4>
                    <small>{selectedUser.platform}</small>
                  </div>
                  <button className='close-desktop' onClick={() => setSelectedUser(null)}><X size={18} /></button>
                </div>
                <div className='chat-scroll-area'>
                  {loadingSingleConversation ? <span>Loading...</span> : 
                    conversation.map((msg, idx) => (
                      <div key={idx} className={`bubble ${msg?.senderType}`}>
                        <p>{msg.text}</p>
                        <time>{moment(msg.updatedAt).format("hh:mm A")}</time>
                      </div>
                    ))
                  }
                </div>
                <div className='chat-input-box'>
                  <input value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReplyMessage(selectedUser)}
                    placeholder="Type here..." />
                  <button onClick={() => handleReplyMessage(selectedUser)} className="send-btn"><Send size={16} /></button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;