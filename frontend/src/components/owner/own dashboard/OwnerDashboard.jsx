import React, { useState } from 'react';
import './OwnerDashboard.css';
import { CircleChart, RevenueChart } from './utils.Rvenue.chart';
import { MessageCircle, Instagram, Facebook, ChevronDown, Search, Bell, X, Send } from 'lucide-react';

const OwnerDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Chat state

  // Dummy Data (Same as yours, keeping it for logic)
  const topQueriesData = [
    { id: 1, query: "Order Kab Tak Aayega?", count: 450, platform: "WhatsApp" },
    { id: 2, query: "Refund Process Kya Hai?", count: 320, platform: "Messenger" },
    { id: 3, query: "Price List & Catalog", count: 280, platform: "Instagram" },
  ];

  const todayMessage = [
    {
      "user_id": 1,
      "user_name": "Rahul Sharma",
      "platform": "WhatsApp",
      "last_active": "10:15 AM",
      "chat_history": [
        { "sender": "user", "message": "Hi, mujhe product ki price janni hai.", "time": "10:14 AM" },
        { "sender": "bot", "message": "Namaste Rahul! Hamara standard plan ₹999 se shuru hota hai.", "time": "10:14 AM" },
        { "sender": "user", "message": "Theek hai, dhanyawad!", "time": "10:15 AM" }
      ]
    },
    {
      "user_id": 2,
      "user_name": "Anjali Gupta",
      "platform": "Instagram",
      "last_active": "10:30 AM",
      "chat_history": [
        { "sender": "user", "message": "Kya ye dress red color mein available hai?", "time": "10:28 AM" },
        { "sender": "bot", "message": "Ji Anjali, red color mein hamare paas Small aur Medium available hain.", "time": "10:29 AM" }
      ]
    }
  ];

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
              {todayMessage.map((user, index) => (
                <div key={index} 
                     className={`message-item-card ${selectedUser?.user_id === user.user_id ? 'active-chat' : ''}`}
                     onClick={() => setSelectedUser(user)}>
                  <div className='user-info-box'>
                    <div className='avatar-main'>
                      {user.user_name.charAt(0)}
                      <div className={`platform-dot ${user.platform.toLowerCase().replace(' ', '')}`}></div>
                    </div>
                    <div className='user-details'>
                      <span className='u-name-bold'>{user.user_name}</span>
                      <span className='u-platform-name'>{user.platform}</span>
                    </div>
                  </div>
                  <div className='message-snippet'>
                    <p>{user.chat_history[user.chat_history.length - 1].message}</p>
                    <span className='msg-time'>{user.last_active}</span>
                  </div>
                  <button className='action-btn-mini'>Open</button>
                </div>
              ))}
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
                    <div className='avatar-sm-chat'>{selectedUser.user_name.charAt(0)}</div>
                    <div>
                      <h4>{selectedUser.user_name}</h4>
                      <span>Online • {selectedUser.platform}</span>
                    </div>
                  </div>
                  <button className='close-chat' onClick={() => setSelectedUser(null)}>
                    <X size={18} />
                  </button>
                </div>

                <div className='chat-messages-area'>
                  {selectedUser.chat_history.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.sender}`}>
                      <p>{msg.message}</p>
                      <span>{msg.time}</span>
                    </div>
                  ))}
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