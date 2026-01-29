import React, { useEffect, useState } from 'react';
import './OwnerDashboard.css';
import { CircleChart, RevenueChart } from './utils.Rvenue.chart';
import { MessageCircle, Instagram, Facebook, ChevronDown, Search, Bell, X, Send } from 'lucide-react';
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
    const [selectedUser, setSelectedUser] = useState(null); // Chat state
    const [conversation, setConversation] = useState([]);
    const [users, setUsers] = useState([]);
    const [replyMessage, setReplyMessage] = useState("");
    const [expandedMsgId, setExpandedMsgId] = useState(null);

    const navigate = useNavigate()

    const businessId = localStorage.getItem("businessId");

    useSocket(businessId);
    // Dummy Data (Same as yours, keeping it for logic)
    const topQueriesData = [
        { id: 1, query: "Order Kab Tak Aayega?", count: 450, platform: "WhatsApp" },
        { id: 2, query: "Refund Process Kya Hai?", count: 320, platform: "Messenger" },
        { id: 3, query: "Price List & Catalog", count: 280, platform: "Instagram" },
    ];

    const { loading: userLoading, error: userError, request: todayConversationbyUsers } = useApi(businessOwnerApi.todayConversationbyUsers);
    const { loading: loadingSingleConversation, error: singleComversationError, request: singleLoadConversation } = useApi(businessOwnerApi.singleConversationbyUser);
    const { loading: toggleLoading, error: toggleError, request: toggleAutoReply } = useApi(businessOwnerApi.toggleAutoReply);
    const { loading: msgSendLoading, error: msgSendError, request: sendReplyMessage } = useApi(businessOwnerApi.replytheMessage);

    const loadUsers = async () => {
        try {
            const res = await todayConversationbyUsers();
            // Agar API data de raha hai toh wo set hoga, warna empty array
            setUsers(res?.data || []);
        } catch (error) {
            navigate("/login")
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

    const handleToggleAutoReply = async (conversationId, toogleValue) => {
        try {
            const res = await toggleAutoReply(conversationId, toogleValue);
            await loadUsers()
            toast.success(res?.message)

        } catch (error) {
            console.error("API Error:", error);
        }
    };
    useEffect(() => {
        loadUsers();
    }, []);
    useEffect(() => {
        setReplyMessage(""); //user change hote hi input clear
    }, [selectedUser?._id]);

    useEffect(() => {
        if (userError || singleComversationError) {
            toast.error(singleComversationError)
        }
    }, [userError, singleComversationError])

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


    useEffect(() => {
        const handler = async (data) => {
            // console.log("Conversation update:", data);

            // reload conversation list
            loadUsers();

            // reload only if the same conversation is open
            if (selectedUser?._id === data.conversationId) {
                handleLoadSingleConversation(selectedUser._id);
            }
        };

        socket.on("conversation:update", handler);

        return () => {
            socket.off("conversation:update", handler);
        };
    }, [selectedUser]);



    return (
        <div className='dashboard-wrapper'>
            {/* <header className='main-header'>
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
      </header> */}

            <div className='dashboard-main-content'>
                {/* <div className='page-title-section'>
          <h1>Owner Dashboard</h1>
          <p>Real-time overview of your business performance</p>
        </div> */}

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
                                        <img
                                            src={query?.platform === 'Messenger' ? fbimg : query?.platform === 'Instagram' ? instaimg : whtsimg}
                                            alt="pf"
                                            className="iconimg"
                                        />
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
                                {/* <span className='subtitle'>Manage latest customer interactions</span> */}
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
                            {!userLoading && users.length > 0 ?
                                users.map((user, index) => (
                                    <div key={index}
                                        className={`message-item-card ${selectedUser?._id === user._id ? 'active-chat' : ''}`}
                                        onClick={() => {
                                            handleLoadSingleConversation(user?._id)

                                        }
                                        }>
                                        {/* {console.log("users", user)
                    } */}
                                        <div className='user-info-box' onClick={() => setSelectedUser(user)}>
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
                                            <p>
                                                {/* JavaScript slice use karke dots dikhayenge */}
                                                {expandedMsgId === user._id
                                                    ? user?.lastMessage?.text
                                                    : `${user?.lastMessage?.text?.substring(0, 20)}${user?.lastMessage?.text?.length > 20 ? "..." : ""}`
                                                }

                                                {/* More/Less button logic */}
                                                {user?.lastMessage?.text?.length > 20 && (
                                                    <span
                                                        className='read-more-dashboard'
                                                        style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600', marginLeft: '5px', fontSize: '12px' }}
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Card click hone se rokne ke liye
                                                            setExpandedMsgId(expandedMsgId === user._id ? null : user._id);
                                                        }}
                                                    >
                                                        {expandedMsgId === user._id ? " show less" : " more"}
                                                    </span>
                                                )}
                                            </p>
                                            <span className='msg-time'>
                                                {user.lastMessageAt ? moment(user.lastMessageAt).fromNow() : ""}
                                            </span>
                                        </div>
                                        <button className='action-btn-mini' onClick={() => setSelectedUser(user)}>Open</button>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={user?.autoReplyEnabled}
                                                onChange={(e) => {
                                                    const isConfirmed = window.confirm("Are you Sure you want To update Auto Reply")
                                                    if (isConfirmed) {
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
                                    {!loadingSingleConversation && conversation.length > 0 ?
                                        conversation.map((msg, idx) => (
                                            <div key={idx} className={`chat-bubble ${msg?.senderType}`}>
                                                <p>{msg.text}</p>
                                                <span>{moment(msg.updatedAt).format("DD MMM YYYY, hh:mm A")}</span>
                                            </div>
                                        )) : (
                                            <div className="state-msg">
                                                No Chats Are Found.
                                            </div>

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
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default OwnerDashboard;
