import API from "./axiosInstance";

const businessOwnerApi = {
  getTenants: () => API.get("owner/get-all-teanants"),
  getUsers: () => API.get("owner/all-users"),
  todayConversationbyUsers: () => API.get("owner/today-conversation"),
  singleConversationbyUser: (conversationId) => API.get(`owner/single-chat-history?conversationId=${conversationId}`),
  toggleAutoReply: (conversationId,autoReplyEnabled) => API.put(`owner/user/auto-reply?conversationId=${conversationId}`,{autoReplyEnabled}),
  getProfile: () => API.get("owner/getProfile"),
  uploadInventory: (data) => API.post("owner/upload-inventry", data),
  getInventory: () => API.get("owner/get-inventory"),
  deleteInventory: (id) => API.delete(`owner/del-inventory?id=${id}`),
  updateProfile: (data) => API.put(`owner/profile`, data),
};

export default businessOwnerApi;
