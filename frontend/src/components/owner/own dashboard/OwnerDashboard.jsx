import React, { useEffect, useState } from 'react';
import './OwnerDashboard.css';
import { CircleChart, RevenueChart } from './utils.Rvenue.chart';
import { MessageCircle, Instagram, Facebook, ChevronDown, Search, Bell, X, Send } from 'lucide-react';
import { useApi } from '../../../api/useApi';
import businessOwnerApi from '../../../api/apiService';
import { toast } from "react-toastify";
import moment from "moment"


const OwnerDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Chat state
  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([]);

  // Dummy Data (Same as yours, keeping it for logic)
  const topQueriesData = [
    { id: 1, query: "Order Kab Tak Aayega?", count: 450, platform: "WhatsApp" },
    { id: 2, query: "Refund Process Kya Hai?", count: 320, platform: "Messenger" },
    { id: 3, query: "Price List & Catalog", count: 280, platform: "Instagram" },
  ];
  
    const { loading: userLoading, error: userError, request: todayConversationbyUsers } = useApi(businessOwnerApi.todayConversationbyUsers);
    const { loading: loadingSingleConversation, error: singleComversationError, request: singleLoadConversation } = useApi(businessOwnerApi.singleConversationbyUser);
    const { loading: toggleLoading, error: toggleError, request: toggleAutoReply } = useApi(businessOwnerApi.toggleAutoReply);
  
    const loadUsers = async () => {
        try {
          const res = await todayConversationbyUsers();
          // Agar API data de raha hai toh wo set hoga, warna empty array
          setUsers(res?.data || []);
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
          console.error("API Error:", error);
        }
      };
        
    const handleToggleAutoReply = async (conversationId , toogleValue) => {
        try {
          const res = await toggleAutoReply(conversationId,toogleValue);
          toast.success(res?.message)

        } catch (error) {
          console.error("API Error:", error);
        }
      };
    useEffect(() => {
      loadUsers();
    }, []);

    useEffect(()=>{
      if(userError || singleComversationError){
        toast.error(singleComversationError)
      }
    },[userError , singleComversationError])
  return (
    <div className='dashboard-wrapper'>
      <header className='main-header'>
        <div className='search-container'>
          <Search size={18} color="#94a3b8" />
          <input type="text" placeholder='Search analytics, messages...' />
        </div>
        <div className='header-right'>
          <div className='notif-wrapper'>
            <div className='icon-btn-circle'>
              <Bell size={20} color="#64748b" />
              <span className='notif-ping'></span>
              <span className='notif-badge'>9+</span>
            </div>
          </div>
          <div className='user-profile-trigger'>
            <div className='avatar-sm'>VS</div>
            <div className='user-text'>
              <span className='u-name'>Vishal Saini</span>
              <ChevronDown size={14} color="#64748b" />
            </div>
          </div>
        </div>
      </header>

      <div className='dashboard-main-content'>
        <div className='page-title-section'>
          <h1>Owner Dashboard</h1>
          <p>Real-time overview of your business performance</p>
        </div>

        <div className='stats-grid'>
          <div className='glass-card revenue-section'>
            <RevenueChart />
          </div>

          <div className='glass-card queries-section'>
            <div className='card-header'>
              <h3>Top Search Questions</h3>
              <span className='view-all'>View All</span>
            </div>
            <div className='query-list-container'>
              {topQueriesData.map((query, i) => (
                <div key={i} className='query-row'>
                  <div className='query-main'>
                    <span className={`platform-tag ${query.platform.toLowerCase()}`}>
                      {query.platform === "Messenger" ? <Facebook size={12} /> :
                        query.platform === "Instagram" ? <Instagram size={12} /> :
                          <MessageCircle size={12} />}
                    </span>
                    <p>{query.query}</p>
                  </div>
                  <span className='count-badge'>{query.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='details-grid'>
          <div className='glass-card messages-section'>
            <div className='card-header'>
              <div className='header-info'>
                <h3>Recent Conversations</h3>
                <span className='subtitle'>Manage latest customer interactions</span>
              </div>
            </div>

            <div className='messages-list-container'>
              {userLoading && (
                  <div className="state-msg">
      <div className="loader-mini"></div> Loading...
    </div>
              )}
              {
               
              }
              { !userLoading && users.length > 0  ?
              users.map((user, index) => (
                <div key={index} 
                     className={`message-item-card ${selectedUser?._id === user._id ? 'active-chat' : ''}`}
                     onClick={() => {
                      handleLoadSingleConversation(user?._id)
                     
                    }
                      }>
                  <div className='user-info-box' onClick={()=> setSelectedUser(user)}>
                    <div className='avatar-main'>
                      {user?.customer?.name.charAt(0)}
                      <div className={`platform-dot ${user?.customer?.externalId.toLowerCase().replace(' ', '')}`}></div>
                    </div>
                    <div className='user-details'>
                      <span className='u-name-bold'>{user?.customer?.name}</span>
                      <span className='u-platform-name'>{user.platform}</span>
                    </div>
                  </div>
                  <div className='message-snippet'>
                    <p>{user?.lastMessage?.text}</p>
                    <span className='msg-time'>{user.lastMessageAt}</span>
                  </div>
                  <button className='action-btn-mini' onClick={()=> setSelectedUser(user)}>Open</button>
<label className="switch">
  <input
    type="checkbox"
    checked={user?.autoReplyEnabled}
    onChange={(e) =>
    
{
  const isConfirmed = window.confirm("Are you Sure you want To update Auto Reply")
    if(isConfirmed){
handleToggleAutoReply(user?._id, e.target.checked)
    }
        
      }
    }
  />
  <span className="slider"></span>
</label>

                </div>
              )) : (
                    <div className="state-msg">
      No users found matching your search/filter.
    </div>
              )}
            </div>
          </div>

          {/* DYNAMIC RIGHT SECTION: STATS OR CHATBOX */}
          <div className='glass-card side-dynamic-section'>
            {!selectedUser ? (
              <div className='stats-view animate-fade'>
                <h3>Platform Stats</h3>
                <CircleChart />
                <div className='custom-legend'>
                  <div className='legend-item'><span className='dot fb'></span> Facebook <b>40%</b></div>
                  <div className='legend-item'><span className='dot ig'></span> Instagram <b>30%</b></div>
                  <div className='legend-item'><span className='dot wa'></span> WhatsApp <b>20%</b></div>
                </div>
              </div>
            ) : (

              <div className='chat-view animate-slide-in'>
                <div className='chat-header'>
                  <div className='chat-user-info'>
                    <div className='avatar-sm-chat'>{selectedUser?.customer?.name.charAt(0)}</div>
                    <div>
                      <h4>{selectedUser.customer?.name}</h4>
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
                  {! loadingSingleConversation && conversation.length > 0 ?
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
                  <button className='send-btn'><Send size={16}/></button>
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