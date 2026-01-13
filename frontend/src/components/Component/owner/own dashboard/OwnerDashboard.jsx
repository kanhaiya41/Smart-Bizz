import React, { useState } from 'react';
import './OwnerDashboard.css';
import { CircleChart, RevenueChart } from './utils.Rvenue.chart';
import { MessageCircle, Instagram, Facebook, ChevronDown, Search, Bell, MoreHorizontal } from 'lucide-react';
const OwnerDashboard = () => {

  const topQueriesData = [
    {
      id: 1,
      query: "Order Kab Tak Aayega?",
      count: 450,
      platform: "WhatsApp",
      lastTime: "2 mins ago",
      status: "High"
    },
    {
      id: 2,
      query: "Refund Process Kya Hai?",
      count: 320,
      platform: "Messenger",
      lastTime: "15 mins ago",
      status: "Medium"
    },
    {
      id: 3,
      query: "Price List & Catalog",
      count: 280,
      platform: "Instagram",
      lastTime: "5 mins ago",
      status: "High"
    },
    {
      id: 4,
      query: "Store Location/Address",
      count: 210,
      platform: "WhatsApp",
      lastTime: "1 hour ago",
      status: "Low"
    },
    {
      id: 5,
      query: "Size Chart & Fitting",
      count: 195,
      platform: "Instagram",
      lastTime: "10 mins ago",
      status: "Medium"
    },
    {
      id: 6,
      query: "Discount/Promo Code",
      count: 180,
      platform: "WhatsApp",
      lastTime: "30 mins ago",
      status: "High"
    },
    {
      id: 7,
      query: "Return Policy Details",
      count: 150,
      platform: "Facebook",
      lastTime: "2 hours ago",
      status: "Low"
    },
    {
      id: 8,
      query: "Wholesale Inquiry",
      count: 120,
      platform: "WhatsApp",
      lastTime: "45 mins ago",
      status: "Medium"
    },
    {
      id: 9,
      query: "Out of Stock Items",
      count: 95,
      platform: "Instagram",
      lastTime: "3 hours ago",
      status: "Medium"
    },
    {
      id: 10,
      query: "Payment Failed Issue",
      count: 80,
      platform: "Messenger",
      lastTime: "12 mins ago",
      status: "Critical"
    }
  ];

  const todayMessage = [
    {
      "user_id": 1,
      "user_name": "Rahul Sharma",
      "platform": "WhatsApp",
      "last_active": "2026-01-07 10:15 AM",
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
      "last_active": "2026-01-07 10:30 AM",
      "chat_history": [
        { "sender": "user", "message": "Kya ye dress red color mein available hai?", "time": "10:28 AM" },
        { "sender": "bot", "message": "Ji Anjali, red color mein hamare paas Small aur Medium size available hain.", "time": "10:29 AM" },
        { "sender": "bot", "message": "Kya main aapke liye order book kar doon?", "time": "10:30 AM" }
      ]
    },
    {
      "user_id": 3,
      "user_name": "Amit Patel",
      "platform": "Website Chat",
      "last_active": "2026-01-07 11:00 AM",
      "chat_history": [
        { "sender": "user", "message": "Order track kaise karein?", "time": "10:55 AM" },
        { "sender": "bot", "message": "Apna Order ID share kijiye, main turant check karta hoon.", "time": "10:56 AM" },
        { "sender": "user", "message": "ID: #99821", "time": "10:58 AM" },
        { "sender": "bot", "message": "Aapka order ship ho chuka hai aur kal tak pahunch jayega.", "time": "11:00 AM" }
      ]
    },
    {
      "user_id": 4,
      "user_name": "Priya Verma",
      "platform": "Messenger",
      "last_active": "2026-01-07 11:15 AM",
      "chat_history": [
        { "sender": "user", "message": "Store kab tak open rehta hai?", "time": "11:10 AM" },
        { "sender": "bot", "message": "Priya, hamara store subah 10 baje se raat 9 baje tak khula rehta hai.", "time": "11:11 AM" }
      ]
    },
    {
      "user_id": 5,
      "user_name": "Vikram Singh",
      "platform": "Telegram",
      "last_active": "2026-01-07 11:30 AM",
      "chat_history": [
        { "sender": "user", "message": "Refund status kya hai?", "time": "11:25 AM" },
        { "sender": "bot", "message": "Vikram, aapka refund process kar diya gaya hai. 3-5 din mein account mein dikhne lagega.", "time": "11:30 AM" }
      ]
    },
    {
      "user_id": 6,
      "user_name": "Sana Khan",
      "platform": "WhatsApp",
      "last_active": "2026-01-07 11:45 AM",
      "chat_history": [
        { "sender": "user", "message": "Offer kab khatam ho raha hai?", "time": "11:40 AM" },
        { "sender": "bot", "message": "Sana, New Year offer aaj raat 12 baje tak hi valid hai.", "time": "11:41 AM" }
      ]
    },
    {
      "user_id": 7,
      "user_name": "Rajesh Kumar",
      "platform": "Website Chat",
      "last_active": "2026-01-07 12:00 PM",
      "chat_history": [
        { "sender": "user", "message": "Login nahi ho raha hai.", "time": "11:55 AM" },
        { "sender": "bot", "message": "Kya aapne 'Forgot Password' try kiya?", "time": "11:56 AM" },
        { "sender": "user", "message": "Haan, OTP nahi aaya.", "time": "11:58 AM" }
      ]
    },
    {
      "user_id": 8,
      "user_name": "Megha Das",
      "platform": "Instagram",
      "last_active": "2026-01-07 12:10 PM",
      "chat_history": [
        { "sender": "user", "message": "Collab ke liye kisse baat karein?", "time": "12:05 PM" },
        { "sender": "bot", "message": "Megha, aap apna proposal info@company.com par bhej sakti hain.", "time": "12:10 PM" }
      ]
    },
    {
      "user_id": 9,
      "user_name": "Sandeep Bose",
      "platform": "WhatsApp",
      "last_active": "2026-01-07 12:20 PM",
      "chat_history": [
        { "sender": "user", "message": "Menu bhej dijiye.", "time": "12:18 PM" },
        { "sender": "bot", "message": "Zaroor Sandeep! Ye raha hamara digital menu link: [Link].", "time": "12:20 PM" }
      ]
    },
    {
      "user_id": 10,
      "user_name": "Neha Joshi",
      "platform": "Telegram",
      "last_active": "2026-01-07 12:35 PM",
      "chat_history": [
        { "sender": "user", "message": "Subscription cancel karni hai.", "time": "12:30 PM" },
        { "sender": "bot", "message": "Hamein dukh hai ki aap ja rahi hain. Kya hum wajah jaan sakte hain?", "time": "12:32 PM" },
        { "sender": "user", "message": "Price thoda zyada hai.", "time": "12:35 PM" }
      ]
    }
  ]
  return (
    <div className='dashboard-wrapper'>
      {/* FIXED TOP HEADER */}
      <header className='main-header'>
        <div className='search-container'>
          <Search size={18} color="#94a3b8" />
          <input type="text" placeholder='Search analytics, messages...' />
        </div>

        <div className='header-right'>
          {/* IMPROVED NOTIFICATION SECTION */}
          <div className='notif-wrapper'>
            <div className='icon-btn-circle'>
              <Bell size={20} color="#64748b" />
              <span className='notif-ping'></span> {/* Animated dot */}
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

      {/* SCROLLABLE CONTENT AREA */}
      <div className='dashboard-main-content'>
        <div className='page-title-section'>
          <h1>Owner Dashboard</h1>
          <p>Real-time overview of your business performance</p>
        </div>

        {/* TOP ROW: REVENUE & QUERIES */}
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

        {/* BOTTOM ROW: RECENT MESSAGES & PIE CHART */}
        <div className='details-grid'>
          <div className='glass-card messages-section'>
            <div className='card-header'>
              <div className='header-info'>
                <h3>Recent Conversations</h3>
                <span className='subtitle'>Manage latest customer interactions</span>
              </div>
              <select className='platform-select-modern'>
                <option>All Platforms</option>
                <option>WhatsApp</option>
              </select>
            </div>

            <div className='messages-list-container'>
              {todayMessage.map((user, index) => (
                <div key={index} className='message-item-card'>
                  <div className='user-info-box'>
                    <div className='avatar-main'>
                      {user.user_name.charAt(0)}
                      <div className={`platform-dot ${user.platform.toLowerCase()}`}></div>
                    </div>
                    <div className='user-details'>
                      <span className='u-name-bold'>{user.user_name}</span>
                      <span className='u-platform-name'>{user.platform}</span>
                    </div>
                  </div>

                  <div className='message-snippet'>
                    <p>Hello! I wanted to ask about the pricing...</p> {/* Logic for msg snippet */}
                    <span className='msg-time'>{user.last_active.split(' ')[1]}</span>
                  </div>

                  <div className='msg-actions'>
                    <div className='status-tag'>Active</div>
                    <button className='action-btn-mini'>Open</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='glass-card pie-section'>
            <h3>Platform Stats</h3>
            <CircleChart />
            <div className='custom-legend'>
              <div className='legend-item'><span className='dot fb'></span> Facebook <b>40%</b></div>
              <div className='legend-item'><span className='dot ig'></span> Instagram <b>30%</b></div>
              <div className='legend-item'><span className='dot wa'></span> WhatsApp <b>20%</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

};

export default OwnerDashboard;