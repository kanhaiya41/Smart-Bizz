import API from "./axiosInstance";

const businessOwnerApi = {
  getTenants: () => API.get("owner/get-all-teanants"),
  getUsers: () => API.get("owner/all-users"),
  getProfile: () => API.get("owner/getProfile"),
  uploadInventory: (data) => API.post("owner/upload-inventry", data),
  getInventory: () => API.get("owner/get-inventory"),
  deleteInventory: (id) => API.delete(`owner/del-inventory?id=${id}`),
};

export default businessOwnerApi;
