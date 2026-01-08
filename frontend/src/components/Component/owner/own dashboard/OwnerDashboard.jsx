import React, { useState } from 'react';
import './OwnerDashboard.css';
import  {CircleChart, RevenueChart} from './utils.Rvenue.chart';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';
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
      {"sender": "user", "message": "Hi, mujhe product ki price janni hai.", "time": "10:14 AM"},
      {"sender": "bot", "message": "Namaste Rahul! Hamara standard plan ₹999 se shuru hota hai.", "time": "10:14 AM"},
      {"sender": "user", "message": "Theek hai, dhanyawad!", "time": "10:15 AM"}
    ]
  },
  {
    "user_id": 2,
    "user_name": "Anjali Gupta",
    "platform": "Instagram",
    "last_active": "2026-01-07 10:30 AM",
    "chat_history": [
      {"sender": "user", "message": "Kya ye dress red color mein available hai?", "time": "10:28 AM"},
      {"sender": "bot", "message": "Ji Anjali, red color mein hamare paas Small aur Medium size available hain.", "time": "10:29 AM"},
      {"sender": "bot", "message": "Kya main aapke liye order book kar doon?", "time": "10:30 AM"}
    ]
  },
  {
    "user_id": 3,
    "user_name": "Amit Patel",
    "platform": "Website Chat",
    "last_active": "2026-01-07 11:00 AM",
    "chat_history": [
      {"sender": "user", "message": "Order track kaise karein?", "time": "10:55 AM"},
      {"sender": "bot", "message": "Apna Order ID share kijiye, main turant check karta hoon.", "time": "10:56 AM"},
      {"sender": "user", "message": "ID: #99821", "time": "10:58 AM"},
      {"sender": "bot", "message": "Aapka order ship ho chuka hai aur kal tak pahunch jayega.", "time": "11:00 AM"}
    ]
  },
  {
    "user_id": 4,
    "user_name": "Priya Verma",
    "platform": "Facebook Messenger",
    "last_active": "2026-01-07 11:15 AM",
    "chat_history": [
      {"sender": "user", "message": "Store kab tak open rehta hai?", "time": "11:10 AM"},
      {"sender": "bot", "message": "Priya, hamara store subah 10 baje se raat 9 baje tak khula rehta hai.", "time": "11:11 AM"}
    ]
  },
  {
    "user_id": 5,
    "user_name": "Vikram Singh",
    "platform": "Telegram",
    "last_active": "2026-01-07 11:30 AM",
    "chat_history": [
      {"sender": "user", "message": "Refund status kya hai?", "time": "11:25 AM"},
      {"sender": "bot", "message": "Vikram, aapka refund process kar diya gaya hai. 3-5 din mein account mein dikhne lagega.", "time": "11:30 AM"}
    ]
  },
  {
    "user_id": 6,
    "user_name": "Sana Khan",
    "platform": "WhatsApp",
    "last_active": "2026-01-07 11:45 AM",
    "chat_history": [
      {"sender": "user", "message": "Offer kab khatam ho raha hai?", "time": "11:40 AM"},
      {"sender": "bot", "message": "Sana, New Year offer aaj raat 12 baje tak hi valid hai.", "time": "11:41 AM"}
    ]
  },
  {
    "user_id": 7,
    "user_name": "Rajesh Kumar",
    "platform": "Website Chat",
    "last_active": "2026-01-07 12:00 PM",
    "chat_history": [
      {"sender": "user", "message": "Login nahi ho raha hai.", "time": "11:55 AM"},
      {"sender": "bot", "message": "Kya aapne 'Forgot Password' try kiya?", "time": "11:56 AM"},
      {"sender": "user", "message": "Haan, OTP nahi aaya.", "time": "11:58 AM"}
    ]
  },
  {
    "user_id": 8,
    "user_name": "Megha Das",
    "platform": "Instagram",
    "last_active": "2026-01-07 12:10 PM",
    "chat_history": [
      {"sender": "user", "message": "Collab ke liye kisse baat karein?", "time": "12:05 PM"},
      {"sender": "bot", "message": "Megha, aap apna proposal info@company.com par bhej sakti hain.", "time": "12:10 PM"}
    ]
  },
  {
    "user_id": 9,
    "user_name": "Sandeep Bose",
    "platform": "WhatsApp",
    "last_active": "2026-01-07 12:20 PM",
    "chat_history": [
      {"sender": "user", "message": "Menu bhej dijiye.", "time": "12:18 PM"},
      {"sender": "bot", "message": "Zaroor Sandeep! Ye raha hamara digital menu link: [Link].", "time": "12:20 PM"}
    ]
  },
  {
    "user_id": 10,
    "user_name": "Neha Joshi",
    "platform": "Telegram",
    "last_active": "2026-01-07 12:35 PM",
    "chat_history": [
      {"sender": "user", "message": "Subscription cancel karni hai.", "time": "12:30 PM"},
      {"sender": "bot", "message": "Hamein dukh hai ki aap ja rahi hain. Kya hum wajah jaan sakte hain?", "time": "12:32 PM"},
      {"sender": "user", "message": "Price thoda zyada hai.", "time": "12:35 PM"}
    ]
  }
]
  return ( 
  <div className='OwnerDashboard'>

    <h4>Dashboard</h4>

    <div className='revenueandtop10Querydiv'>
          <RevenueChart/>
          <div className='top10QuerySearch'>
            <h4>Top Search Question Ask By Users</h4>
            {topQueriesData.map((query , i)=>{
              return (
                <div key={i} className='searchQueryCard'>
                    <div className='searchQueryCard-icon'>
                      <span> 
                      {query.platform === "Messenger" ? 
                      (<Facebook color="#1877F2" size={24} />): 
                      (query.platform === "Instagram" ? 
                        (<Instagram color="#E1306C" size={24} />):(
 <                         MessageCircle color="#25D366" size={24} />
                      ))}
                        </span>
                    <p>{query.query}</p>
                    </div>
                    <div className='searchQueryCard-count'>
                      <p>{query.count}</p>
                    </div>


                </div>
              )
            })}
          </div>
    </div>
    {/* < hr className='hr' /> */}
    <hr className='hr' />
    <div className='todayUsersMessageAndPieChart'>

      <div className='todayMessage'>
        <h5>Today</h5>

        <div className='todayMessageheading'>
            <p>Name</p>
            <p>Platform</p>
            <p>Last Message</p>
            <p>Status</p>
            <p>Action</p>
        </div>

        <div>
          {todayMessage.map((user , index)=>{
           return <div key={index} className='todayMessagebody'>
              <p>{user.user_name}</p>
              <p> {user.platform === "Messenger" ? 
                      (<Facebook color="#1877F2" size={24} />): 
                      (user.platform === "Instagram" ? 
                        (<Instagram color="#E1306C" size={24} />):(
 <                         MessageCircle color="#25D366" size={24} />
                      ))}{user.platform}</p>
              <p>{user.last_active}</p>
              <p>{user.user_id}</p>
              <p>{user.user_name}</p>
            </div>
            
          })}
        </div>

      </div>

      <div className='pie-Chart'>
         <p>Order Time</p>
         <span>02-12-2016 Thursday</span>
        <div className='pie-Chart-items'>
         
<div className="legend-item">
  <div className="legend-row">
    <span className="legend-dot" />
    <span className="legend-label">Facebook</span>
  </div>
  <span className="legend-value">40%</span>
</div>

<div className="legend-item">
  <div className="legend-row">
    <span className="legend-dot" />
    <span className="legend-label">Instagram</span>
  </div>
  <span className="legend-value">30%</span>
</div>

<div className="legend-item">
  <div className="legend-row">
    <span className="legend-dot" />
    <span className="legend-label">Whatsapp</span>
  </div>
  <span className="legend-value">20%</span>
</div>          
    </div>
        <CircleChart/>
      </div>

    </div>


  </div> )

};

export default OwnerDashboard;