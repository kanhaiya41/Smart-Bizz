import { useState, useEffect } from "react";
import { Search, MoreVertical, MessageSquare, Clock, Trash2, Edit3, ExternalLink } from "lucide-react";
import "./UserManagement.css";
import { useApi } from "../../../api/useApi";
import businessOwnerApi from "../../../api/apiService";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const { loading: userLoading, error: userError, request: getAllUsers } = useApi(businessOwnerApi.getUsers);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getAllUsers();
        // Agar API data de raha hai toh wo set hoga, warna empty array
        setUsers(res?.data || []);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
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
    <div className="UserPageDiv">
      {/* HEADER - Wahi Image 1 Wala Clean Style */}
      <div className="user-header-main">
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
      </div>

      {/* FILTERS */}
      <div className="user-filter-row">
        {["All", "WhatsApp", "Instagram", "Messenger"].map((f) => (
          <button
            key={f}
            className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* USER LIST CONTAINER */}
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
        <div className="user-row" key={item._id || idx}>
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
              <div className="name-id">
                <strong>{customerName}</strong>
                <span>ID: {customerId}</span>
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div className="col-plt">
            <span className="plt-badge whatsapp">
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
              <button className="icon-btn edit">
                <Edit3 size={15} />
              </button>
              <button className="icon-btn delete">
                <Trash2 size={15} />
              </button>
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
    </div>
  );
};

export default UserManagement;